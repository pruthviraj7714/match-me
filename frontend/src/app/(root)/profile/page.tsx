"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { User2Icon, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IoMdMale, IoMdFemale } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserProps } from "@/types/user.types";
import { MemberEditSchema } from "@/types/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COUNTRIES } from "@/constants/constants";

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

export default function ProfilePage() {
  const [userInfo, setUserInfo] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof MemberEditSchema>>({
    resolver: zodResolver(MemberEditSchema),
    defaultValues: {
      name: "",
      bio: "",
      country: "",
      interests: [],
    },
  });

  const fetchUserInfo = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/info");
      setUserInfo(res.data.user);
      form.reset({
        name: res.data.user.name || "",
        bio: res.data.user.bio || "",
        country: res.data.user.country || "",
        interests: res.data.user.interests || [],
      });
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch user info");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: z.infer<typeof MemberEditSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.put("/api/user/update", data);
      setUserInfo(res.data.user);
      setIsEditing(false);
      toast.success("Profile updated successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (userInfo) {
      form.reset({
        name: userInfo.name || "",
        bio: userInfo.bio || "",
        country: userInfo.country || "",
        interests: userInfo.interests || [],
      });
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin size-10 text-pink-500" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Your Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center mb-6">
            <Avatar className="w-24 h-24">
              <AvatarImage
                src={userInfo?.profilePicture}
                alt={userInfo?.name || "User"}
              />
              <AvatarFallback>
                <User2Icon className="w-12 h-12" />
              </AvatarFallback>
            </Avatar>
            <h2 className="mt-4 text-xl font-semibold">
              {userInfo?.username || "N/A"}
            </h2>
            <p className="text-sm flex items-center gap-1.5 text-muted-foreground">
              DOB:{" "}
              {userInfo?.dateOfBirth
                ? new Date(userInfo.dateOfBirth).toLocaleDateString()
                : "N/A"}
              {userInfo?.gender === "MALE" ? (
                <IoMdMale className="size-4 text-sky-400" />
              ) : (
                <IoMdFemale className="size-4 text-pink-400" />
              )}
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself"
                        className="resize-none"
                        {...field}
                        disabled={!isEditing}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {isEditing ? (
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger className="text-black focus:ring-2 focus:ring-pink-400">
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
              ) : (
                <div>
                  <FormLabel>Country</FormLabel>

                  <Input
                    disabled
                    value={form.getValues("country") || "Not specified"}
                    className="text-sm font-medium text-gray-700"
                  />
                </div>
              )}

              <FormField
                control={form.control}
                name="interests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Interests</FormLabel>
                    <FormDescription>Select your interests</FormDescription>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {interests.map((item) => (
                        <div
                          key={item.id}
                          className="flex flex-row items-start space-x-3"
                        >
                          <Checkbox
                            checked={field.value?.includes(item.label)}
                            onCheckedChange={(checked) => {
                              const newValue = checked
                                ? [...field.value, item.label]
                                : field.value.filter(
                                    (value) => value !== item.label
                                  );
                              field.onChange(newValue);
                            }}
                            disabled={!isEditing}
                          />
                          <FormLabel className="font-normal">
                            {item.label}
                          </FormLabel>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-between items-center gap-4">
                {isEditing ? (
                  <div className="button-group">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
