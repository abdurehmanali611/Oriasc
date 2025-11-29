// components/ActivitiesGrid.tsx
import ActivityItem from './ActivityItem';
import SectionHeader from './SectionHeader';

interface Activity {
  icon: string; // Only string icons
  title: string;
  description: string;
  delay: string;
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
          
          <div className="flex flex-wrap mx-4 gap-y-4">
            {activities.map((activity, index) => (
              <ActivityItem 
                key={index}
                icon={activity.icon}
                title={activity.title}
                description={activity.description}
                delay={activity.delay}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Activities Grid End */}
    </>
  );
}
