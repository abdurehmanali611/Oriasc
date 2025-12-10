import TeamSection from "@/components/TeamSection";
import { leader, teamMembers } from "@/constants";

export default function Team() {
    return <div>
        <TeamSection leader={leader}/>
    </div>
}