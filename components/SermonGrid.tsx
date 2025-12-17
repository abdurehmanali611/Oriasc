// components/SermonsGrid.tsx
import SectionHeader from "./SectionHeader";
import SermonItem from "./SermonItem";

interface Sermon {
  ImageVideoUrl?: string;
  Title: string;
  Speaker?: string;
  Description: string;
  Slug?: string;
}

interface SermonsGridProps {
  sermons: Sermon[];
}

export default function SermonsGrid({ sermons }: SermonsGridProps) {
  return (
    <>
      {/* Sermons Grid Start */}
      <div className="w-full py-5">
        <div className="container mx-auto px-4 py-5 flex flex-col gap-5">
          <SectionHeader
            subtitle="Sermons"
          />

          {sermons && sermons.length > 0 ? (
            <div className="flex flex-wrap justify-between items-center -mx-2">
              {sermons.map((sermon, index) => (
                <SermonItem
                  key={index}
                  image={sermon.ImageVideoUrl}
                  title={sermon.Title}
                  speaker={sermon.Speaker ?? "Admin"}
                  description={sermon.Description}
                  slug={sermon.Slug}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No sermons available at this time. Please check back later!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Sermons Grid End */}
    </>
  );
}
