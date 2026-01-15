import { useState } from "react";
import Toolbar from "../../components/Toolbar";
import DeliveriesTable from "./components/DeliveriesTable";
import EditModal from "./components/EditModal";
import FilterModal from "./components/FilterModal";
import "../index.css";
import "./Levering.css";
import {
  formatArrival,
  valueToLocalDate,
  localDateToStartISO,
  localDateToEndISO,
} from "../../utils/dates";
import useLeveringen from "./hooks/useLeveringen";

const Levering = () => {
  const [isModalsOpen, setIsModalsOpen] = useState({
    editOpen: false,
    filterOpen: false,
  });
  const [selected, setSelected] = useState({
    leverancier: "",
    inhoud: "",
    arrivalISO: "",
    arrivalLabel: "",
    status: 0,
    id: undefined,
  });
  const [hideTodayButton, setHideTodayButton] = useState(false);

  const {
    displayedData,
    search,
    setSearch,
    setShowTodayOnly,
    filters: hookFilters,
    setFilters: setHookFilters,
    resetFilters: resetHookFilters,
    sort,
    toggleSort,
    create,
    update,
    remove,
  } = useLeveringen();

  const handleEdit = (row) => {
    setSelected({
      id: row.id,
      leverancier: row.leverancier,
      inhoud: row.inhoud,
      arrivalISO: row.arrival || "",
      arrivalLabel: formatArrival(row.arrival),
      status: Number(row.status) || 0,
    });
    setIsModalsOpen((s) => ({ ...s, editOpen: true }));
  };

  const handleNew = () => {
    setSelected({
      id: undefined,
      leverancier: "",
      inhoud: "",
      arrivalISO: "",
      arrivalLabel: "",
      status: 0,
    });
    setIsModalsOpen((s) => ({ ...s, editOpen: true }));
  };

  const resetFilters = () => {
    resetHookFilters();
    setSearch("");
    setShowTodayOnly(false);
    setHideTodayButton(false);
  };

  const handleDelete = async (id) => {
    remove(id);
  };

  return (
    <div className="container">
      <h2>Toeleveringsketen</h2>

      <Toolbar
        textValue={search}
        onTextChange={(e) => {
          setSearch(e.target.value);
          setHideTodayButton(false);
        }}
        onToday={() => {
          setShowTodayOnly(true);
          setHideTodayButton(true);
        }}
        hideTodayButton={hideTodayButton}
        onNew={handleNew}
        onFilter={() => setIsModalsOpen((s) => ({ ...s, filterOpen: true }))}
        onReset={resetFilters}
      />

      <DeliveriesTable
        rows={displayedData}
        sort={sort}
        toggleSort={toggleSort}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <EditModal
        open={isModalsOpen.editOpen}
        onClose={() => setIsModalsOpen((s) => ({ ...s, editOpen: false }))}
        initialValues={{
          id: selected.id,
          leverancier: selected.leverancier,
          inhoud: selected.inhoud,
          arrivalISO: selected.arrivalISO || "",
          status: Number(selected.status) || 0,
        }}
        onSave={(payload) => {
          const { id, ...rest } = payload;
          if (id) update(id, rest);
          else create(rest);
          setIsModalsOpen((s) => ({ ...s, editOpen: false }));
        }}
      />

      <FilterModal
        open={isModalsOpen.filterOpen}
        onClose={() => setIsModalsOpen((s) => ({ ...s, filterOpen: false }))}
        initialValues={{
          leverancier: hookFilters.leverancier || "",
          inhoud: hookFilters.inhoud || "",
          status: hookFilters.status ?? "",
          dateFrom: valueToLocalDate(hookFilters.dateFrom) || "",
          dateTo: valueToLocalDate(hookFilters.dateTo) || "",
        }}
        onApply={({ leverancier, inhoud, status, dateFrom, dateTo }) => {
          setHookFilters({
            leverancier,
            inhoud,
            status,
            dateFrom: dateFrom ? localDateToStartISO(dateFrom) : "",
            dateTo: dateTo ? localDateToEndISO(dateTo) : "",
          });
          setIsModalsOpen((s) => ({ ...s, filterOpen: false }));
          setHideTodayButton(false);
        }}
      />
    </div>
  );
};

export default Levering;
