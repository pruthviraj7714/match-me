"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import axios from "axios";
import { Check, HeartHandshake, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RegisterSchema } from "@/types/schemas";
import { COUNTRIES, PROFILE_IMAGES } from "@/constants/constants";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const interests = [
  { id: "anime", label: "Anime" },
  { id: "movies", label: "Movies" },
  { id: "reading", label: "Reading" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "yoga", label: "Yoga" },
  { id: "travel", label: "Travel" },
  { id: "photography", label: "Photography" },
];

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      image: "",
      password: "",
      bio: "",
      dateOfBirth: "",
      country: "",
      gender: "MALE",
      interests: [],
    },
    mode: "onTouched",
  });

  const validateStep = async () => {
    switch (step) {
      case 1:
        return form.trigger(["name", "username", "dateOfBirth"]);
      case 2:
        return form.trigger(["password", "confirmPassword"]);
      case 3:
        return form.trigger(["image", "bio", "gender", "interests", "country"]);
      default:
        return false;
    }
  };

  const nextStep = async () => {
    if (await validateStep()) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    try {
      setIsSubmitting(true);
      values = { ...values, image: selectedProfilePic };
      await axios.post("/api/auth/signup", values);
      console.log(values);
      toast.success("Registration successful! You can now sign in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(`Registration failed: ${error.response?.data?.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full shadow-2xl bg-white rounded-lg">
        <CardHeader className="space-y-4 p-6 border-b">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-pink-600">
            <HeartHandshake className="h-8 w-8 text-pink-500" />
            MatchMe
          </CardTitle>
          <CardDescription className="text-center text-lg font-medium text-gray-700">
            Step {step} of 3:{" "}
            <span className="text-pink-600">
              {step === 1
                ? "Personal Info"
                : step === 2
                ? "Account Setup"
                : "Profile Details"}
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* Step 1 */}
              <div
                className={`transition-all w-[450px] duration-300 ease-in-out ${
                  step === 1
                    ? "opacity-100 h-auto"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your full name"
                          {...field}
                          className="focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Choose a username"
                          {...field}
                          className="focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date Of Birth</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Choose a date of Birth"
                          {...field}
                          className="focus:ring-2 focus:ring-pink-400"
                          type="date"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`transition-all w-[450px] duration-300 ease-in-out ${
                  step === 2
                    ? "opacity-100 h-auto"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Create a strong password"
                          {...field}
                          className="focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm Your Password"
                          {...field}
                          className="focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div
                className={`transition-all w-[950px] duration-300 ease-in-out ${
                  step === 3
                    ? "opacity-100 h-auto"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Pick a Profile Picture:
                    </h3>
                    <div className="grid grid-cols-4 gap-2">
                      {PROFILE_IMAGES.map((pic) => (
                        <div
                          key={pic}
                          className={`relative cursor-pointer rounded-lg overflow-hidden group ${
                            selectedProfilePic === pic
                              ? "ring-4 ring-pink-500"
                              : "hover:ring-2 hover:ring-pink-300"
                          }`}
                        >
                          <Image
                            src={pic}
                            alt="Profile Picture"
                            width={80}
                            height={80}
                            className="transition-transform duration-300 ease-in-out transform group-hover:scale-105"
                            onClick={() => setSelectedProfilePic(pic)}
                          />
                          {selectedProfilePic === pic && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40">
                              <Check className="text-white h-8 w-8" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about yourself"
                              {...field}
                              className="focus:ring-2 focus:ring-pink-400"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="country"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400">
                                <SelectValue placeholder="Select your country" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {COUNTRIES.map((country) => (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400">
                                <SelectValue placeholder="Select your gender" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="MALE">Male</SelectItem>
                              <SelectItem value="FEMALE">Female</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="interests"
                      render={() => (
                        <FormItem>
                          <FormLabel>Interests</FormLabel>
                          <div className="grid grid-cols-2 gap-2">
                            {interests.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="interests"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                          className="transition-all duration-300 ease-in-out data-[state=checked]:bg-pink-500 data-[state=checked]:border-pink-500"
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  );
                                }}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={isSubmitting}
                    className="hover:bg-pink-100"
                  >
                    Previous
                  </Button>
                )}
                <Button
                  type={step === 3 ? "submit" : "button"}
                  onClick={step === 3 ? undefined : nextStep}
                  disabled={isSubmitting}
                  className="bg-pink-500 hover:bg-pink-600 text-white"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      Submitting... <Loader2 />
                    </div>
                  ) : step === 3 ? (
                    "Submit"
                  ) : (
                    "Next"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center p-4 border-t">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-pink-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
