import TeamSection from "@/components/TeamSection";
import { leader } from "@/constants";

export default function Team() {
    return <div>
        <TeamSection leader={leader}/>
    </div>
}