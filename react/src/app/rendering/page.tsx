import { LaunchesListClient } from "./LaunchesListClient";
import { Layout } from "@/components/Layout";
import { Launch } from "types";

/**
 * Rendering Strategies Comparison Page
 * 
 * This page demonstrates Server Side Rendering (SSR) for the launches list.
 * 
 * SSR vs CSR Comparison:
 * 
 * Performance:
 * - SSR: Data is fetched on the server before sending HTML. Initial page load includes content.
 *   - Faster Time to First Byte (TTFB) for content
 *   - Better SEO (search engines can crawl content)
 *   - No hydration delay for initial content
 * - CSR: Data is fetched in useEffect on the client after initial render.
 *   - Initial page load shows empty/loading state
 *   - Slower initial content paint
 *   - Better for highly interactive applications
 * 
 * UX:
 * - SSR: Users see content immediately (no loading spinner for initial data)
 * - CSR: Users see loading state, then content (can feel slower)
 * 
 * Complexity:
 * - SSR: Requires separating server and client components. Authentication needs special handling
 *   (Server Components can't access localStorage/cookies directly).
 * - CSR: Simpler for interactive features, all code runs on client.
 * 
 * When to use SSR:
 * - Public pages that need SEO
 * - Content-heavy pages with minimal interactivity
 * - When initial load performance is critical
 * 
 * When to use CSR:
 * - Highly interactive dashboards
 * - User-specific content that requires authentication
 * - When real-time updates are needed
 */

async function fetchLaunches(): Promise<Launch[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const response = await fetch(`${baseUrl}/launches`, {
    cache: "no-store", // Disable caching to get fresh data
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch launches: ${response.statusText}`);
  }

  return response.json();
}

/**
 * AUTHENTICATION LIMITATION:
 *
 * This Server Component fetches data without an authentication token.
 * If the backend requires authentication for the /launches endpoint,
 * this fetch will fail with a 401 Unauthorized error.
 *
 * Server Components cannot access localStorage or cookies directly.
 * To implement authenticated SSR, you would need to:
 * 1. Use cookies for authentication (accessible in Server Components)
 * 2. Pass auth tokens from client to server via headers
 * 3. Use middleware to handle authentication
 *
 * For this demo, we assume the /launches endpoint is public.
 * If you need authenticated data in SSR, consider using cookie-based auth.
 */

export default async function RenderingStrategies() {
  // Fetch data on the server (SSR)
  const launches = await fetchLaunches();

  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">
          Rendering Strategies: Server Side Rendering (SSR)
        </h1>
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">SSR vs CSR Comparison</h2>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Performance:</strong> SSR fetches data on server, sending complete HTML.
              CSR fetches data on client after initial render.
            </li>
            <li>
              <strong>SEO:</strong> SSR is better for search engines (content is in HTML).
              CSR content is rendered after JavaScript executes.
            </li>
            <li>
              <strong>UX:</strong> SSR shows content immediately. CSR shows loading state first.
            </li>
            <li>
              <strong>Complexity:</strong> SSR requires separating server/client components.
              CSR is simpler for interactive features.
            </li>
          </ul>
        </div>
        <p className="mb-4 text-sm text-gray-400">
          This list uses SSR for initial data fetch. Interactive features (search, pagination,
          favorites) are handled by a client component.
        </p>
        <LaunchesListClient initialLaunches={launches} />
      </div>
    </Layout>
  );
}
