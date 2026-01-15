import { useState } from "react";
import Toolbar from "../../components/Toolbar";
import Logo from "../../components/Logo";
import Separator from "../../components/Separator";
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

  const mockData = [
    {
      id: 1,
      leverancier: "Bakkerij Het Stoepje",
      inhoud: "Vers brood & Gebak",
      arrival: "2026-01-12T17:38:04Z",
      status: 0,
    },
    {
      id: 2,
      leverancier: "Coca Cola Beverages",
      inhoud: "Frisdranken",
      arrival: "2026-01-10T09:00:00Z",
      status: 1,
    },
    {
      id: 3,
      leverancier: "Melkunie Distributie",
      inhoud: "Zuivel & Eieren",
      arrival: "2026-01-11T12:30:00Z",
      status: 1,
    },
    {
      id: 4,
      leverancier: "Vion Food Group",
      inhoud: "Rund- en varkensvlees",
      arrival: "2026-01-12T08:15:00Z",
      status: 0,
    },
    {
      id: 5,
      leverancier: "Greenyard Fresh",
      inhoud: "Groenten en fruit",
      arrival: "2026-01-11T07:45:00Z",
      status: 1,
    },
    {
      id: 6,
      leverancier: "Heineken Supply",
      inhoud: "Bier en fusten",
      arrival: "2026-01-09T16:20:00Z",
      status: 0,
    },
    {
      id: 7,
      leverancier: "Van Geloven Snacks",
      inhoud: "Diepvries snacks",
      arrival: "2026-01-10T11:10:00Z",
      status: 1,
    },
    {
      id: 8,
      leverancier: "Unilever Food Solutions",
      inhoud: "Sauzen & soepen",
      arrival: "2026-01-09T13:00:00Z",
      status: 1,
    },
    {
      id: 9,
      leverancier: "Aviko Logistics",
      inhoud: "Aardappelproducten",
      arrival: "2026-01-08T06:30:00Z",
      status: 0,
    },
    {
      id: 10,
      leverancier: "Verstegen Spices",
      inhoud: "Kruiden & specerijen",
      arrival: "2026-01-07T14:00:00Z",
      status: 1,
    },
    {
      id: 11,
      leverancier: "Campina Transport",
      inhoud: "Melk & yoghurt",
      arrival: "2026-01-06T10:00:00Z",
      status: 2,
    },
    {
      id: 12,
      leverancier: "Bolletje Groothandel",
      inhoud: "Beschuit & crackers",
      arrival: "2026-01-05T09:15:00Z",
      status: 2,
    },
    {
      id: 13,
      leverancier: "Makro Distributiecentrum",
      inhoud: "Horeca grootverpakkingen",
      arrival: "2026-01-04T18:45:00Z",
      status: 0,
    },
  ];

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
  } = useLeveringen(mockData);

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
