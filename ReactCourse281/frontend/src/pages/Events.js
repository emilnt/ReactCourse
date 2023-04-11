import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  // const data = useLoaderData(); Hvis ikke defer, og benytter da heller ikke Await-komponenten.
  const data = useLoaderData();

  /*if (data.isError) {
    return <p>{data.message}</p>;
  }*/

  return (
    <Suspense fallback={<p style={{textAlign: 'center'}}>Loading...</p>}>
      <Await resolve={data.events}>
        {(events) => {
          <EventsList events={events} />;
        }}
      </Await>
    </Suspense>
  );
}

const loadEvents = async () => {
  const response = await fetch("http://localhost:8080/events");
  if (!response.ok) {
    //return { isError: true, message: "Could not fetch events" };
    //throw new Response(JSON.stringify({message: 'Could not fetch events'}), {status: 500});
    throw json({ message: "Could not fetch events" }, { status: 500 });
  } else {
    const responseData = await response.json();
    return responseData.events;
  }
};

export default EventsPage;

export const eventsLoader = () => {
  defer({ events: loadEvents() });
};
