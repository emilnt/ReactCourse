import { json, redirect, useRouteLoaderData } from "react-router-dom";

import EventItem from "./../components/EventItem";

const EventDetailPage = () => {
  const eventDetailData = useRouteLoaderData("event-detail");
  return <EventItem event={eventDetailData.event} />;
};

export default EventDetailPage;

export const eventDetailLoader = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw (
      (json({ message: "Could not fetch details for selected event" }),
      { status: 500 })
    );
  }

  return response;
};

export const deleteEventAction = async ({ params }) => {
  const eventId = params.eventId;
  const response = fetch("http://localhost:8080/events/" + eventId);

  if (!response.ok) {
    throw (json({ message: "Could not delete event" }), { status: 500 });
  }

  return redirect("/events");
};
