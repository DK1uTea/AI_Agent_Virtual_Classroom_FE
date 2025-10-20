import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center gap-3">
      <h1 className="text-5xl uppercase text-cyan-400 text-center">Welcome to Landing Page</h1>
      <Link href="/login" className="border rounded-full bg-red-300 px-6 py-3 font-bold">Login for more</Link>
    </main>
  );
}
