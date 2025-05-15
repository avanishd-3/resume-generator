"use client"
import Information from './Information.tsx'
import Resume from './Resume.tsx'
// import React from 'react';

// Read generated PDF
import { PDFViewer } from '@react-pdf/renderer';


function App() {

  return (
  <div className="flex items-start justify-start min-h-svh dark:bg-slate-950 bg-slate-100 p-8 gap-8">
    {/* Left: Form */}
    <div className="w-[350px]">
      <Information />
    </div>
    {/* Right: Resume Preview */}
    <PDFViewer className="w-full h-[800px]">
      <Resume />
    </PDFViewer>
  </div>
)
}

export default App;