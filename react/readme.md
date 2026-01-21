# React (Next.js 16)

This app has been migrated to Next.js 16.

## Getting Started

1.  Copy `.env.example` to `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

## The Challenge

The exercise consists of building some missing parts on an application to view Spacex’s latest launches, and being able to add them to a “favorite” list to revisit them later.

### Tasks

1.  **Authentication**: Go to `src/api/admin.ts` -> `login` and connect the app with the `/admin/token` endpoint (Node API) to get a fresh new JWT. Save it via `AuthContext`.
    -   The `Login` view is at `src/views/Login/index.tsx`.
    -   When authenticated, the app should show the Home page (Launches List).

2.  **Styling**: At this point you should be looking at an ugly `<Search/>` component (`src/components/Search`). Complete the `.scss` file or use Tailwind to make it look professional (reference Figma if available, or just make it nice).

3.  **Functionality**: Under `src/containers/LaunchesList/index.tsx` you will find the Search component being used. Complete it with the functionality needed to make the input filter by `mission_name`.

4.  **State Management**: The star icon (favorite) is hitting API endpoints but not updating local state efficiently. Find the best way to handle this update in `src/containers/LaunchesList/index.tsx`.

5.  **Server Actions (Next.js 16)**: We want to modernize the favorite toggling. Check `src/app/actions.ts`. Implement a Server Action `toggleFavorite` that handles the API call on the server side. Discuss how you would integrate this with the client-side list (e.g., `useOptimistic` or revalidation).

6.  **Rendering Strategies**: Go to `src/app/rendering/page.tsx`. Currently, the Home page uses Client Side Rendering (CSR). We want to compare this with Server Side Rendering (SSR) / React Server Components (RSC). Implement a server-side fetched version of the launches list in this page and discuss the differences (performance, UX, etc.).
