import React from "react";
import { Diagnosis, Entry } from "../../../types";

const OccupationalHealthcareEntry: React.FC<{
  entry: Entry;
  diagnoses: Diagnosis[];
}> = ({ entry, diagnoses }) => {
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

      {"type" in entry && entry.type === "OccupationalHealthcare" && (
        <>
          <p>
            Employer name: <strong>{entry.employerName}</strong>
          </p>
        </>
      )}

      <p>{entry.diagnosisCodes ? "Diagnoses:" : null} </p>
      {entry.diagnosisCodes?.map((code) => (
        <>
          <ul key={code}>{renderDiagnoses(code)}</ul>
        </>
      ))}

      {"type" in entry && entry.type === "OccupationalHealthcare" ? (
        <>
          {entry.sickLeave ? <p>Sickleave:</p> : ""}
          <p>
            {entry.sickLeave?.startDate
              ? `Strart date: ${entry.sickLeave?.startDate}`
              : ""}
          </p>
          <p>
            {entry.sickLeave?.endDate
              ? `End date:${entry.sickLeave?.endDate}`
              : ""}
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default OccupationalHealthcareEntry;
