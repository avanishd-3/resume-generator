"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// Local imports
import type { ResumeData } from "./Resume";

// Form field types to be validated (only client-side)
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  education: z.string().min(1, { message: "Education is required" }),
  work_experience: z.string().min(1, { message: "Work experience is required" }),
});

function Information({ onSubmit }: { onSubmit: (data: ResumeData) => void }) {

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  // Track expansion state of sections
  const [openSections, setOpenSections] = useState({
    personal: true,
    education: false,
    work: false,
  });

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone_number: "",
      email: "",
      address: "",
      education: "",
      work_experience: "",
    },
  });

  // Toggle expansion
  function toggleSection(section: keyof typeof openSections) {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="flex items-start justify-start min-h-svh dark:bg-slate-950 bg-slate-100 p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[350px]">
          {/* Personal Details Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("personal")}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2">
              Personal Details
              <span>{openSections.personal ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.personal ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name" {...field} />
                      </FormControl>
                      <FormDescription>This is your full name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input placeholder="Phone Number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("education")}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2"
            >
              Education
              <span>{openSections.education ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.education ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="education"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Education</FormLabel>
                      <FormControl>
                        <Input placeholder="Education" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div>
            <button
              type="button"
              onClick={() => toggleSection("work")}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2"
            >
              Work Experience
              <span>{openSections.work ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openSections.work ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2">
                <FormField
                  control={form.control}
                  name="work_experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Work Experience</FormLabel>
                      <FormControl>
                        <Input placeholder="Work Experience" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

export default Information;