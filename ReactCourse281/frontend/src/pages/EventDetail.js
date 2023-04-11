import {
  json,
  redirect,
  useRouteLoaderData,
  defer,
  Await,
} from "react-router-dom";

import EventItem from "./../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");
  return (
    <>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.event}>
          {(event) => <EventItem event={event} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={data.events}>
          {(events) => <EventsList events={events} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

const loadEvent = async (eventId) => {
  const id = eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: "GET",
  });

  if (!response.ok) {
    throw (
      (json({ message: "Could not fetch details for selected event" }),
      { status: 500 })
    );
  }

  const responseData = await response.json();
  return responseData.event;
};

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

export const eventDetailLoader = async ({ request, params }) => {
  return defer({ event: await loadEvent(params.eventId), events: loadEvents() });
};

export const deleteEventAction = async ({ params }) => {
  const eventId = params.eventId;
  const response = fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw (json({ message: "Could not delete event" }), { status: 500 });
  }

  return redirect("/events");
};
