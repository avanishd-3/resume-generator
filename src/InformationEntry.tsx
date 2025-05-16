"use client"

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { useFieldArray} from "react-hook-form";
import type { Control} from "react-hook-form";

import {
  Form,
  FormControl,
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
  // Personal details
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }),
  email: z.string().min(1, { message: "Email is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  linkedIn: z.string()
    .min(1, { message: "LinkedIn URL is required" })
    .refine((val) => 
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(val ?? ""), // Verify URL is LinkedIn (so no security issues arise)
      'This is not a valid LinkedIn URL'
    ),
  gitHub: z.string()
          .min(1, { message: "GitHub URL is required" })
          .refine(
          (val) =>
            !val || /^(https?:\/\/)?(www\.)?github\.com\/.*$/.test(val),
          'This is not a valid GitHub URL'
        ),
  // Education details
  degrees: z.array(
    z.object({
      degree: z.string().min(1, { message: "Degree is required" }),
      institution: z.string().min(1, { message: "Institution is required" }),
      gradDate: z.string().min(1, { message: "Graduation date is required" }),
    })
  ).min(1, { message: "At least one degree is required" }),

  // Work experience details
  jobs: z.array(
    z.object({
      company: z.string().min(1, { message: "Company is required" }),
      position: z.string().min(1, { message: "Position is required" }),
      location: z.string().min(1, { message: "Location is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string().min(1, { message: "End date is required" }),
      description: z.array(z.object({ value: z.string().min(1, { message: "Bullet point is required" }) })).min(1, { message: "Description is required" }),
    })
  ).min(1, { message: "At least one job is required" }),
});

// TODO -> Make job scrolling a little less janky

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
      name: "John Doe",
      phone_number: "123-456-7809",
      email: "john_doe@gmail.com",
      address: "Los Angeles, CA",
      linkedIn: "https://www.linkedin.com/",
      gitHub: "https://www.github.com/",
      degrees: [
      {
        degree: "B.S. in Computer Science",
        institution: "University of California, Los Angeles",
        gradDate: "June 2023",
      },
    ],
    jobs: [
      {
        company: "Google",
        position: "Software Engineer Intern",
        location: "Mountain View, CA",
        startDate: "June 2022",
        endDate: "August 2022",
        description: [
          { value: "Worked on the Google Search team to improve search algorithms." },
          { value: "Implemented a new feature that increased user engagement by 20%." },
        ],
      }
    ]
    },
  });

  // Allow multiple degrees and jobs
  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "degrees",
  });

  const {fields: jobFields, append: jobAppend, remove: jobRemove} = useFieldArray({
    control: form.control,
    name: "jobs",
  });

 

  // Toggle expansion
  function toggleSection(section: keyof typeof openSections) {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    <div className="flex items-start justify-start min-h-svh scroll-auto dark:bg-slate-950 bg-slate-100 p-8">
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
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>LinkedIn</FormLabel>
                      <FormControl>
                        <Input placeholder="LinkedIn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gitHub"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>GitHub</FormLabel>
                      <FormControl>
                        <Input placeholder="GitHub" {...field} />
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
                openSections.education ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-6">
                {fields.map((item, idx) => (
                  <div key={item.id} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      {fields.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-xs"
                          onClick={() => remove(idx)}
                          disabled={idx === 0}
                          title={idx === 0 ? "Cannot remove the first degree" : "Remove"}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name={`degrees.${idx}.degree`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Degree</FormLabel>
                          <FormControl>
                            <Input placeholder="Degree" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`degrees.${idx}.institution`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Institution</FormLabel>
                          <FormControl>
                            <Input placeholder="Institution" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`degrees.${idx}.gradDate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Graduation Date</FormLabel>
                          <FormControl>
                            <Input placeholder="Graduation Date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() => append({ degree: "", institution: "", gradDate: "" })}
                >
                  Add Degree
                </button>
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
                openSections.work ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-6 scroll-auto">
                {jobFields.map((job, jobIdx) => (
                  <div key={job.id} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Job {jobIdx + 1}</span>
                      {jobFields.length > 1 && (
                        <button
                          type="button"
                          className="text-red-500 text-xs"
                          onClick={() => jobRemove(jobIdx)}
                          disabled={jobIdx === 0}
                          title={jobIdx === 0 ? "Cannot remove the first job" : "Remove"}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    <FormField
                      control={form.control}
                      name={`jobs.${jobIdx}.company`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company</FormLabel>
                          <FormControl>
                            <Input placeholder="Company" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`jobs.${jobIdx}.position`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Position</FormLabel>
                          <FormControl>
                            <Input placeholder="Position" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`jobs.${jobIdx}.location`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="Location" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`jobs.${jobIdx}.startDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Date</FormLabel>
                            <FormControl>
                              <Input placeholder="Start Date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`jobs.${jobIdx}.endDate`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>End Date</FormLabel>
                            <FormControl>
                              <Input placeholder="End Date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-2">
                      <span className="font-semibold">Description</span>
                      <JobDescriptionFields
                        nestIndex={jobIdx}
                        control={form.control}
                      />
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() =>
                    jobAppend({
                      company: "",
                      position: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: [{ value: "" }],
                    })
                  }
                >
                  Add Job
                </button>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">Submit</Button>
        </form>
      </Form>
    </div>
  );
}


type JobDescriptionFieldsProps = {
  nestIndex: number;
  control: Control<z.infer<typeof formSchema>>;
};

function JobDescriptionFields({ nestIndex, control }: JobDescriptionFieldsProps) {

  const { fields, append, remove } = useFieldArray({
    control,
    name: `jobs.${nestIndex}.description`,
  });

  return (
    <>
      {fields.map((desc, descIdx) => (
        <div key={desc.id} className="flex items-center gap-2 mt-1">
          <FormField
            control={control}
            name={`jobs.${nestIndex}.description.${descIdx}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input placeholder="Bullet point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <button
              type="button"
              className="text-red-500 text-xs"
              onClick={() => remove(descIdx)}
              title="Remove bullet"
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mt-1"
        onClick={() => append({ value: "" })}
      >
        Add Bullet
      </button>
    </>
  );
}

export default Information;