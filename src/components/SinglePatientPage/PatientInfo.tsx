import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  Button,
  CardActions,
  Box,
} from "@mui/material";
import { Diagnosis, PatientEntry } from "../../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import diagnoseService from "../../services/diagnoses";
import EntryDetails from "./details";
interface Props {
  patient: PatientEntry;
}

const PatientInfo = ({ patient }: Props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };

    fetchDiagnoses();
  }, []);

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
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default PatientInfo;
