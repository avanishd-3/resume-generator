"use client"

// React imports
import {useState } from 'react'

// Local imports
import Information, { type ResumeFormValues } from './InformationEntry.tsx'
import Resume from './Resume.tsx'
import { DefaultResumeValues } from './lib/defaultResumeValues.ts'

// Read generated PDF
import { PDFViewer } from '@react-pdf/renderer';


function App() {

  // Initialize form data w/ default values
  const [formData, setFormData] = useState<ResumeFormValues>({...DefaultResumeValues});

  // Handler to recieve data from Information component
  const handleFormData = (data: ResumeFormValues) => {
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