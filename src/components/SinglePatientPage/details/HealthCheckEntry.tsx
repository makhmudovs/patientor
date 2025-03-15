import React from "react";
import { Entry } from "../../../types";

const HealthCheckEntry: React.FC<{
  entry: Entry;
}> = ({ entry }) => {
  return (
    <div
      style={{
        margin:'1rem 0',
        border: "1px solid black",
        borderRadius: "1rem",
        padding: "0.5rem",
      }}
    >
      <h2>{entry.date}</h2>
      <p>
        Description: <strong>{entry.description}</strong>
      </p>
      <p>
        Specialist: <strong>{entry.specialist}</strong>
      </p>
      {"type" in entry && entry.type === "HealthCheck" && (
        <>
          <p>
            Health:{" "}
            <strong>
              {entry.healthCheckRating === 0 ? 'Bad': entry.healthCheckRating === 3 ? '':''}
            </strong>
          </p>
        </>
      )}
    </div>
  );
};

export default HealthCheckEntry;
