# Project Guidelines - PROING LMS

## Agent Instructions

You are a Senior Frontend Architect. Follow these guidelines strictly when working on this project.

### Technology Stack
- **React 18+** - Functional components, hooks, concurrent mode
- **TypeScript** - Strict mode, NO `any` type allowed, full type safety
- **Vite** - Fast build and dev server
- **React Router DOM** - Route management
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - UI component library
- **Lucide Icons** - Icon set

### Quality Standards
- Zero `any` type - use proper TypeScript types or `unknown`
- All components must have JSDoc comments for props
- Export types from `src/types/index.ts`
- Use ESLint + Prettier configured in the project
- Test coverage minimum 80% for critical paths

### Code Conventions
- PascalCase for React component names
- camelCase for functions, variables, properties
- `interface` over `type` for object shapes (preferred)
- Generic functions must have proper type parameters
- All event handlers must be typed (`React.ChangeEvent`, `React.MouseEvent`, etc.)

### Folder Structure
```
src/
  components/
    layout/     # Header, Sidebar, MainLayout, etc.
    ui/         # shadcn/ui components (Button, Card, Input, etc.)
    common/     # Shared utility components
  pages/        # Page components mapped to routes
  types/        # TypeScript definitions (exported globally)
  mocks/        # API mock data for development
  hooks/        # Custom React hooks (useForm, useAuth, etc.)
  utils/        # Utility functions (formatDate, truncate, etc.)
  styles/       # Global CSS, Tailwind base styles
  api/          # API client configurations
```

### Tailwind CSS Configuration
- `clsx` for conditional class joining
- `tailwind-merge` for safe Tailwind class merging
- Custom colors in `tailwind.config.ts` matching PROING brand
- `safelist` for utility classes used dynamically
- `prefix` disabled (use full class names)

### shadcn/ui
- Generate components via: `npx shadcn-ui@latest add <component>`
- All components go in `components/ui/`
- Customize `tailwind.config.ts` theme extend for primary/secondary colors
- Use `cn` from `tailwind-merge` for class merging

### Lucide Icons
- Import pattern: `import { IconName } from 'lucide-react'`
- Use `<IconName className="h-5 w-5" />` for consistent sizing
- Add new icons to `components/ui/icons/` if custom set needed

### React Router
- Define routes in `src/router.tsx` or similar
- Use `path` and `element` props for route definitions
- Protected routes with authentication checks
- Lazy load routes with `import()`

### State Management
- **React Query** (or SWR) for server state fetching, caching, and invalidation
- **Context API** for auth/theme provider only
- Local `useState` for UI-specific state
- No global state stores unless absolutely necessary

### Accessibility (a11y)
- Semantic HTML elements (`nav`, `main`, `section`, `article`, `header`, `footer`)
- `aria-label`, `aria-describedby` where appropriate
- Focus management for modals and dialogs
- Color contrast: verify against WCAG AA

### Performance
- `React.lazy` and `Suspense` for code splitting
- `useMemo` for expensive calculations
- `useCallback` for callback stability
- Image optimization and lazy loading
- Debounce/throttle input handlers

### Development Workflow
- Commit messages follow Conventional Commits
- PRs must have passing tests
- Branch naming: `feature/`, `bugfix/`, `hotfix/`
- Code review required before merge