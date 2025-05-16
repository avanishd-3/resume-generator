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

  /* Education sections */
  section: {
    flexDirection: 'column',
    gap: 5,
  },

  sectionHeading: {
    fontSize: 14,
    borderBottom: '1px solid #000', // Line under heading
    textTransform: 'uppercase', // All caps
    marginBottom: -2, // So line is not too far from heading
    paddingBottom: 2,
  },

  /* Work experience section */
  jobLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 1,
  },
  jobLeftAlignParts: {
    flexDirection: 'row',
    flexwrap: 'wrap',
  },
  jobCompany: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  jobDates: {
    fontSize: 12,
    textAlign: 'right',
    flexShrink: 0, 
  },
  jobPosition: {
    fontSize: 11,
    marginTop: 1,
    fontFamily: 'Times-Italic', // Italic font
  },
  jobLocation: {
    fontSize: 12,
    textAlign: 'right',
    flexShrink: 0,
    fontStyle: 'italic',
  },
  bulletPoint: {
    flexDirection: 'row',
    marginLeft: 2,
    marginTop: 2,
    alignItems: 'flex-start', // Align bullet point with text
    gap: 10, // Space between bullet point and text
  },
  bulletPointChar: { // Dot for bullet point
    fontSize: 14, // Bigger than text
    marginTop: -2,
  },
  bulletPointText: {
    fontSize: 10.5,
    flex: 1, // Take up all available space
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
  gitHub: string;
  degrees: {
    degree: string;
    institution: string;
    gradDate: string;
  }[];
  jobs: {
    company: string,
    position: string,
    location: string,
    startDate: string,
    endDate: string,
    description: {value: string}[];
  }[];
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
        <Text style={resumeStyle.sectionHeading}>Education</Text>
        {/* Map through degrees and display them */}
        {/* Should be fine to use idx as key since new list generated on each form submission */}
        {data.degrees && data.degrees.map((deg, idx) => (
          <View key={idx} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={resumeStyle.value}>
              {deg.degree || ""} - {deg.institution}
            </Text>
            <Text style={{ ...resumeStyle.value, textAlign: 'right' }}>
              {deg.gradDate || ""}
            </Text>
          </View>
        ))}
      </View>
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.sectionHeading}>Work Experience</Text>
        {/* Map through degrees and display them */}
        {/* Should be fine to use idx as key since new list generated on each form submission */}
        {data.jobs && data.jobs.map((job, idx) => (
          <View key={idx}>
            <View style={resumeStyle.jobLines}>
              <Text style={resumeStyle.jobCompany}>
                {job.company || ""}
              </Text>
              <Text style={resumeStyle.jobDates}>
                {job.startDate || ""} - {job.endDate || ""}
              </Text>
            </View>
            <View style={resumeStyle.jobLines}>
              <Text style={resumeStyle.jobPosition}>
                {job.position || ""}
              </Text>
              <Text style={resumeStyle.jobLocation}>
                {job.location || ""}
              </Text>
            </View>
            {/* Map through job description and display them */}
            {/* Should be fine to use idx as key since new list generated on each form submission */}
            {job.description && job.description.map((desc, idx) => (
              <View key={idx} style={resumeStyle.bulletPoint}>
                <Text style={resumeStyle.bulletPointChar}>•</Text>
                <Text style={resumeStyle.bulletPointText}>
                  {desc.value || ""}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    </Page>
  </Document>
);

export default Resume;