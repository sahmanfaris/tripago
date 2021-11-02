import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import "./TripList.css";

export default function TripList() {
  const [url, setUrl] = useState("http://localhost:3000/trips");
  const { data: trips, isLoading } = useFetch(url);

  //   const fetchData = useCallback(async () => {
  //     const res = await fetch(url);
  //     const trips = await res.json();
  //     setTrips(trips);
  //   }, [url]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {isLoading && <div>Loading trips...</div>}
      <ul>
        {trips &&
          trips.map((trip) => (
            <li key={trip.id}>
              <h3>{trip.title}</h3>
              <p>{trip.price}</p>
            </li>
          ))}
      </ul>
      <div className="filters">
        <button
          onClick={() => setUrl(`http://localhost:3000/trips?location=europe`)}
        >
          European Trips
        </button>
        <button onClick={() => setUrl("http://localhost:3000/trips")}>
          All Trips
        </button>
      </div>
    </div>
  );
}