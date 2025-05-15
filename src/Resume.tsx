// Making resume a PDF document
import {Page, Text, View, Document, StyleSheet, Link} from '@react-pdf/renderer';

const VERTICAL_PADDING = 20; // So top and bottom padding never go out of sync

// Resume styles
const resumeStyle = StyleSheet.create({
  page: {
    paddingTop: VERTICAL_PADDING,
    paddingBottom: VERTICAL_PADDING,
    paddingHorizontal: 24,
    fontFamily: 'Times-Roman', // Font used in resumes
    fontSize: 10, // Font size used in resumes
    lineHeight: 1.5, // Default line height in Google Docs
    color: '#000', // Black text color
    gap: 10,
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
  },
  /* Header (name and links) */
  heading: {
    textAlign: 'center',
    marginBottom: 2,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  contactInfo: {
    flexDirection: 'row',
    flexWrap: 'nowrap', // All contact info in one line
    justifyContent: 'center', // Same as name
    alighnItems: 'center',
    fontSize: 10, // Much smaller than name (as it should be)
    color: '#000', // Black text color
  },
  contactItem: { // No link
    textDecoration: 'none', // Only links shoudl be underlined
    color: '#000', // Black text color
    marginHorizontal: 1, // Space between items
  },
  contactLink: { // Link (LinkedIn, Github, etc.)
    textDecoration: 'underline', // Only links shoudl be underlined
    color: '#0000FF', // Default link color
  },

  /* Regular sections */
  section: {
    marginBottom: 16,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
  },

  /* Default styling (for sections not styled yet) */
  
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
  name: string;
  phone_number: string;
  email: string;
  address: string;
  linkedIn: string;
  gitHub?: string; // Becase GitHub is optional
  education: string;
  work_experience: string;
}

const Resume = ({ data }: { data: ResumeData }) => (
  <Document>
    <Page size="A4" style={resumeStyle.page}>
      <View style={resumeStyle.heading}>
        <Text style={resumeStyle.name}>{data?.name || ""}</Text>
        {/* Contact info */}
        <View style={resumeStyle.contactInfo}>
          <Text style={resumeStyle.contactItem}>{data?.address || ""}</Text>
          <Text> | </Text>
          <Text style={resumeStyle.contactItem}>
            {/* Follow format (123)456-7809 */}
            {data?.phone_number ? `(${data.phone_number.slice(0, 3)})${data.phone_number.slice(3)}`: ""}</Text>
          <Text> | </Text>
          <Text style={resumeStyle.contactItem}>{data?.email || ""}</Text>
          <Text> | </Text>
          <Link style={resumeStyle.contactLink} src={data?.linkedIn}>
            LinkedIn
           </Link>
          <Text> | </Text>
          <Link style={resumeStyle.contactLink} src={data?.gitHub}>
            GitHub
           </Link>
        </View>
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