import EventItem from "./EventItem";

// components/EventsList.tsx
interface Event {
  StartDate: string;
  EndDate: string;
  Title: string;
  Description: string;
  ImageUrl: string;
  Slug?: string;
}

interface EventsListProps {
  events: Event[];
}

export default function EventsList({ events }: EventsListProps) {
  return (
    <>
      {/* Events List Start */}
      <div className="w-full px-4 py-5">
        <div className="container mx-auto py-5">
          <h1
            className="text-6xl font-bold font-sans mb-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            Upcoming <span className="text-[#10b982]">Events</span>
          </h1>

          {events && events.length > 0 ? (
            events.map((event, index) => (
              <EventItem
                key={index}
                startDate={event.StartDate}
                endDate={event.EndDate}
                title={event.Title}
                description={event.Description}
                image={event.ImageUrl}
                slug={event.Slug}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No upcoming events at the moment. Check back soon!
              </p>
            </div>
          )}
        </div>
      </div>
      {/* Events List End */}
    </>
  );
}
