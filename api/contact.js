// Vercel Serverless Function: /api/contact
//
// Sends contact form submissions via Resend (recommended) with a mailto fallback handled client-side.
//
// Env vars (Vercel Project Settings -> Environment Variables):
// - RESEND_API_KEY
// - CONTACT_TO_EMAIL
// - CONTACT_FROM_EMAIL (optional; must be a verified sender in Resend)
// - CONTACT_SUBJECT_PREFIX (optional)
//
// Notes:
// - Keep this simple and dependency-free.
// - Add stricter rate limiting (Upstash/kv) if you expect spam.

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.status(405).json({ ok: false, error: 'Method Not Allowed' });
      return;
    }

    const { name, email, phone, location, message, company } = (req.body || {});

    // Honeypot
    if (company) {
      res.status(200).json({ ok: true });
      return;
    }

    // Basic validation
    if (!name || !email || !message) {
      res.status(400).json({ ok: false, error: 'Missing required fields' });
      return;
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!to || !apiKey) {
      // Client will fallback to mailto
      res.status(200).json({ ok: true, skipped: true });
      return;
    }

    const from = process.env.CONTACT_FROM_EMAIL || 'Stoneside Website <noreply@stonesidehomes.com>';
    const subjectPrefix = process.env.CONTACT_SUBJECT_PREFIX || 'Stoneside Inquiry:';

    const subject = `${subjectPrefix} ${name}`;

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      location ? `Location: ${location}` : null,
      '',
      'Message:',
      message
    ].filter(Boolean).join('\n');

    const payload = {
      from,
      to,
      reply_to: email,
      subject,
      text
    };

    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!resp.ok) {
      const errText = await resp.text();
      res.status(502).json({ ok: false, error: 'Email provider error', details: errText.slice(0, 300) });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ ok: false, error: 'Server error' });
  }
}
