"use server";

import { revalidatePath } from "next/cache";

/**
 * REFERENCE IMPLEMENTATION - NOT CURRENTLY USED
 *
 * This Server Action demonstrates how to integrate server-side mutations with Next.js.
 * It is provided as a reference for future implementation if needed.
 *
 * Current Implementation:
 * - The application uses client-side API calls (api/favorites.ts) for favorite toggling
 * - LaunchCard component handles optimistic updates with error rollback
 * - This approach provides instant UI feedback and better UX
 *
 * When to use this Server Action:
 * - If you need to move mutation logic to the server for security
 * - If you want to leverage Next.js cache revalidation
 * - If you need to perform additional server-side operations after mutation
 *
 * Integration approach: revalidatePath
 * - This approach uses Next.js cache revalidation to refresh data after the action.
 * - The client component will re-fetch data after the action completes.
 * - Trade-offs:
 *   - Pros: Simple implementation, ensures data consistency with server
 *   - Cons: Requires additional network request, slightly slower UX than optimistic updates
 *   - Alternative: useOptimistic hook could provide instant UI feedback but adds complexity
 *
 * @param launchId - The flight number of the launch to toggle
 * @param isFavorite - Current favorite status (true = remove, false = add)
 * @param token - JWT authentication token from client
 */
export async function toggleFavorite(launchId: number, isFavorite: boolean, token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";
  const endpoint = `${baseUrl}/launches/${launchId}/favorite`;

  try {
    const response = await fetch(endpoint, {
      method: isFavorite ? "DELETE" : "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to toggle favorite: ${response.statusText}`);
    }

    // Revalidate the home page to refresh the launches list
    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Server action error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
