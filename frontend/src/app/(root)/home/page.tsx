import Image from "next/image";
import Link from "next/link";
import { Heart, MessageCircle, Search } from "lucide-react";
import { fetchUserInfo } from "@/actions/actions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/");
  }

  const user = await fetchUserInfo(session.user.id);
  return (
    <div className="bg-gradient-to-b from-pink-100 to-white min-h-screen flex flex-col items-center py-12">
      <section className="container mx-auto mt-8 text-center relative">
        <Image
          src="https://i.pinimg.com/736x/8f/c0/ad/8fc0ade34c5152743a926e16317b1b5c.jpg"
          alt="Decorative hearts"
          width={200}
          height={200}
          className="absolute top-0 left-0 opacity-20"
        />
        <Image
          src="https://i.pinimg.com/736x/d0/a0/f9/d0a0f9a34abf67e95774a0b6ae9e0adc.jpg"
          alt="Decorative hearts"
          width={200}
          height={200}
          className="absolute top-0 right-0 opacity-20"
        />
        <h1 className="text-4xl font-bold text-pink-600">
          Welcome to MatchMe!
        </h1>
        <p className="text-gray-600 mt-4 text-xl">
          Ready to connect with amazing people? Let's get started!
        </p>
      </section>

      <main className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 px-4">
        <div className="bg-white shadow-lg rounded-xl p-6 text-center transform transition duration-500 hover:scale-105">
          <div className="mb-4 flex justify-center">
            <Image
              src={user.profilePicture}
              alt="Profile icon"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-pink-600">
            Your Profile
          </h2>
          <p className="text-gray-600 mb-6">
            Update your details, pictures, and preferences to find your perfect
            match.
          </p>
          <Link
            href="/profile"
            className="mt-4 inline-flex items-center justify-center bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition duration-300"
          >
            <Heart className="mr-2 h-5 w-5" />
            Go to Profile
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center transform transition duration-500 hover:scale-105">
          <div className="mb-4 flex justify-center">
            <Image
              src="https://i.pinimg.com/736x/d1/d1/eb/d1d1eb17b5db67ab45da4464be7731ad.jpg"
              alt="Messages icon"
              width={100}
              height={100}
              className="rounded-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-pink-600">Messages</h2>
          <p className="text-gray-600 mb-6">
            Connect with people in real-time and start meaningful conversations.
          </p>
          <Link
            href="/messages"
            className="mt-4 inline-flex items-center justify-center bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition duration-300"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            Go to Chat
          </Link>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 text-center transform transition duration-500 hover:scale-105">
          <div className="mb-4 flex justify-center">
            <Image
              src="https://i.pinimg.com/736x/3b/0c/05/3b0c05c06d3502b92d7fa03b656a8c39.jpg"
              alt="Discover icon"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <h2 className="text-2xl font-bold mb-4 text-pink-600">Discover</h2>
          <p className="text-gray-600 mb-6">
            Browse profiles and find your perfect match using our advanced
            search features.
          </p>
          <Link
            href="/discover"
            className="mt-4 inline-flex items-center justify-center bg-pink-600 text-white py-2 px-6 rounded-full hover:bg-pink-700 transition duration-300"
          >
            <Search className="mr-2 h-5 w-5" />
            Go to Discover
          </Link>
        </div>
      </main>

      <section className="container mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          Why Choose MatchMe?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Image
              src="https://i.pinimg.com/236x/c0/c9/a2/c0c9a27d614112f00d980fa3355c77c2.jpg"
              alt="Safety icon"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Safe and Secure</h3>
            <p className="text-gray-600">
              Your safety is our top priority. Enjoy a secure dating experience.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Image
              src="https://i.pinimg.com/474x/53/da/53/53da5372de648dbf7f7437e312cdd001.jpg"
              alt="Matching icon"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
            <p className="text-gray-600">
              Our algorithm ensures you meet people who truly match your
              preferences.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <Image
              src="https://i.pinimg.com/736x/d7/8f/45/d78f45948b235f2dba8d57a93efdc805.jpg"
              alt="Community icon"
              width={80}
              height={80}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Vibrant Community</h3>
            <p className="text-gray-600">
              Join a diverse and active community of singles ready to mingle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
