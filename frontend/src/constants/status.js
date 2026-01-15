export const STATUS = {
  GEPLAND: 0,
  ONDERWEG: 1,
  GELEVERD: 2,
};

export const STATUS_LABELS = {
  [STATUS.GEPLAND]: "Gepland",
  [STATUS.ONDERWEG]: "Onderweg",
  [STATUS.GELEVERD]: "Geleverd",
};

export const STATUS_ARRAY = Object.values(STATUS).map((s) => STATUS_LABELS[s]);

export const getStatusLabel = (status) =>
  STATUS_LABELS[status] ?? String(status);
