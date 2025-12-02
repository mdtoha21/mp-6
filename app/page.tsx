

export default function Home() {
  return (
    <main className="p-10 flex flex-col items-center">
      <h1 className="text-2xl font-bold">Simple OAuth App</h1>
      <a href="/api/login"
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
     >   
  Sign in with GitHub
</a>
    </main>
  );
}
