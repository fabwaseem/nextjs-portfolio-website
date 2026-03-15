# Contributing to Next.js Portfolio & Blog Platform

First off, thank you for considering contributing to this project! 🎉

## Code of Conduct

This project and everyone participating in it is governed by our commitment to providing a welcoming and inspiring community for all.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples**
- **Describe the behavior you observed and what you expected**
- **Include screenshots if relevant**
- **Include your environment details** (OS, Node version, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description of the suggested enhancement**
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Make your changes** following our coding standards
4. **Test your changes** thoroughly
5. **Commit your changes** using conventional commits
6. **Push to your fork** and submit a pull request

## Development Setup

1. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/nextjs-portfolio-website.git
cd nextjs-portfolio-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:

```bash
npx prisma migrate deploy
npx prisma generate
```

5. Run development server:

```bash
npm run dev
```

## Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference where appropriate

### Code Style

- Follow the existing code style
- Use ESLint and Prettier (configured in the project)
- Run `npm run lint` before committing
- Ensure `npm run typecheck` passes

### Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: fix bug in component
docs: update README
style: format code
refactor: refactor authentication
test: add tests for API
chore: update dependencies
```

Examples:

- `feat: add dark mode toggle to admin panel`
- `fix: resolve image upload issue in blog editor`
- `docs: add deployment instructions`

### Component Guidelines

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use proper prop types with TypeScript
- Add comments for complex logic

### File Naming

- Components: `PascalCase.tsx` (e.g., `BlogCard.tsx`)
- Utilities: `kebab-case.ts` (e.g., `format-date.ts`)
- Hooks: `use-kebab-case.ts` (e.g., `use-auth.ts`)

## Project Structure

```
app/              # Next.js app directory
components/       # React components
lib/             # Utility functions and helpers
prisma/          # Database schema and migrations
public/          # Static assets
```

## Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers if UI changes
- Test responsive design on different screen sizes

## Documentation

- Update README.md if needed
- Add JSDoc comments for complex functions
- Update API documentation for new endpoints
- Include examples in documentation

## Questions?

Feel free to open an issue with the `question` label or reach out to [@fabwaseem](https://github.com/fabwaseem).

## Recognition

Contributors will be recognized in the project README. Thank you for your contributions! 🙏
