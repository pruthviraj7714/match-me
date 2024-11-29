"use client";

import { LucideHeart } from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import NavLink from "../NavLink";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import Image from "next/image";

export default function TopNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <div className="flex justify-between items-center bg-gradient-to-l from-pink-400 to-pink-700 p-6">
      <div
        onClick={() =>
          session?.user ? router.push("/home") : router.push("/")
        }
        className="flex items-center text-white cursor-pointer"
      >
        <LucideHeart size={35} />
        <span className="font-bold text-3xl">MatchMe</span>
      </div>
      {session?.user && (
        <div className="flex items-center gap-4">
          <NavLink label="Matches" currentPath={pathname} href="/members" />
          <NavLink label="Lists" currentPath={pathname} href="/lists" />
          <NavLink label="Messages" currentPath={pathname} href="/messages" />
        </div>
      )}
      {session?.user ? (
        <div className="flex items-center gap-2">
          <div className="h-14 w-14">
            <Image
              src={session?.user?.image}
              alt="Profile"
              className="rounded-full"
              height={100}
              width={100}
            />
          </div>
          <Button
            onClick={async () => {
              await signOut({
                redirect: false,
              });
              router.push("/");
              toast.success("Logged Out!");
            }}
            variant={"destructive"}
          >
            LogOut
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/login")}>Login</Button>
          <Button onClick={() => router.push("/register")}>Register</Button>
        </div>
      )}
    </div>
  );
}
