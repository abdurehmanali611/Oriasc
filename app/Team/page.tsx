import Hero from "@/components/Hero";
import TeamSection from "@/components/TeamSection";
import { leader, teamMembers } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};
export default function Team() {
    return <div>
        <Hero title="Our Teams" breadcrumbs={[
            {label: "Pages"},
            {label: "Teams"}
        ]}/>
        <TeamSection teamMembers={teamMembers} leader={leader}/>
    </div>
}