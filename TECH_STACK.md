# Tech Stack Overview

Here is the tech stack used in your **Stakeholder Platform** application, based on the current configuration (`package.json`, `prisma/schema.prisma`).

## 1. Core Framework & Language
- **Framework:** [Next.js](https://nextjs.org/) (v16.1.1) - Utilizing the App Router and Turbopack.
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.9.3) - Statically typed JavaScript.
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (v4.24.13) - Secure authentication handling.

## 2. Database & ORM
- **Database:** PostgreSQL (via `@prisma/adapter-pg` driver).
- **ORM:** [Prisma](https://www.prisma.io/) (v7.3.0) - Type-safe database client.
- **Vector Database:** [Pinecone](https://www.pinecone.io/) (v6.1.3) - For AI search and embeddings.

## 3. UI & Styling
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.18) - Utility-first CSS framework.
- **Component Primitives:** [Radix UI](https://www.radix-ui.com/) - Unstyled accessible components (Dialog, Dropdown, Avatar, etc.).
- **Icons:** [Lucide React](https://lucide.dev/) (v0.562.0) - Beautiful & consistent icons.
- **Form Handling:** [React Hook Form](https://react-hook-form.com/) (v7.71.1) + [Zod](https://zod.dev/) (v4.3.5) for schema validation.
- **Utilities:** `clsx` and `tailwind-merge` for class merging.

## 4. State Management & Data Fetching
- **Global State:** [Zustand](https://github.com/pmndrs/zustand) (v5.0.10) - Small, fast, scalable bearbones state-management.
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) (v5.90.17) - Powerful asynchronous state management.

## 5. Additional Libraries
- **Maps:** [React Leaflet](https://react-leaflet.js.org/) (v5.0.0) - React components for Leaflet maps.
- **File Uploads:** [Uppy](https://uppy.io/) (v5.2.1) - Modular file uploader.
- **Date Handling:** [date-fns](https://date-fns.org/) (v4.1.0).
- **Charts:** [Recharts](https://recharts.org/) (v3.6.0).
- **Excel/CSV:** `xlsx` and `papaparse` for data import/export.
- **Calendar:** [FullCalendar](https://fullcalendar.io/) (v6.1.20).

## 6. AI & Machine Learning
- **SDK:** [OpenAI](https://platform.openai.com/docs/libraries/node-js-library) (v6.16.0) - Integration with OpenAI models.
- **Embeddings:** Managed via Pinecone.

## Current Setup Notes
- **Prisma Client:** Recently updated to support slug routing. If you see TypeScript errors regarding `.slug`, please try restarting your editor or the TypeScript server (`Ctrl+Shift+P` -> `TypeScript: Restart TS Server`).
- **Development Server:** Running via `npm run dev`.
