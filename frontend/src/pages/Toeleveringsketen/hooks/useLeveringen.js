import { useState, useCallback } from "react";
import { toDate, isSameDay } from "../../../utils/dates";
import { useEffect } from "react";
import leveringService from "../../../services/leveringService";

export default function useLeveringen(initial = []) {
  const [data, setData] = useState(initial);
  const [refreshTrigger, setRefreshTrigger] = useState(false);
  const [search, setSearch] = useState("");
  const [showTodayOnly, setShowTodayOnly] = useState(false);
  const [filters, setFilters] = useState({
    leverancier: "",
    inhoud: "",
    status: "",
    dateFrom: "",
    dateTo: "",
  });
  const [sort, setSort] = useState({ by: "leverancier", dir: "asc" });

  useEffect(() => {
    (async () => {
      const leveringen = await leveringService.getAllLeveringen();
      setData(leveringen);
    })();
  }, [refreshTrigger]);

  const create = useCallback(
    async (entry) => {
      await leveringService.createNewLevering(entry);
      setRefreshTrigger(!refreshTrigger);
    },
    [refreshTrigger],
  );

  const update = useCallback(
    async (id, patch) => {
      await leveringService.updateLevering(id, patch);
      setRefreshTrigger(!refreshTrigger);
    },
    [refreshTrigger],
  );

  const remove = useCallback(
    async (id) => {
      await leveringService.deleteLevering(id);
      setRefreshTrigger(!refreshTrigger);
    },
    [refreshTrigger],
  );

  const resetFilters = useCallback(() => {
    setFilters({
      leverancier: "",
      inhoud: "",
      status: "",
      dateFrom: "",
      dateTo: "",
    });
    setSearch("");
    setShowTodayOnly(false);
  }, []);

  const toggleSort = useCallback((col) => {
    setSort((s) =>
      s.by === col
        ? { by: col, dir: s.dir === "asc" ? "desc" : "asc" }
        : { by: col, dir: "asc" },
    );
  }, []);

  const setFilterField = useCallback(
    (k, v) => setFilters((f) => ({ ...f, [k]: v })),
    [],
  );

  const displayedData = (() => {
    const filtered = data.filter((row) => {
      if (showTodayOnly && !isSameDay(row.arrival)) return false;
      if (
        search &&
        !`${row.leverancier} ${row.inhoud}`
          .toLowerCase()
          .includes(search.toLowerCase())
      )
        return false;
      if (
        filters.status !== "" &&
        Number(row.status) !== Number(filters.status)
      )
        return false;
      if (
        filters.leverancier &&
        !row.leverancier
          .toLowerCase()
          .includes(filters.leverancier.toLowerCase())
      )
        return false;
      if (
        filters.inhoud &&
        !row.inhoud.toLowerCase().includes(filters.inhoud.toLowerCase())
      )
        return false;
      if (filters.dateFrom && toDate(row.arrival) < toDate(filters.dateFrom))
        return false;
      if (filters.dateTo && toDate(row.arrival) > toDate(filters.dateTo))
        return false;
      return true;
    });

    if (!sort.by) return filtered;

    const sorted = [...filtered].sort((a, b) => {
      switch (sort.by) {
        case "leverancier":
          return (a.leverancier || "")
            .toLowerCase()
            .localeCompare((b.leverancier || "").toLowerCase());
        case "inhoud":
          return (a.inhoud || "")
            .toLowerCase()
            .localeCompare((b.inhoud || "").toLowerCase());
        case "arrival":
          return (
            (toDate(a.arrival)?.getTime() || 0) -
            (toDate(b.arrival)?.getTime() || 0)
          );
        case "status":
          return (a.status || 0) - (b.status || 0);
        default:
          return 0;
      }
    });

    return sort.dir === "asc" ? sorted : sorted.reverse();
  })();

  return {
    data,
    displayedData,
    search,
    setSearch,
    showTodayOnly,
    setShowTodayOnly,
    filters,
    setFilters,
    setFilterField,
    resetFilters,
    sort,
    toggleSort,
    create,
    update,
    remove,
  };
}
