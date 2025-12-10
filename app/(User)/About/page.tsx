import AboutContent from "@/components/About";
import TeamSection from "@/components/TeamSection";
import { leader, teamMembers } from "@/constants";

export default function About() {
    return <div className="py-5">
        <AboutContent />
        <TeamSection leader={leader}/>
    </div>
}