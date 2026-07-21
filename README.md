# HireTrack

Track smarter. Apply better.

HireTrack is a job-application tracking dashboard built with React, TypeScript, and Vite.

## Tech stack

- **React 19** + **TypeScript**
- **Vite** — build tooling and dev server
- **TanStack Router** — type-safe, file-based routing
- **Tailwind CSS v4** — utility-first styling with CSS variable-based theming
- **shadcn/ui** — accessible, unstyled component primitives
- **lucide-react** / **react-icons** — icon sets

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

## Project structure

```
src/
├── components/ui/       # shadcn primitives (button, input, label, card)
├── features/
│   └── auth/            # AuthLayout, SignupForm, and other auth-scoped components
├── hooks/                # shared React hooks
├── lib/                  # utilities, helpers
├── routes/               # TanStack Router file-based routes
│   ├── __root.tsx        # root layout, wraps every route via <Outlet />
│   ├── login.tsx
│   └── signup.tsx
├── index.css             # global styles, Tailwind imports, theme tokens
├── main.tsx               # app entry point, router setup
└── routeTree.gen.ts       # auto-generated route tree (do not edit manually)
```

## Routing

Routes are file-based via TanStack Router. Adding a new page means adding a file under `src/routes/` — the route tree in `routeTree.gen.ts` regenerates automatically while `npm run dev` is running.

Every route renders inside `__root.tsx`'s `<Outlet />`. Shared page chrome (nav, sidebar, etc.) that should appear across specific groups of pages belongs in a pathless layout route (e.g. `_app.tsx`), not in the root route, to avoid leaking that chrome into pages like `/login` and `/signup` that shouldn't have it.

## Theming

Colors are defined as CSS variables in `index.css` under `:root` (light mode) and `.dark` (dark mode), following the shadcn convention. Every Tailwind utility class (`bg-primary`, `text-foreground`, etc.) resolves against these variables, so changing a theme color means editing the variable once in `index.css` — never a component file.

Dark mode is class-based: adding `class="dark"` to `<html>` switches every themed value app-wide. There is currently no automatic system-preference detection or toggle UI wired up yet — see `Roadmap` below.

## Scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Start the dev server with HMR        |
| `npm run build`   | Type-check and build for production  |
| `npm run lint`    | Run ESLint                           |
| `npm run preview` | Preview the production build locally |
