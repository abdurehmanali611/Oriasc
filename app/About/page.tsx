import AboutContent from "@/components/About";
import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import { leader, teamMembers } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};

export default function About() {
    return <div>
        <Hero title="About Us" 
        breadcrumbs={[
          { label: 'Pages' },
          { label: 'About us' }
        ]}/>
        <AboutContent />
        <TeamSection teamMembers={teamMembers} leader={leader}/>
    </div>
}