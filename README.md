# Stoneside Custom Homes Website

A sophisticated, modern website for Stoneside Custom Homes - Bryan/College Station's premier custom home builder.

![Stoneside Custom Homes](assets/images/logo.jpg)

## 🏠 Features

- **Stunning Visual Design**: Refined Texas luxury aesthetic with smooth animations
- **Responsive Layout**: Looks beautiful on all devices
- **Portfolio Management**: Easy-to-update project gallery via JSON file
- **Contact Form**: Ready for integration with your email service
- **SEO Optimized**: Proper meta tags and semantic HTML
- **Performance Focused**: Optimized images and minimal dependencies

## 🛠 Tech Stack

- **HTML5** - Semantic, accessible markup
- **CSS3** - Custom properties, animations, responsive design
- **Vanilla JavaScript** - No framework dependencies
- **Google Fonts** - Playfair Display & DM Sans

---

## 📋 SETUP GUIDE: VS Code → GitHub → Vercel

### Prerequisites

1. **VS Code** installed on your computer
2. **Git** installed ([Download Git](https://git-scm.com/downloads))
3. **GitHub account** ([Sign up free](https://github.com))
4. **Vercel account** ([Sign up free](https://vercel.com) - use GitHub to sign up)

---

### Step 1: Set Up Your Local Project

1. **Create a folder** on your computer for the project
   ```
   Example: C:\Users\YourName\Projects\stoneside-homes
   ```

2. **Copy all website files** into this folder:
   ```
   stoneside-homes/
   ├── index.html
   ├── css/
   │   └── style.css
   ├── js/
   │   ├── main.js
   │   └── projects.js
   └── assets/
       └── images/
           ├── custom_home.jpg
           ├── logo.jpg
           └── (additional project images)
   ```

3. **Open VS Code** and go to: `File → Open Folder → Select your project folder`

---

### Step 2: Initialize Git Repository

1. **Open the Terminal in VS Code**: 
   - Press `` Ctrl + ` `` (backtick) or go to `View → Terminal`

2. **Initialize Git**:
   ```bash
   git init
   ```

3. **Add all files to Git**:
   ```bash
   git add .
   ```

4. **Create your first commit**:
   ```bash
   git commit -m "Initial commit - Stoneside Custom Homes website"
   ```

---

### Step 3: Create GitHub Repository

1. Go to [github.com](https://github.com) and sign in

2. Click the **+** icon (top right) → **New repository**

3. Fill in the details:
   - **Repository name**: `stoneside-homes`
   - **Description**: "Stoneside Custom Homes website"
   - **Visibility**: Private (recommended) or Public
   - **DO NOT** check "Add README" (we already have one)

4. Click **Create repository**

5. **Copy the commands** GitHub shows you under "...or push an existing repository"

---

### Step 4: Connect Local Project to GitHub

In VS Code terminal, run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/stoneside-homes.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

**If prompted for credentials**:
- Use your GitHub username
- Use a **Personal Access Token** as password (not your regular password)
  - Create one at: GitHub → Settings → Developer Settings → Personal Access Tokens → Generate

---

### Step 5: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub

2. Click **"Add New..."** → **"Project"**

3. Find and **Import** your `stoneside-homes` repository

4. Configure the project:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave default)
   - Leave all other settings as default

5. Click **Deploy**

6. Wait for deployment (usually 30-60 seconds)

7. **Your site is live!** Vercel will give you a URL like `stoneside-homes.vercel.app`

---

### Step 6: Connect Your Custom Domain

1. In Vercel, go to your project → **Settings** → **Domains**

2. Add `stonesidehomes.com`

3. Vercel will show you DNS records to add. Go to your domain registrar and add:
   - **Type**: A
   - **Name**: @ (or blank)
   - **Value**: `76.76.21.21`
   
   AND
   
   - **Type**: CNAME
   - **Name**: www
   - **Value**: `cname.vercel-dns.com`

4. Wait for DNS propagation (can take up to 48 hours, usually much faster)

---

## 🔄 Making Updates

### To update the website:

1. **Make changes** in VS Code

2. **Save files** (Ctrl + S)

3. **Open Terminal** and run:
   ```bash
   git add .
   git commit -m "Describe your changes"
   git push
   ```

4. **Vercel automatically deploys** your changes within minutes!

---

## 📸 Adding New Portfolio Projects

### Method 1: Edit projects.js

1. Open `js/projects.js`

2. Add a new object to the `PROJECTS` array:
   ```javascript
   {
       id: "new-project-name",
       title: "Beautiful New Home",
       location: "College Station, TX",
       type: "custom",  // or "spec"
       featured: true,  // or false
       sqft: "3,500",
       beds: "4",
       baths: "3.5",
       year: "2024",
       image: "new-project-main.jpg",
       gallery: ["new-project-1.jpg", "new-project-2.jpg"],
       description: "A beautiful description of this amazing home..."
   }
   ```

3. Add the image file(s) to `assets/images/`

4. Commit and push changes

---

## 📁 File Structure

```
stoneside-homes/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styles
├── js/
│   ├── main.js         # Animations & interactions
│   └── projects.js     # Portfolio data (EDIT THIS FOR NEW PROJECTS)
├── assets/
│   └── images/
│       ├── logo.jpg
│       ├── custom_home.jpg
│       └── (project images)
├── vercel.json         # Vercel configuration
└── README.md           # This file
```

---

## 🎨 Customization

### Colors (in css/style.css)

Find the `:root` section to change colors:

```css
:root {
    --color-sage: #4A5D4F;        /* Primary green */
    --color-stone: #C4B5A1;       /* Accent tan */
    --color-cream: #F7F4EF;       /* Background */
    --color-charcoal: #2C2C2C;    /* Text */
}
```

### Contact Information (in js/projects.js)

Update the `COMPANY_INFO` object:

```javascript
const COMPANY_INFO = {
    name: "Stoneside Custom Homes",
    phone: "(979) YOUR-NUMBER",
    email: "your@email.com",
    // ...
};
```

---

## 📧 Contact Form Integration

The contact form is ready for integration. Options:

1. **Formspree** (free, easy): Add `action="https://formspree.io/f/YOUR_ID"` to the form
2. **Netlify Forms**: Add `data-netlify="true"` attribute
3. **Custom Backend**: Connect to your own API

---

## 🔮 Future Phases

### Phase 2: Social Media Integration
- Instagram feed embed
- Facebook page integration
- Automatic portfolio sync

### Phase 3: Homeowner Portal
- Secure login for homeowners
- Project progress tracking
- Document storage (warranties, manuals)
- Communication hub

---

## 📞 Support

Built with ❤️ for Stoneside Custom Homes

*"Built on the Rock" — Matthew 7:24*
