"use client"

import { LucideHeart } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "../NavLink";

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex justify-between items-center bg-gradient-to-l from-pink-400 to-pink-700 p-6">
      <div onClick={() => router.push('/')} className="flex items-center text-white cursor-pointer">
        <LucideHeart size={35} />
        <span className="font-bold text-3xl">MatchMe</span>
      </div>
      <div className="flex items-center gap-4">
        <NavLink label="Matches" currentPath={pathname} href="/members" />
        <NavLink label="Lists" currentPath={pathname} href="/lists" />
        <NavLink label="Messages" currentPath={pathname} href="/messages" />
      </div>
      <div className="flex items-center gap-3">
        <Button onClick={() => router.push('/login')}>Login</Button>
        <Button onClick={() => router.push('register')}>Register</Button>
      </div>
    </div>
  );
}
