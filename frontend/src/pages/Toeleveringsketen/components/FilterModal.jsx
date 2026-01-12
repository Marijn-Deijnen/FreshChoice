import React, { useState, useEffect } from "react";
import Modal from "../../../components/Modal2";
import Textbox from "../../../components/TextBox";
import Dropdown from "../../../components/Dropdown";
import DateInput from "../../../components/DateInput";
import Button from "../../../components/Button";
import { STATUS_ARRAY } from "../../../constants/status";

const FilterModal = ({ open, onClose, initialValues = {}, onApply }) => {
  const [leverancier, setLeverancier] = useState(
    initialValues.leverancier || "",
  );
  const [inhoud, setInhoud] = useState(initialValues.inhoud || "");
  const [status, setStatus] = useState(initialValues.status ?? "");
  const [dateFrom, setDateFrom] = useState(initialValues.dateFrom || "");
  const [dateTo, setDateTo] = useState(initialValues.dateTo || "");

  useEffect(() => {
    setLeverancier(initialValues.leverancier || "");
    setInhoud(initialValues.inhoud || "");
    setStatus(initialValues.status ?? "");
    setDateFrom(initialValues.dateFrom || "");
    setDateTo(initialValues.dateTo || "");
  }, [initialValues, open]);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <h2>Filter</h2>

        <p>
          Leverancier:
          <Textbox
            value={leverancier}
            placeholder="Leverancier"
            onChange={(e) => setLeverancier(e.target.value)}
          />
        </p>

        <p>
          Inhoud:
          <Textbox
            value={inhoud}
            placeholder="Inhoud"
            onChange={(e) => setInhoud(e.target.value)}
          />
        </p>

        <p>
          Status:
          <Dropdown
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_ARRAY.map((label, i) => ({ value: i, label }))}
            placeholder="-- Alle --"
            compact
          />
        </p>

        <p>
          Datum van:
          <DateInput
            compact
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </p>

        <p>
          Datum tot:
          <DateInput
            compact
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </p>

        <div className="button-row">
          <Button label="Annuleren" onClick={onClose} variant="info" />
          <Button
            label="Toepassen"
            variant="success"
            onClick={() => {
              onApply &&
                onApply({ leverancier, inhoud, status, dateFrom, dateTo });
              onClose && onClose();
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default FilterModal;
