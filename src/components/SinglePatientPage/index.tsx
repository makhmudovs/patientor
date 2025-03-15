import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import patientService from "../../services/patients";
import { PatientEntry } from "../../types";
import PatientInfo from "./PatientInfo";


const SinglePatientPage = () => {
  const [patient, setPatient] = useState<PatientEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { id: patientId } = useParams();

  useEffect(() => {
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
  
    fetchPatient();
  }, [patientId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ marginTop: "1rem" }}>
      {patient && <PatientInfo patient={patient} />}
    </div>
  );
};

export default SinglePatientPage;
