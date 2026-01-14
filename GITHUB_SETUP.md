# GitHub Setup Guide

Follow these steps to upload your project to GitHub:

## Step 1: Install Git

If Git is not installed on your system:

1. Download Git from: https://git-scm.com/download/win
2. Run the installer and follow the setup wizard
3. Restart your terminal/PowerShell after installation

## Step 2: Configure Git (First Time Only)

Open PowerShell or Command Prompt and run:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 3: Initialize Git Repository

Navigate to your project folder and run:

```bash
cd "C:\Users\GiordanoKeith\OneDrive - DeVry University\Desktop\New Image Resizer"
git init
```

## Step 4: Add Files to Git

```bash
git add .
```

## Step 5: Create Initial Commit

```bash
git commit -m "Initial commit: Image Resizer & Background Remover web application"
```

## Step 6: Create GitHub Repository

1. Go to https://github.com and sign in (or create an account)
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository (e.g., "image-resizer")
5. Choose public or private
6. **DO NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 7: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

## Alternative: Using GitHub Desktop

If you prefer a graphical interface:

1. Download GitHub Desktop from: https://desktop.github.com/
2. Sign in with your GitHub account
3. Click "File" > "Add Local Repository"
4. Select your project folder
5. Click "Publish repository" to upload to GitHub

## Troubleshooting

### If you get authentication errors:
- GitHub now requires a Personal Access Token instead of passwords
- Go to: https://github.com/settings/tokens
- Generate a new token with "repo" permissions
- Use the token as your password when pushing

### If you need to update your repository later:
```bash
git add .
git commit -m "Your commit message"
git push
```

## Your Project Files

The following files will be uploaded:
- `index.html` - Main web application
- `app.js` - JavaScript functionality
- `styles.py` - Style definitions
- `README.md` - Project documentation
- `.gitignore` - Git ignore rules
