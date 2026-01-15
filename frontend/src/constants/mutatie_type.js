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
