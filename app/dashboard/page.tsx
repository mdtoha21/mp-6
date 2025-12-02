"use client";
import { useSearchParams } from "next/navigation";

export default function Dashboard() {
  const search = useSearchParams();
  const login = search.get("login");
  const avatar = search.get("avatar");
  const html_url = search.get("html_url");
  const name = search.get("name");

  if (!login) return <div>Please sign in again.</div>;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold">Welcome, {name || login}</h1>
      <img src={avatar || ""} alt="avatar" className="w-24 h-24 rounded-full mt-4" />
      <a href={html_url || "#"} target="_blank" className="mt-2 text-blue-600">
        View GitHub Profile
      </a>
    </div>
  );
}
