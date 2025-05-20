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

  // Counter to force re-render of PDFViewer
  // So deleting items from resume not does crash the app 
  // See: https://github.com/diegomura/react-pdf/issues/3153
  const [counter, setCounter] = useState(0);

  // Handler to recieve data from Information component
  const handleFormData = (data: ResumeFormValues) => {
    setFormData(data);
    setCounter((prev) => prev + 1); // Increment counter to force re-render
  };

  return (
  <div className="flex items-start justify-start min-h-svh dark:bg-slate-950 bg-slate-100 p-8 gap-8">
    {/* Left: Form */}
    <div className="w-[40rem]">
      <Information onSubmit={handleFormData}/>
    </div>
    {/* Right: Resume Preview */}
    <PDFViewer key={counter} className="w-full h-screen">
      <Resume data={formData}/>
    </PDFViewer>
  </div>
  );
}

export default App;