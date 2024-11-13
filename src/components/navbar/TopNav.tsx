"use client"

import { LucideHeart } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NavLink from "../NavLink";

export default function TopNav() {
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex justify-between items-center bg-gradient-to-l from-pink-400 to-pink-700 p-6">
      <div className="flex items-center text-white">
        <LucideHeart size={35} />
        <span className="font-bold text-3xl">MatchMe</span>
      </div>
      <div className="flex items-center gap-4">
        <NavLink label="Matches" currentPath={pathname} href="/matches" />
        <NavLink label="Lists" currentPath={pathname} href="/lists" />
        <NavLink label="Messages" currentPath={pathname} href="/messages" />
      </div>
      <div className="flex items-center gap-3">
        <Button>Login</Button>
        <Button>Register</Button>
      </div>
    </div>
  );
}
