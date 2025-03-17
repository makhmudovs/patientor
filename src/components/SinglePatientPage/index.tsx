import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";
import { Diagnosis, Entry, PatientEntry } from "../../types";
import PatientInfo from "./PatientInfo";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal/index";

const SinglePatientPage = () => {
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const { id: patientId } = useParams();

  const fetchPatient = async () => {
    if (!patientId) {
      setError("Patient ID is missing");
      setLoading(false);
      return;
    }

    try {
      const fetchedPatient = await patientService.getPatient(patientId);

      if (!fetchedPatient.dateOfBirth) {
        throw new Error("Patient data is missing a date of birth");
      }

      setPatient(fetchedPatient);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchDiagnoses = async () => {
    const diagnoses = await diagnoseService.getAll();
    setDiagnoses(diagnoses);
  };

  useEffect(() => {
    fetchPatient();
    fetchDiagnoses();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const submitNewEntry = async (id: string, values: Entry) => {
    console.log(id, values);
    try {
      const newEntry = await patientService.addEntry(id, values);
      if (newEntry) {
        fetchPatient();
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("error occured", error.message);
      }
    }
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <Button
        style={{ display: "block", marginLeft: "auto" }}
        variant="contained"
        onClick={() => openModal()}
      >
        Add New Entry
      </Button>
      {patientId && (
        <AddEntryModal
          id={patientId}
          diagnoses={diagnoses}
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
      )}
      {patient && <PatientInfo diagnoses={diagnoses} patient={patient} />}
    </div>
  );
};

export default SinglePatientPage;
