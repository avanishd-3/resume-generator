// So form submission is allowed
/* eslint-disable @typescript-eslint/no-misused-promises */

// So using things like name={`degrees.${idx}.degree`} is allowed
/* eslint-disable @typescript-eslint/restrict-template-expressions */

"use client" // No server stuff done here

// Form validation and submission
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import { useFieldArray} from "react-hook-form";
import type { Control} from "react-hook-form";

// UI components
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
import { Textarea } from "@/components/ui/textarea";

// General React stuff
import { useState } from "react";

// Import default values for the form
import { DefaultResumeValues } from "./lib/defaultResumeValues";
// Form field types to be validated (only client-side)

const formSchema = z.object({
  // Personal details
  name: z.string().min(1, { message: "Name is required" }),
  phone_number: z.string().min(1, { message: "Phone number is required" }), // TODO -> Add phone number validation
  email: z.string().email().min(1, { message: "Email is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  linkedIn: z.string()
    .min(1, { message: "LinkedIn URL is required" })
    .startsWith("https://", { message: "LinkedIn URL must start with https://" })
    .refine((val) => 
      /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(val), // Verify URL is LinkedIn (so no security issues arise)
      'This is not a valid LinkedIn URL'
    ),
  gitHub: z.string()
          .startsWith("https://", { message: "GitHub URL must start with https://" })
          .refine(
          (val) =>
            !val || /^(https?:\/\/)?(www\.)?github\.com\/.*$/.test(val),
          'This is not a valid GitHub URL'
         ).optional().or(z.literal("")), // Allow user to not provide a GitHub URL

  // Education details
  degrees: z.array(
    z.object({
      id: z.string().uuid().min(1, { message: "ID is required" }),
      degree: z.string().min(1, { message: "Degree is required" }),
      institution: z.string().min(1, { message: "Institution is required" }),
      gradDate: z.string().min(1, { message: "Graduation date is required" }),
    })
  ).min(1, { message: "At least one degree is required" }),

  // Work experience details
  jobs: z.array(
    z.object({
      id: z.string().uuid().min(1, { message: "ID is required" }),
      company: z.string().min(1, { message: "Company is required" }),
      position: z.string().min(1, { message: "Position is required" }),
      location: z.string().min(1, { message: "Location is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string().min(1, { message: "End date is required" }),
      description: z.array(z.object({ id: z.string().uuid().min(1, "ID is required"), value: z.string().min(1, { message: "Bullet point is required" }) })).min(1, { message: "Description is required" }),
    })
  ).min(1, { message: "At least one job is required" }),

  // Projects details
  projects: z.array(
    z.object({
      id: z.string().uuid().min(1, { message: "ID is required" }),
      title: z.string().min(1, { message: "Project title is required" }),
      startDate: z.string().min(1, { message: "Start date is required" }),
      endDate: z.string().min(1, { message: "End date is required" }),
      description: z.array(z.object({ id: z.string().uuid().min(1, "ID is required"), value: z.string().min(1, { message: "Bullet point is required" }) })).min(1, { message: "Description is required" }),
      })
    ).optional(),

  // Skills details
  skills: z.array(
    z.object({
      id: z.string().uuid().min(1, { message: "ID is required" }),
      category: z.string().min(1, { message: "Category name is required" }),
      value: z.string().optional(),
    })
  ).optional(),
});

// So we can use the form values in other components
export type ResumeFormValues = z.infer<typeof formSchema>;

// TODO -> Make job scrolling a little less janky

function Information({ onSubmit }: { onSubmit: (data: ResumeFormValues) => void }) {

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
  }

  // Initialize form with react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: DefaultResumeValues,
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

  // Allow multiple projects
  const {fields: projectFields, append: projectAppend, remove: projectRemove} = useFieldArray({
    control: form.control,
    name: "projects",
  });

  // Allow multiple skill categories
  const {fields: skillFields, append: skillAppend, remove: skillRemove} = useFieldArray({
    control: form.control,
    name: "skills",
  });

  // Track expansion state of sections
  const [openSections, setOpenSections] = useState({
    personal: true,
    education: false,
    work: false,
    projects: false,
    skills: false,
  });

  // Toggle expansion
  function toggleSection(section: keyof typeof openSections) {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  }

  return (
    // Hide scrollbar until user scrolls
    <div className="flex items-start justify-start min-h-svh overflow-y-auto dark:bg-slate-950 bg-slate-100 p-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8 w-[350px]">
          {/* Personal Details Section */}
          <div>
            <button
              type="button"
              onClick={() => { toggleSection("personal"); }}
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
                      <FormLabel>GitHub (optional)</FormLabel>
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
              onClick={() => { toggleSection("education"); }}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2"
            >
              Education
              <span>{openSections.education ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-y-auto transition-all duration-300 ease-in-out ${
                openSections.education ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-6">
                {fields.map((item, idx) => (
                  <div key={item.id} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      {fields.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 text-xs h-8 px-2"
                        onClick={() => { remove(idx); }}
                        disabled={idx === 0}
                        title={idx === 0 ? "Cannot remove the first degree" : "Remove"}
                      >Remove</Button>
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
                <Button
                  size="sm"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() => { append({id: crypto.randomUUID(), degree: "", institution: "", gradDate: "" }); }}
                >
                  Add Degree
                </Button>
              </div>
            </div>
          </div>

          {/* Work Experience Section */}
          <div>
            <button
              type="button"
              onClick={() => { toggleSection("work"); }}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2"
            >
              Work Experience
              <span>{openSections.work ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-y-auto transition-all duration-300 ease-in-out ${
                openSections.work ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-6">
                {jobFields.map((job, jobIdx) => (
                  <div key={job.id} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Job {jobIdx + 1}</span>
                      {jobFields.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 text-xs h-8 px-2"
                        onClick={() => { jobRemove(jobIdx); }}
                        disabled={jobIdx === 0}
                        title={jobIdx === 0 ? "Cannot remove the first degree" : "Remove"}
                      >Remove</Button>
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
                <Button
                  size="sm"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() =>
                    { jobAppend({
                      id: crypto.randomUUID(),
                      company: "",
                      position: "",
                      location: "",
                      startDate: "",
                      endDate: "",
                      description: [{id: crypto.randomUUID(), value: "" }],
                    }); }
                  }
                >
                  Add Job
                </Button>
              </div>
            </div>
          </div>

          {/* Projects Section */}
          <div>
            <button
              type="button"
              onClick={() => { toggleSection("projects"); }}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2"
            >
              Projects
              <span>{openSections.projects ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-y-auto transition-all duration-300 ease-in-out ${
                openSections.projects ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >
              <div className="py-2 space-y-6 overflow-y-auto">
                {projectFields.map((project, projIdx) => (
                  <div key={project.id} className="border-b pb-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold">Project {projIdx + 1}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 text-xs h-8 px-2"
                        onClick={() => { projectRemove(projIdx); }}
                        // Projects are optional, so allow removing the last one
                      >Remove</Button>
                    </div>
                    <FormField
                      control={form.control}
                      name={`projects.${projIdx}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Project Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex gap-2">
                      <FormField
                        control={form.control}
                        name={`projects.${projIdx}.startDate`}
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
                        name={`projects.${projIdx}.endDate`}
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
                      <ProjectDescriptionFields
                        nestIndex={projIdx}
                        control={form.control}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  size="sm"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                  onClick={() =>
                    { projectAppend({
                      id: crypto.randomUUID(),
                      title: "",
                      startDate: "",
                      endDate: "",
                      description: [{ id: crypto.randomUUID(), value: "" }],
                    }); }
                  }
                >
                  Add Project
                </Button>
              </div>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <button
              type="button"
              onClick={() => { toggleSection("skills"); }}
              className="w-full flex items-center justify-between bg-white dark:bg-slate-900 rounded px-4 py-2 font-medium text-slate-900 dark:text-slate-100 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition mb-2">
              Skills (optional)
              <span>{openSections.skills ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-y-auto transition-all duration-300 ease-in-out ${
                openSections.skills ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
            >

            <div className="py-2 space-y-6">
              {skillFields.map((skill, skillIdx) => (
                <div key={skill.id} className="border-b pb-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <FormField
                      control={form.control}
                      name={`skills.${skillIdx}.category`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          <FormControl>
                            <Input
                             className="font-semibold hover:border-ring transition 200" // Hover border makes it more obvious default categories can be changed
                             style={{ fontSize: "1rem" }}
                             placeholder={skill.category || "Enter Category"} {...field}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    {/* Skills are optional, so allow removing the last one */}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 text-xs h-8 px-2"
                      onClick={() => { skillRemove(skillIdx); }}
                    >Remove</Button>
                  
                  </div>
                  <FormField
                    control={form.control}
                    name={`skills.${skillIdx}.value`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Skills (comma separated)</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. JavaScript, React, Node.js" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                className="bg-blue-500 text-white px-3 py-1 rounded text-xs"
                onClick={() =>
                  { skillAppend({
                    id: crypto.randomUUID(),
                    category: "",
                    value: "",
                  }); }
                }
              >
                Add Skill Category
              </Button>
            </div>
            
            </div>
          </div>

          <Button type="submit" className="w-full cursor-pointer">Submit</Button>
        </form>
      </Form>
    </div>
  );
}


interface JobDescriptionFieldsProps {
  nestIndex: number;
  control: Control<z.infer<typeof formSchema>>;
}

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
                  <Textarea placeholder="Bullet point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 text-xs h-8 px-2"
              onClick={() => { remove(descIdx); }}
            >Remove</Button>
          )}
        </div>
      ))}
      <Button
        size="xs"
        className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mt-1"
        onClick={() => { append({id: crypto.randomUUID(), value: "" }); }}
      >
        Add Bullet
      </Button>
    </>
  );
}

interface ProjectDescriptionFieldsProps {
  nestIndex: number;
  control: Control<z.infer<typeof formSchema>>;
}

function ProjectDescriptionFields({ nestIndex, control }: ProjectDescriptionFieldsProps) {

  const { fields, append, remove } = useFieldArray({
    control,
    name: `projects.${nestIndex}.description`,
  });

  return (
    <>
      {fields.map((desc, descIdx) => (
        <div key={desc.id} className="flex items-center gap-2 mt-1">
          <FormField
            control={control}
            name={`projects.${nestIndex}.description.${descIdx}.value`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea placeholder="Bullet point" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {fields.length > 1 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 text-xs h-8 px-2"
              onClick={() => { remove(descIdx); }}
            >Remove</Button>
          )}
        </div>
      ))}
      <Button
        size="xs"
        className="bg-blue-500 text-white px-2 py-0.5 rounded text-xs mt-1"
        onClick={() => { append({id: crypto.randomUUID(), value: "" }); }}
      >
        Add Bullet
      </Button>
    </>
  );
}


export default Information;