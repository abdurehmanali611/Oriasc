"use client"
import TeamSection from "@/components/TeamSection";
import { leader } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function Team() {
    const [dynamicTeam, setDynamicTeam] = useState(leader)
    useLayoutEffect(() => {
        setDynamicTeam(leader)
    }, [leader])
    return <div>
        <TeamSection leader={dynamicTeam}/>
    </div>
}