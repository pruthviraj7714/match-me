"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { UserProps } from "@/types/user.types";
import MemberCard from "@/components/MemberCard";
import { LucideLoader2, Users } from "lucide-react";

export default function MembersPage() {
  const [members, setMembers] = useState<UserProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get("/api/members/all");
      setMembers(res.data.members);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch members");
      toast.error(error.response?.data?.message || "Failed to fetch members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LucideLoader2 className="animate-spin text-pink-400 size-14" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900 dark:text-gray-100">
          Our Members
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Meet the amazing individuals in our community
        </p>
      </header>

      {error ? (
        <div className="rounded-lg bg-red-100 p-4 text-center text-red-700">
          <p>{error}</p>
          <button
            onClick={fetchMembers}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      ) : members.length === 0 ? (
        <div className="text-center text-gray-600 dark:text-gray-400">
          <Users className="mx-auto h-12 w-12 opacity-50" />
          <p className="mt-2">No members found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      )}
    </div>
  );
}
