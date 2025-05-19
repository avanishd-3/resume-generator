// Get form types
import type { ResumeFormValues } from './InformationEntry.tsx';

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
    textDecoration: 'none', // Only links should be underlined
    color: '#000', // Black text color
    marginHorizontal: 1, // Space between items
  },
  contactLink: { // Link (LinkedIn, Github, etc.)
    textDecoration: 'underline', // Only links should be underlined
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

  /* Projects section */
  projectName: {
    fontSize: 12,
    fontWeight: '350',
  },

  /* Skills section */
  skillItem: {
    fontSize: 11,
    marginBottom: -2, // Keep skills close to each other
  },

  /* Default text styling */
  defaultText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

const Resume = ({ data }: { data: ResumeFormValues }) => (
  <Document>
    <Page size="A4" style={resumeStyle.page}>
      <View style={resumeStyle.heading}>
        <Text style={resumeStyle.name}>{data.name || ""}</Text>
        {/* Contact info */}
        <View style={resumeStyle.contactInfo}>
          <Text style={resumeStyle.contactItem}>{data.address || ""}</Text>
          <Text> | </Text>
          <Text style={resumeStyle.contactItem}>
            {/* Follow format (123)456-7809 */}
            {data.phone_number ? `(${data.phone_number.slice(0, 3)})${data.phone_number.slice(3)}`: ""}</Text>
          <Text> | </Text>
          <Text style={resumeStyle.contactItem}>{data.email || ""}</Text>
          <Text> | </Text>
          <Link style={resumeStyle.contactLink} src={data.linkedIn}>
            LinkedIn
           </Link>
          {/* Only display if GitHub link is present */}
          {data.gitHub && data.gitHub.length > 0 && (
            <>
              <Text> | </Text>
              <Link style={resumeStyle.contactLink} src={data.gitHub}>
                GitHub
              </Link>
            </> 
          )}
        </View>
      </View>

      {/* Education section */}
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.sectionHeading}>Education</Text>
        {/* Map through degrees and display them */}
        {data.degrees.map((deg) => (
          <View key={deg.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={resumeStyle.defaultText}>
              {deg.degree || ""} - {deg.institution}
            </Text>
            <Text style={{ ...resumeStyle.defaultText, textAlign: 'right' }}>
              {deg.gradDate || ""}
            </Text>
          </View>
        ))}
      </View>

      {/* Work experience section */}
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.sectionHeading}>Work Experience</Text>
        {/* Map through jobs and display them */}
        {data.jobs.map((job) => (
          <View key={job.id}>
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
            {job.description.map((desc) => (
              <View key={desc.id} style={resumeStyle.bulletPoint}>
                <Text style={resumeStyle.bulletPointChar}>•</Text>
                <Text style={resumeStyle.bulletPointText}>
                  {desc.value || ""}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Projects section */}
      {projectsSection(data)}

      {/* Skills section*/}
      {/* Only display if at least one skill category is present */}
      {data.skills && data.skills.length > 0 ? (
        <View style={resumeStyle.section}>
          <Text style={resumeStyle.sectionHeading}>Skills</Text>
          {/* Map through skills and display them */}
          {data.skills.map((skill) => (
            <Text key={skill.id} style={resumeStyle.skillItem}>
              <Text style={{ fontWeight: '600' }}>{skill.category}:</Text> {skill.value ?? ""}
            </Text>
          ))}
        </View>
      ) : null}
    </Page>
  </Document>
);

function projectsSection(data: ResumeFormValues) {
  // Do not dipslay if no projects
  if (data.projects && data.projects.length > 0) {
    return (
      <View style={resumeStyle.section}>
        <Text style={resumeStyle.sectionHeading}>Projects</Text>
        {/* Map through projects and display them */}
        {data.projects.map((project) => (
          <View key={project.id}>
            <View style={resumeStyle.jobLines}>
              <Text style={resumeStyle.projectName}>
                {project.title || ""}
              </Text>
              <Text style={resumeStyle.jobDates}>
                {project.startDate || ""} - {project.endDate || ""}
              </Text>
            </View>
            {/* Map through project descriptions and display them */}
            {project.description.map((desc) => (
              <View key={desc.id} style={resumeStyle.bulletPoint}>
                <Text style={resumeStyle.bulletPointChar}>•</Text>
                <Text style={resumeStyle.bulletPointText}>
                  {desc.value || ""}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );

  }
}

export default Resume;