import Hero from "@/components/Hero";
import SermonsGrid from "@/components/SermonGrid";
import { sermons } from "@/constants";

const metadata = {
  title: 'About Us - ORIASC',
  description: 'Learn more about ORIASC and our mission',
};

export default function Sermons() {
    return <div>
        <Hero title="Sermons" breadcrumbs={[
            {label: "Pages"},
            {label: "Sermons"}
        ]}/>
        <SermonsGrid sermons={sermons}/>
    </div>
}