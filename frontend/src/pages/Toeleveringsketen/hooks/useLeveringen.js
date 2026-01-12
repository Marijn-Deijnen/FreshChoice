import { useState, useCallback } from "react";
import { toDate, isSameDay } from "../../../utils/dates";

export default function useLeveringen(initial = []) {
  const [data, setData] = useState(initial);
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

  const create = useCallback((entry) => {
    const e = {
      ...entry,
      arrival: entry.arrival || new Date().toISOString(),
      status: Number(entry.status) || 0,
    };
    setData((d) => [e, ...d]);
    return e;
  }, []);

  const update = useCallback((id, patch) => {
    setData((d) =>
      d.map((r) =>
        r.id === id
          ? {
              ...r,
              ...patch,
              status:
                patch.status !== undefined
                  ? Number(patch.status) || 0
                  : r.status,
              arrival: patch.arrival !== undefined ? patch.arrival : r.arrival,
            }
          : r,
      ),
    );
  }, []);

  const remove = useCallback((id) => {
    setData((d) => d.filter((r) => r.id !== id));
  }, []);

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
