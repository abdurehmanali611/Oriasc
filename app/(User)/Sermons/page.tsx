import SermonsGrid from "@/components/SermonGrid";
import { sermons } from "@/constants";

export default function Sermons() {
    return <div className="py-5">
        <SermonsGrid sermons={sermons}/>
    </div>
}