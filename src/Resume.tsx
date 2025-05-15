// Making resume a PDF document
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

// Resume styles
const resumeStyle = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 24,
  },
  section: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },
  heading: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export interface ResumeData {
  name?: string;
  phone_number?: string;
  email?: string;
  address?: string;
  education?: string;
  work_experience?: string;
}

const Resume = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={resumeStyle.page}>
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.heading}>Personal Details</Text>
        <Text style={resumeStyle.label}>Name: <Text style={resumeStyle.value}>{data?.name || ""}</Text></Text>
        <Text style={resumeStyle.label}>Phone: <Text style={resumeStyle.value}>{data?.phone_number || ""}</Text></Text>
        <Text style={resumeStyle.label}>Email: <Text style={resumeStyle.value}>{data?.email || ""}</Text></Text>
        <Text style={resumeStyle.label}>Address: <Text style={resumeStyle.value}>{data?.address || ""}</Text></Text>
      </View>
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.heading}>Education</Text>
        <Text style={resumeStyle.value}>{data?.education || ""}</Text>
      </View>
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.heading}>Work Experience</Text>
        <Text style={resumeStyle.value}>{data?.work_experience || ""}</Text>
      </View>
    </Page>
  </Document>
);

export default Resume;