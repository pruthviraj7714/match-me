"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Check, HeartHandshake } from "lucide-react";
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

const interests = [
  { id: "anime", label: "Anime" },
  { id: "movies", label: "Movies" },
  { id: "tvShows", label: "TV Shows" },
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
];

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProfilePic, setSelectedProfilePic] = useState("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      username: "",
      image: "",
      password: "",
      bio: "",
      country: "",
      gender: "MALE",
      interests: [],
    },
    mode: "onTouched"
  });

  const validateStep = async (stepNumber: number) => {
    let isValid = false;
    switch (stepNumber) {
      case 1:
        isValid = await form.trigger(["name", "username"]);
        break;
      case 2:
        isValid = await form.trigger(["password", "confirmPassword"]);
        break;
      case 3:
        isValid = await form.trigger(["image", "bio", "gender", "interests"]);
        break;
      default:
        isValid = false;
    }
    return isValid;
  };

  const nextStep = async () => {
    const isValid = await validateStep(step);
    if (isValid) {
      setStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    setStep((prev) => prev - 1);
  };

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    values = {
      ...values,
      image: selectedProfilePic,
    };
    try {
      setIsSubmitting(true);
      const isValid = await form.trigger();
      if (!isValid) {
        return;
      }
      console.log("Final Submission:", values);
      alert("Registration successful!");
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-[450px] shadow-2xl">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 text-pink-600">
            <HeartHandshake className="h-8 w-8 text-pink-500" />
            MatchMe
          </CardTitle>
          <CardDescription className="text-center text-lg font-medium">
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
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div
                className={`transition-all duration-300 ease-in-out ${
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
                          className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400"
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
                          className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
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
                          className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400"
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
                          className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${
                  step === 3
                    ? "opacity-100 h-auto"
                    : "opacity-0 h-0 overflow-hidden"
                }`}
              >
                <>
                  <h3 className="font-semibold text-gray-700 my-2">
                    Pick a Profile Picture For You:
                  </h3>
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {PROFILE_IMAGES.map((pic) => (
                      <div key={pic} className="relative cursor-pointer group">
                        <Image
                          src={pic}
                          alt="Profile Picture"
                          width={300}
                          height={300}
                          onClick={() => setSelectedProfilePic(pic)}
                          className={`rounded-lg transition-all duration-300 ease-in-out ${
                            selectedProfilePic === pic
                              ? "ring-4 ring-pink-500"
                              : "group-hover:ring-2 group-hover:ring-pink-300"
                          }`}
                        />
                        {selectedProfilePic === pic && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
                            <Check className="text-white h-8 w-8" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
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
                          className="transition-all duration-300 ease-in-out focus:ring-2 focus:ring-pink-400"
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
                                      checked={field.value?.includes(item.id)}
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
              <div className="flex justify-between pt-4">
                {step > 1 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={previousStep}
                    disabled={isSubmitting}
                    className="transition-all duration-300 ease-in-out hover:bg-pink-100"
                  >
                    Previous
                  </Button>
                )}
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    disabled={isSubmitting}
                    className={`${
                      step === 1 ? "ml-auto" : ""
                    } bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 ease-in-out`}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="ml-auto bg-pink-500 hover:bg-pink-600 text-white transition-all duration-300 ease-in-out"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-pink-600 hover:underline transition-all duration-300 ease-in-out"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
