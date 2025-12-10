import ActivityItem from "./ActivityItem";
import SectionHeader from "./SectionHeader";

interface Activity {
  DateTime: string; // Only string icons
  Title: string;
  Description: string;
  Stat: string;
}

interface ActivitiesGridProps {
  activities: Activity[];
}

export default function ActivitiesGrid({ activities }: ActivitiesGridProps) {
  return (
    <>
      {/* Activities Grid Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <SectionHeader
            subtitle="Activities"
            title="Here Are Our Activities"
          />

          {activities && activities.length > 0 ? (
            <div className="flex flex-wrap mx-4 gap-y-4">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  DateTime={activity.DateTime}
                  Title={activity.Title}
                  Description={activity.Description}
                  Stat={activity.Stat}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No activities available at this time. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Activities Grid End */}
    </>
  );
}
