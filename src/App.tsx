import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Projects from './components/Projects/Projects';
import ExperienceSection from './components/Experience/Experience';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { projects, experiences, skills, contactInfo } from './data/portfolio';

function App() {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <Layout>
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <Hero />
      <About skills={skills} />
      <Projects projects={projects} />
      <ExperienceSection experiences={experiences} />
      <Contact contactInfo={contactInfo} />
      <Footer />
    </Layout>
  );
}

export default App;
