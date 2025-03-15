import React, { useEffect } from "react";
import { Diagnosis, Entry } from "../../../types";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import HealthCheckEntry from "./HealthCheckEntry";

const EntryDetails: React.FC<{ entry: Entry; diagnosis: Diagnosis[] }> = ({
  entry,
  diagnosis,
}) => {
  useEffect(() => {}, []);
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry diagnoses={diagnosis} entry={entry} />;
    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry diagnoses={diagnosis} entry={entry} />
      );
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;
    default:
      return "not handled";
  }
};

export default EntryDetails;
