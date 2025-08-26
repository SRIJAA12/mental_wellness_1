import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import MoodWidget from '../components/MoodWidget';
import TestimonialsSection from '../components/TestimonialsSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MoodWidget />
      <FeaturesSection />
      <TestimonialsSection />
      <Footer />
    </>
  );
}
