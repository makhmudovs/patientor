import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddEntryForm from "./addEntryForm";
import { Diagnosis, Entry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, values: Entry) => void;
  error?: string;
  diagnoses: Diagnosis[];
  id: string;
}

const AddPatientModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
  diagnoses,
  id,
}: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
    <DialogTitle>Add a new patient</DialogTitle>
    <Divider />
    <DialogContent>
      {error && <Alert severity="error">{error}</Alert>}
      <AddEntryForm
        diagnoses={diagnoses}
        id={id}
        onSubmit={onSubmit}
        onCancel={onClose}
      />
    </DialogContent>
  </Dialog>
);

export default AddPatientModal;
