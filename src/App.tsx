import Layout from './components/Layout/Layout';
import Navigation from './components/Navigation/Navigation';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import ExperienceSection from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Achievements from './components/Achievements/Achievements';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import { useActiveSection } from './hooks/useActiveSection';
import { experiences, skills, contactInfo } from './data/portfolio';
import { projects } from './data/projects';

function App() {
  const { activeSection, setActiveSection } = useActiveSection();

  return (
    <Layout>
      <Navigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      <main id="main-content">
        <Hero />
        <About skills={skills} />
        <ExperienceSection experiences={experiences} />
        <Projects projects={projects} />
        <Achievements />
        <Contact contactInfo={contactInfo} />
      </main>
      <Footer />
    </Layout>
  );
}

export default App;
