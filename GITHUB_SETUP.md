# GitHub Repository Setup Guide

## Repository Information

**Repository Name**: `skill-14-auth-system` (or similar)  
**Description**: Full-stack User Authentication System using React and Spring Boot

## Repository Structure

Your repository should have the following structure:

```
skill-14/
├── frontend/              # React frontend
├── backend/               # Spring Boot backend
├── .gitignore            # Git ignore rules
├── docker-compose.yml    # Docker compose for MySQL
├── README.md             # Main project documentation
├── SETUP.md              # Detailed setup instructions
└── .github/              # GitHub configuration
    └── workflows/        # CI/CD workflows
        └── build.yml     # Build pipeline
```

## Steps to Push to GitHub

### 1. Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository with name: `skill-14-auth-system`
3. Do NOT initialize with README (we have one)
4. Choose Public or Private based on your preference
5. Click "Create repository"

### 2. Initialize Local Repository

```bash
cd skill-14
git init
git add .
git commit -m "Initial commit: Full-stack auth system with React and Spring Boot"
```

### 3. Connect to GitHub and Push

```bash
# Replace USERNAME and REPO with your actual values
git remote add origin https://github.com/USERNAME/skill-14-auth-system.git

# Rename branch if needed (GitHub uses 'main' now)
git branch -M main

# Push to GitHub
git push -u origin main
```

### 4. Verify on GitHub

1. Go to your repository on GitHub
2. Verify all files are present
3. README.md should display on the main page

## Repository Best Practices

### Branching Strategy

```bash
# Create feature branch
git checkout -b feature/add-email-verification

# Make changes and commit
git add .
git commit -m "Add email verification feature"

# Push feature branch
git push origin feature/add-email-verification

# Create Pull Request on GitHub
# After review, merge to main
```

### Commit Message Convention

Follow this format:
```
type(scope): subject

- feat(auth): add JWT token implementation
- fix(login): resolve session timeout issue
- docs(readme): update setup instructions
- style(profile): improve CSS styling
- refactor(api): simplify API service
- test(backend): add unit tests
```

### Meaningful Commits

❌ Bad:
```
git commit -m "changes"
git commit -m "fixed stuff"
```

✅ Good:
```
git commit -m "feat(auth): implement JWT authentication"
git commit -m "fix(login): resolve null pointer exception"
git commit -m "docs(setup): add Docker Compose instructions"
```

## GitHub Issue Templates (Optional)

### Bug Report Template

Create `.github/ISSUE_TEMPLATE/bug_report.md`:

```markdown
---
name: Bug report
about: Report a bug
---

## Describe the bug
A clear description of what the bug is.

## Steps to reproduce
1. Go to '...'
2. Click on '...'
3. See error

## Expected behavior
What should happen.

## Actual behavior
What actually happens.

## Environment
- OS: [e.g. Windows, Mac, Linux]
- Java Version: [e.g. 11, 17]
- Node Version: [e.g. 14, 16, 18]

## Screenshots
If applicable, add screenshots.
```

### Feature Request Template

Create `.github/ISSUE_TEMPLATE/feature_request.md`:

```markdown
---
name: Feature request
about: Suggest an idea
---

## Is your feature request related to a problem?
Describe the problem.

## Describe the solution you'd like
What should be implemented.

## Describe alternatives you've considered
Other solutions or features.

## Additional context
Any other context.
```

## GitHub Actions - CI/CD Pipeline (Optional)

Create `.github/workflows/build.yml`:

```yaml
name: Build and Test

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  build-backend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        java-version: '11'
        distribution: 'temurin'
    
    - name: Build with Maven
      run: cd backend && mvn clean install
  
  build-frontend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: cd frontend && npm install
    
    - name: Build
      run: cd frontend && npm run build
```

## Code of Conduct (Optional)

Create `CODE_OF_CONDUCT.md`:

```markdown
# Code of Conduct

## Our Pledge
We are committed to providing a welcoming and inspiring community.

## Our Standards
- Use welcoming and inclusive language
- Be respectful of different opinions
- Accept constructive criticism gracefully
- Focus on what is best for the community

## Enforcement
Violations may be reported to the maintainers.
```

## Contributing Guide (Optional)

Create `CONTRIBUTING.md`:

```markdown
# Contributing

Thank you for your interest in contributing!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR-USERNAME/skill-14-auth-system.git`
3. Create a branch: `git checkout -b feature/awesome-feature`
4. Follow setup instructions in SETUP.md

## Making Changes

1. Make your changes
2. Test your code
3. Commit with meaningful messages
4. Push to your fork
5. Create a Pull Request

## Code Style

- Java: Follow Google Java Style Guide
- React: Use ESLint configuration
- Write descriptive variable names
- Add comments for complex logic

## Testing

- Test your changes locally
- Include test cases for new features
- Ensure backend tests pass: `mvn test`
- Ensure frontend builds: `npm run build`

## Pull Request Process

1. Update README.md if needed
2. Describe your changes clearly
3. Reference related issues
4. Wait for review and feedback
5. Respond to review comments
6. Merge after approval

## License

By contributing, you agree to license your changes under the same license as the project.
```

## Protecting Main Branch (Recommended)

1. Go to repository **Settings**
2. Click on **Branches**
3. Under "Branch protection rules", click "Add rule"
4. Branch name pattern: `main`
5. Enable:
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass
   - ✅ Dismiss stale pull request approvals
   - ✅ Restrict who can push to matching branches

## GitHub Pages (Optional - for Documentation)

You can publish documentation:

1. Go to **Settings → Pages**
2. Source: **Deploy from branch**
3. Branch: `main`
4. Folder: `/docs` or `/`
5. GitHub will build and publish automatically

Add your documentation to a `docs/` folder.

## Updating from Upstream (If Forked)

```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/repository.git
git fetch upstream
git rebase upstream/main
```

## GitHub Secrets (For CI/CD)

If you add secrets:

1. Go to **Settings → Secrets and variables → Actions**
2. Click **New repository secret**
3. Add secrets (API keys, credentials, etc.)

## README for GitHub

Your `README.md` should include:
- ✅ Project description
- ✅ Features
- ✅ Tech stack
- ✅ Quick start instructions
- ✅ Project structure
- ✅ API documentation
- ✅ Screenshots (optional)
- ✅ License
- ✅ Contributing guidelines

## Releases & Tags

When you have a stable version:

```bash
# Create a tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# Push tag
git push origin v1.0.0
```

Then create a Release on GitHub with release notes.

## Useful GitHub Features

1. **Projects**: Organize issues and PRs
2. **Discussions**: Community Q&A
3. **Wiki**: Additional documentation
4. **Milestones**: Track progress
5. **Labels**: Categorize issues
6. **Releases**: Version management

## Common GitHub Errors & Solutions

**Error: "fatal: not a git repository"**
```bash
cd skill-14  # Make sure you're in right directory
git init
```

**Error: "rejected ... (non-fast-forward update)"**
```bash
git pull origin main
# Resolve conflicts
git push origin main
```

**Error: "permission denied (publickey)"**
- Generate SSH key: `ssh-keygen -t ed25519`
- Add to GitHub: Settings → SSH and GPG keys

## Cloning for Others

Once pushed, others can clone:
```bash
git clone https://github.com/USERNAME/skill-14-auth-system.git
cd skill-14
# Follow SETUP.md
```

---

**Your project is ready for GitHub!** 🚀

Happy coding and collaborating! 💻✨
