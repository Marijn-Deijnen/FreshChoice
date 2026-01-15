import Table from "../../../components/Table";
import { formatArrival } from "../../../utils/dates";
import { getStatusLabel } from "../../../constants/status";

const SortableTh = ({ col, sort, toggleSort, children }) => {
  const active = sort.by === col;
  const ariaSort = active
    ? sort.dir === "asc"
      ? "ascending"
      : "descending"
    : "none";
  const handleKey = (e) => {
    if (e.key === "Enter" || e.key === " ") toggleSort(col);
  };
  return (
    <th
      className="sortable"
      role="button"
      tabIndex={0}
      aria-sort={ariaSort}
      onClick={() => toggleSort(col)}
      onKeyDown={handleKey}
    >
      {children}{" "}
      <span className="sort-indicator">
        {active ? (sort.dir === "asc" ? "▲" : "▼") : ""}
      </span>
    </th>
  );
};

const DeliveriesTable = ({
  rows = [],
  sort = { by: "leverancier", dir: "asc" },
  toggleSort = () => {},
  onEdit = () => {},
  onDelete = () => {},
}) => {
  return (
    <Table className="deliveries-table">
      <thead>
        <tr>
          <SortableTh col="leverancier" sort={sort} toggleSort={toggleSort}>
            Leverancier
          </SortableTh>
          <SortableTh col="inhoud" sort={sort} toggleSort={toggleSort}>
            Inhoud
          </SortableTh>
          <SortableTh col="arrival" sort={sort} toggleSort={toggleSort}>
            Aankomst
          </SortableTh>
          <SortableTh col="status" sort={sort} toggleSort={toggleSort}>
            Status
          </SortableTh>
          <th style={{ textAlign: "center", width: 120 }}>Aanpassen</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id}>
            <td>{row.leverancier}</td>
            <td>{row.inhoud}</td>
            <td>{formatArrival(row.arrival)}</td>
            <td>{getStatusLabel(row.status)}</td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              <div
                style={{
                  display: "inline-flex",
                  gap: 8,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <button
                  type="button"
                  aria-label="Bewerk levering"
                  onClick={() => onEdit(row)}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="../../../assets/edit.svg"
                    alt="Bewerk"
                    style={{ width: 16, height: 16 }}
                  />
                </button>
                <button
                  type="button"
                  aria-label="Verwijder levering"
                  onClick={() => {
                    const confirm = window.confirm(
                      "Weet je zeker dat je deze levering wilt verwijderen? Dit kan niet ongedaan gemaakt worden.",
                    );
                    if (confirm) {
                      onDelete(row.id);
                    }
                  }}
                  style={{
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                >
                  <img
                    src="../../../assets/delete.svg"
                    alt="Verwijder"
                    style={{ width: 16, height: 16 }}
                  />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DeliveriesTable;
