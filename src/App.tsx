"use client"

// React imports
import {useState } from 'react'

// Local imports
import Information from './InformationEntry.tsx'
import Resume from './Resume.tsx'
// Import the ResumeData type from Resume.tsx
import type { ResumeData } from './Resume.tsx';


// Read generated PDF
import { PDFViewer } from '@react-pdf/renderer';


function App() {

  // Initialize form data w/ default values
  const [formData, setFormData] = useState<ResumeData>({
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
      },
    ],
  });

  // Handler to recieve data from Information component
  const handleFormData = (data: ResumeData) => {
    setFormData(data);
  };

  return (
  <div className="flex items-start justify-start min-h-svh dark:bg-slate-950 bg-slate-100 p-8 gap-8">
    {/* Left: Form */}
    <div className="w-[350px]">
      <Information onSubmit={handleFormData}/>
    </div>
    {/* Right: Resume Preview */}
    <PDFViewer className="w-full h-screen">
      <Resume data={formData}/>
    </PDFViewer>
  </div>
  );
}

export default App;