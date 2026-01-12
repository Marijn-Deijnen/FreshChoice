import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal2";
import Textbox from "../../../components/TextBox";
import Button from "../../../components/Button";
import { STATUS_ARRAY } from "../../../constants/status";
import {
  valueToLocalDate,
  localDateToStartISO,
  formatArrival,
} from "../../../utils/dates";

const EditModal = ({ open, onClose, initialValues = {}, onSave }) => {
  const [form, setForm] = useState({
    id: undefined,
    leverancier: "",
    inhoud: "",
    arrivalISO: "",
    status: 0,
  });

  useEffect(() => {
    setForm({
      id: initialValues.id,
      leverancier: initialValues.leverancier || "",
      inhoud: initialValues.inhoud || "",
      arrivalISO: initialValues.arrivalISO || initialValues.arrival || "",
      status: initialValues.status ?? 0,
    });
  }, [initialValues, open]);

  const handleChange = (patch) => setForm((f) => ({ ...f, ...patch }));

  const handleSave = () => {
    const payload = {
      id: form.id,
      leverancier: form.leverancier.trim(),
      inhoud: form.inhoud.trim(),
      arrival: form.arrivalISO || new Date().toISOString(),
      status: Number(form.status) || 0,
    };
    onSave && onSave(payload);
    onClose && onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <h2>{form.id ? "Levering aanpassen" : "Levering toevoegen"}</h2>

        <p>
          Leverancier:
          <Textbox
            value={form.leverancier}
            placeholder="Voer leverancier in"
            onChange={(e) => handleChange({ leverancier: e.target.value })}
          />
        </p>

        <p>
          Inhoud:
          <Textbox
            value={form.inhoud}
            placeholder="Voer inhoud/beschrijving in"
            onChange={(e) => handleChange({ inhoud: e.target.value })}
          />
        </p>

        <p>
          Aankomst:
          <input
            type="date"
            value={valueToLocalDate(form.arrivalISO)}
            onChange={(e) => {
              const iso = e.target.value
                ? localDateToStartISO(e.target.value)
                : "";
              handleChange({ arrivalISO: iso });
            }}
          />
        </p>

        <p>
          Status:
          <select
            value={form.status}
            onChange={(e) => handleChange({ status: e.target.value })}
          >
            <option value="">-- Kies status --</option>
            {STATUS_ARRAY.map((label, i) => (
              <option key={i} value={i}>
                {label}
              </option>
            ))}
          </select>
        </p>

        <div className="button-row">
          <Button label="Annuleren" onClick={onClose} variant="info" />
          <Button label="Opslaan" onClick={handleSave} variant="success" />
        </div>
      </div>
    </Modal>
  );
};

export default EditModal;
