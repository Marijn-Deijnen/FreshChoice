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

export const MUTATIE_TYPE = {
  LEVERING: 0,
  VERKOOP: 1,
  VERLIES: 2,
  ANDERS: 3,
};

export const MUTATIE_TYPE_LABELS = {
  [MUTATIE_TYPE.LEVERING]: "Levering",
  [MUTATIE_TYPE.VERKOOP]: "Verkoop",
  [MUTATIE_TYPE.VERLIES]: "Verlies",
  [MUTATIE_TYPE.ANDERS]: "Anders",
};

export const MUTATIE_TYPE_ARRAY = Object.values(MUTATIE_TYPE_LABELS);

export const getMutatieTypeLabel = (mutatie_type) =>
  MUTATIE_TYPE_LABELS[mutatie_type];
