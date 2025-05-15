// Making resume a PDF document
import {Page, Text, View, Document, StyleSheet} from '@react-pdf/renderer';

// Resume styles
const resumeStyle = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const Resume = () => (
  <Document>
    <Page size="A4" style={resumeStyle.page}>
      <View style={resumeStyle.section}>
        <Text>Section #1</Text>
      </View>
      <View style={resumeStyle.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);

export default Resume;