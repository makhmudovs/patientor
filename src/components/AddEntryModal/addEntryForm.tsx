import React, { useState, SyntheticEvent } from "react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Button,
  SelectChangeEvent,
  OutlinedInput,
  FormControl,
} from "@mui/material";

import { EntryTypes, Diagnosis, Entry } from "../../types";
import dayjs, { Dayjs } from "dayjs";
import { Box } from "@mui/system";

interface Props {
  onCancel: () => void;
  onSubmit: (id: string, values: Entry) => void;
  diagnoses: Diagnosis[];
  id: string;
}

interface TypeOptions {
  value: EntryTypes;
  label: string;
}

const typeOptions: TypeOptions[] = Object.values(EntryTypes).map((v) => ({
  value: v,
  label: v.toString(),
}));

const AddEntryForm = ({ onCancel, onSubmit, diagnoses, id }: Props) => {
  const [specialist, setSpecialist] = useState("");
  const [description, setDescription] = useState("");
  const [criteria, setCriteria] = useState("");
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [employername, setEmployername] = useState("");
  const [rating, setRating] = useState(0);

  const [type, setType] = useState(EntryTypes.HealthCheck);

  const [dateValue, setValue] = React.useState<Dayjs | null>(
    dayjs()
      .set("year", dayjs().year())
      .set("month", dayjs().month())
      .set("date", dayjs().date())
  );

  const [discharge, setDischarge] = React.useState<Dayjs | null>(null);
  const [startDate, setStartdate] = React.useState<Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<Dayjs | null>(null);

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const resetFields = () => {
    setSpecialist("");
    setDescription("");
    setCriteria("");
    setPersonName([]);
    setDischarge(null);
    setStartdate(null);
    setEndDate(null);
  };
  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const type = Object.values(EntryTypes).find(
        (g) => g.toString() === value
      );
      if (type) {
        setType(type);
      }
    }

    resetFields();
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    if (type === "Hospital") {
      onSubmit(id, {
        id: "cjabnc",
        specialist,
        description,
        date: String(dateValue),
        type: "Hospital",
        discharge: { date: String(discharge), criteria },
      });
    } else if (type === "OccupationalHealthcare") {
      onSubmit(id, {
        specialist,
        description,
        date: String(dateValue),
        type: "OccupationalHealthcare",
        employerName: employername,
        sickLeave: { startDate: String(startDate), endDate: String(endDate) },
      });
    } else if (type === "HealthCheck") {
      onSubmit(id, {
        specialist,
        description,
        date: String(dateValue),
        type: "HealthCheck",
        healthCheckRating: rating,
      });
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <InputLabel style={{ marginTop: 20 }}>Type</InputLabel>
        <Select
          style={{ margin: "0.5rem 0" }}
          label="type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <TextField
          style={{ margin: "0.5rem 0" }}
          label="Speacialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <Box style={{ margin: "0.5rem 0", width: "100%" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Date"
                value={dateValue}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </Box>
        <TextField
          style={{ margin: "0.5rem 0" }}
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        {type === "Hospital" && (
          <>
            <Box style={{ margin: "0.5rem 0" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Discharge date"
                    value={discharge}
                    onChange={(newValue) => setDischarge(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <TextField
              style={{ margin: "0.5rem 0" }}
              label="Criteria"
              fullWidth
              value={criteria}
              onChange={({ target }) => setCriteria(target.value)}
            />

            {diagnoses.length > 0 && (
              <FormControl sx={{ my: 1, width: "100%" }}>
                <InputLabel id="dianoses">Diagnose</InputLabel>
                <Select
                  fullWidth
                  labelId="dianoses"
                  id="dianoses"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Diagnoses" />}
                >
                  {diagnoses.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.code}
                      {"-"}
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
        {type === "OccupationalHealthcare" && (
          <>
            <TextField
              style={{ margin: "0.5rem 0" }}
              label="Employername"
              fullWidth
              value={employername}
              onChange={({ target }) => setEmployername(target.value)}
            />
            <InputLabel style={{ margin: "0.5rem 0" }}>Sickleave</InputLabel>
            <Box style={{ margin: "0.5rem 0" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="Startdate"
                    value={startDate}
                    onChange={(newValue) => setStartdate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box style={{ margin: "0.5rem 0" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    label="End date"
                    value={endDate}
                    onChange={(newValue) => setEndDate(newValue)}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            {diagnoses.length > 0 && (
              <FormControl sx={{ my: 1, width: "100%" }}>
                <InputLabel id="dianoses">Diagnose</InputLabel>
                <Select
                  fullWidth
                  labelId="dianoses"
                  id="dianoses"
                  multiple
                  value={personName}
                  onChange={handleChange}
                  input={<OutlinedInput label="Diagnoses" />}
                >
                  {diagnoses.map((option) => (
                    <MenuItem key={option.code} value={option.code}>
                      {option.code}
                      {"-"}
                      {option.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </>
        )}
        {type === "HealthCheck" && (
          <>
            <InputLabel style={{ marginTop: 20 }}>Rating</InputLabel>
            <Select
              style={{ margin: "0.5rem 0" }}
              label="Rating"
              fullWidth
              value={String(rating)}
              onChange={({ target }) => setRating(Number(target.value))}
            >
              <MenuItem value={0} selected>
                Bad
              </MenuItem>
              <MenuItem value={1}>Poor</MenuItem>
              <MenuItem value={2}>Good</MenuItem>
              <MenuItem value={3}>Great</MenuItem>
            </Select>
          </>
        )}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
