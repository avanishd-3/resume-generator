export const DefaultResumeValues = {
    name: "John Doe",
    phone_number: "123-456-7809",
    email: "john_doe@gmail.com",
    address: "Los Angeles, CA",
    linkedIn: "https://www.linkedin.com/",
    gitHub: "https://www.github.com/",
    degrees: [
      {
        id: crypto.randomUUID(),
        degree: "B.S. in Computer Science",
        institution: "University of California, Los Angeles",
        gradDate: "June 2023",
      },
    ],
    jobs: [
      {
        id: crypto.randomUUID(),
        company: "Google",
        position: "Software Engineer Intern",
        location: "Mountain View, CA",
        startDate: "June 2022",
        endDate: "August 2022",
        description: [
          { id: crypto.randomUUID(), value: "Worked on the Google Search team to improve search algorithms." },
          {id: crypto.randomUUID(), value: "Implemented a new feature that increased user engagement by 20%." },
        ],
      }
    ],
     projects: [
      {
        id: crypto.randomUUID(),
        title: "TherapyGPT",
        startDate: "January 2023",
        endDate: "March 2023",
        description: [
          { id: crypto.randomUUID(), value: "Developed an AI model finetuned for therapeutic conversations" },
          { id: crypto.randomUUID(), value: "Implemented voice-to-text and text-to-speech interface using React and Node js" },
          { id: crypto.randomUUID(), value: "Secured users' data using AWS" },
        ],
      },
    ],
    languages: "Javascript, Typescript, Python",
    frameworks: "React, Zod, Flask",
    software: "Figma, Git, Docker, Vite",
}