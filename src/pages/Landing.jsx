import Nav from '../components/Nav'
import Hero from '../components/Hero'
import MetricsStrip from '../components/MetricsStrip'
import HowItWorks from '../components/HowItWorks'
import FeatureGrid from '../components/FeatureGrid'
import ScoreShowcase from '../components/ScoreShowcase'
import TemplatePicker from '../components/TemplatePicker'
import Testimonial from '../components/Testimonial'
import CtaBanner from '../components/CtaBanner'
import Footer from '../components/Footer'

function Landing() {
  return (
    <div className="min-h-dvh bg-ink">
      <Nav />
      <main>
        <Hero />
        <MetricsStrip />
        <HowItWorks />
        <FeatureGrid />
        <ScoreShowcase />
        <TemplatePicker />
        <Testimonial />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}

export default Landing
