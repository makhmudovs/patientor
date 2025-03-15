import React from "react";
import { Diagnosis, Entry } from "../../../types";

const HospitalEntry: React.FC<{ entry: Entry; diagnoses: Diagnosis[] }> = ({
  entry,
  diagnoses,
}) => {
  const renderDiagnoses = (code: string) => {
    const diagnose = diagnoses.find((d) => d.code === code);
    if (diagnose) {
      return (
        <li>
          <strong>
            {code} {diagnose.name}
          </strong>
        </li>
      );
    }
    return (
      <li>
        <strong>{code}</strong>
      </li>
    );
  };
  return (
    <div
      style={{
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
      <p>Diagnoses: </p>
      {entry.diagnosisCodes?.map((code) => (
        <ul key={code}>{renderDiagnoses(code)}</ul>
      ))}
      <p>Discharged: </p>
      {"type" in entry && entry.type === "Hospital" && (
        <>
          <p>
            Discharge date: <strong>{entry.discharge.date}</strong>
          </p>
          <p>
            Criteria: <strong>{entry.discharge.criteria}</strong>
          </p>
        </>
      )}
    </div>
  );
};

export default HospitalEntry;
