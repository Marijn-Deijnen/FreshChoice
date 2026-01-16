import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
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
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLeverancier(initialValues.leverancier || "");
    setInhoud(initialValues.inhoud || "");
    setStatus(initialValues.status ?? "");
    setDateFrom(initialValues.dateFrom || "");
    setDateTo(initialValues.dateTo || "");
  }, [initialValues, open]);

  const optionStyle = { display: "flex", alignItems: "center", gap: 10 };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="container">
        <h2>Filter</h2>

        <div style={optionStyle}>
          <p>Leverancier:</p>
          <Textbox
            value={leverancier}
            placeholder="Leverancier"
            onChange={(e) => setLeverancier(e.target.value)}
          />
        </div>

        <div style={optionStyle}>
          <p>Inhoud:</p>
          <Textbox
            value={inhoud}
            placeholder="Inhoud"
            onChange={(e) => setInhoud(e.target.value)}
          />
        </div>

        <div style={optionStyle}>
          <p>Status:</p>
          <Dropdown
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={STATUS_ARRAY.map((label, i) => ({ value: i, label }))}
            placeholder="-- Alle --"
            compact
          />
        </div>

        <div style={optionStyle}>
          <p>Datum van:</p>
          <DateInput
            compact
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div style={optionStyle}>
          <p>Datum tot:</p>
          <DateInput
            compact
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </div>

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
