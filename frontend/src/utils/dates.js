export const toDate = (v) => {
  if (v == null || v === "") return null;
  if (v instanceof Date) return v;
  if (typeof v === "number") return new Date(v); // assume ms
  if (typeof v === "string") {
    const ms = Date.parse(v);
    return isNaN(ms) ? null : new Date(ms);
  }
  return null;
};

export const formatArrival = (val) => {
  const d = toDate(val);
  if (!d) return "";
  return d.toLocaleString();
};

export const valueToLocalDate = (val) => {
  const d = toDate(val);
  if (!d) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())}`;
};

export const localDateToStartISO = (dateStr) => {
  if (!dateStr) return "";
  return new Date(`${dateStr}T00:00:00Z`).toISOString();
};

export const localDateToEndISO = (dateStr) => {
  if (!dateStr) return "";
  return new Date(`${dateStr}T23:59:59.999Z`).toISOString();
};

export const isSameDay = (valueA, valueB = null) => {
  const a = toDate(valueA);
  if (!a) return false;
  const b = valueB == null ? new Date() : toDate(valueB);
  if (!b) return false;
  return (
    a.getUTCFullYear() === b.getUTCFullYear() &&
    a.getUTCMonth() === b.getUTCMonth() &&
    a.getUTCDate() === b.getUTCDate()
  );
};
