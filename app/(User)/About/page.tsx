"use client"
import AboutContent from "@/components/About";
import TeamSection from "@/components/TeamSection";
import { leader } from "@/constants";
import { useLayoutEffect, useState } from "react";

export default function About() {
    const [dynamicTeam, setDynamicTeam] = useState(leader)
    useLayoutEffect(() => {
        setDynamicTeam(leader)
    }, [leader])
    return <div className="py-5">
        <AboutContent />
        <TeamSection leader={dynamicTeam}/>
    </div>
}