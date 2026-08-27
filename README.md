# Entelligo User Directory

A responsive user directory built as a frontend developer take-home assignment.

## Live Demo

https://entilligo-user-directory-five.vercel.app/

## Features

- Responsive user directory layout
- Fetches users from a public API
- Search users by name, email, company, or city
- User profile details page
- Loading skeleton states
- API error state with retry button
- Empty search results state
- Custom 404 page for unavailable users
- Responsive design for desktop and mobile
- Light and dark visual theme support

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide React
- JSONPlaceholder API

## Routes

- `/` — User directory homepage
- `/users/[id]` — Individual user details
- `/users/invalid-id` — Custom user not found page

## API

User data is fetched from:

https://jsonplaceholder.typicode.com/users

## Getting Started

Clone the repository:

```bash
git clone https://github.com/Samakcha/entilligo-user-directory.git
cd entilligo-user-directory
npm install
npm run dev
```

Open http://localhost:3000 in your browser.


## Project Structure

```
src/
├── app/
│   ├── users/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx
└── components/
    └── ui/
```


## AI Usage
AI tools were used as part of the development workflow for brainstorming, debugging, and implementation assistance. The final implementation was reviewed and tested manually, including the API flow, search functionality, routing, loading state, error state, responsive layout, linting, and production build.
