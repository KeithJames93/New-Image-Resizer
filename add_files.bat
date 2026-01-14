@echo off
echo Initializing Git repository...
git init

echo.
echo Adding all files to Git...
git add .

echo.
echo Files staged for commit:
git status

echo.
echo To commit these files, run:
echo git commit -m "Initial commit: Image Resizer & Background Remover"
echo.
echo To connect to GitHub, run:
echo git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
echo git branch -M main
echo git push -u origin main
echo.
pause
