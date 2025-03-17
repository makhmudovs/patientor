import React from "react";
import {
  Typography,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { Diagnosis, PatientEntry } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import EntryDetails from "./details";
interface Props {
  patient: PatientEntry;
  diagnoses:Diagnosis[]
}

const PatientInfo = ({ patient,diagnoses }: Props) => {

  return (
    <React.Fragment>
      <Box>
        <Typography variant="h3">Patient Info</Typography>
      </Box>
      <Card variant="outlined">
        <CardContent>
          <Typography align="left" variant="h3">
            {patient.name || ""}{" "}
            {patient.gender === "other" ? (
              "Other"
            ) : patient.gender === "male" ? (
              <MaleIcon fontSize="large" />
            ) : (
              <FemaleIcon fontSize="large" />
            )}
          </Typography>
          <Typography>ssn: {patient.ssn || ""}</Typography>
          <Typography>ssn: {patient.occupation || ""}</Typography>
          <Typography variant="h6" my={2}>
            entries:
          </Typography>
          {patient?.entries && patient.entries.length > 0
            ? patient.entries.map((entry) => (
                <EntryDetails
                  diagnosis={diagnoses}
                  key={entry.id}
                  entry={entry}
                />
              ))
            : "No entries"}
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default PatientInfo;
