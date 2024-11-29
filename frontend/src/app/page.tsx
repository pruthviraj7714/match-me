
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authOptions } from "@/lib/auth"
import { Heart, MessageCircle, UserCheck, ChevronRight } from 'lucide-react'
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function MatchmeLandingPage() {
  const session =  await getServerSession(authOptions);

  if(session && session.user) {
    redirect('/home');
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-pink-50">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <Image
                alt="Happy couple"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height={550}
                src="https://images.pexels.com/photos/1759823/pexels-photo-1759823.jpeg?auto=compress&cs=tinysrgb"
                width={550}
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Find Your Perfect Match
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl">
                    Join Matchme and discover meaningful connections. Our advanced algorithm ensures you meet people who
                    truly resonate with you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-pink-600 hover:bg-pink-700" size="lg">
                    Get Started
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Why Choose Matchme?</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Heart className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold">Smart Matching</h3>
                <p className="text-gray-500">Our AI-powered algorithm ensures you meet compatible partners.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold">Safe Communication</h3>
                <p className="text-gray-500">Enjoy secure and private conversations with your matches.</p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <UserCheck className="h-6 w-6 text-pink-500" />
                </div>
                <h3 className="text-xl font-bold">Verified Profiles</h3>
                <p className="text-gray-500">Rest easy knowing all our users are real and verified.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Success Stories</h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
                <Image
                  alt="Sarah & John"
                  className="rounded-full"
                  height={100}
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                />
                <h3 className="text-xl font-bold">Sarah & John</h3>
                <p className="text-gray-500">
                  "Thanks to Matchme, we found each other and have been happily married for 2 years now!"
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
                <Image
                  alt="Emily & Michael"
                  className="rounded-full"
                  height={100}
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                />
                <h3 className="text-xl font-bold">Emily & Michael</h3>
                <p className="text-gray-500">
                  "We never thought we'd find love online, but Matchme made it possible. We're engaged!"
                </p>
              </div>
              <div className="flex flex-col items-center text-center space-y-4 p-6 bg-white rounded-lg shadow-lg">
                <Image
                  alt="David & Lisa"
                  className="rounded-full"
                  height={100}
                  src="/placeholder.svg?height=100&width=100"
                  width={100}
                />
                <h3 className="text-xl font-bold">David & Lisa</h3>
                <p className="text-gray-500">
                  "Matchme's algorithm is spot-on! We're so compatible and have been dating for a year now."
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-pink-600">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">
                Ready to Find Your Perfect Match?
              </h2>
              <p className="max-w-[600px] text-white md:text-xl">
                Join thousands of happy couples who found love on Matchme. Your perfect match is just a click away!
              </p>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="flex-1" placeholder="Enter your email" type="email" />
                  <Button className="bg-white text-pink-600 hover:bg-gray-100" type="submit">
                    Join Now
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">© 2024 Matchme. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  )
}