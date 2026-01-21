export default async function RenderingStrategies() {
  // Challenge: Implement two versions of the Launches List here or in separate routes:
  // 1. One using Client Side Rendering (CSR) - like the Home page.
  // 2. One using Server Side Rendering (SSR) / React Server Components (RSC).
  //
  // Compare the performance and discuss the pros/cons.
  //
  // For SSR, you can fetch data directly in this component (async/await).

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Rendering Strategies Challenge
      </h1>
      <p>
        Currently, the Home page uses Client Side Rendering (fetching data in
        useEffect).
      </p>
      <p className="mt-4">
        Your task is to implement a Server Component version of the list here.
      </p>
      {/* TODO: Implement SSR List */}
    </div>
  );
}
