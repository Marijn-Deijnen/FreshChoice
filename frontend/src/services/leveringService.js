import axios from "axios";

const getAllLeveringen = async () => {
  const response = await axios.get("/api/levering");
  return response.data.map((levering) => {
    levering.arrival = levering.aankomst;
    delete levering.aankomst;

    levering.status = levering.status_code;
    delete levering.status_code;

    return levering;
  });
};

const createNewLevering = async ({ leverancier, inhoud, arrival, status }) => {
  const response = await axios.post("/api/levering", {
    leverancier,
    inhoud,
    aankomst: arrival,
    status_code: status,
  });

  const newLevering = response.data;

  newLevering.arrival = newLevering.aankomst;
  delete newLevering.aankomst;

  newLevering.status = newLevering.status_code;
  delete newLevering.status_code;

  return newLevering;
};

const updateLevering = async (id, { leverancier, inhoud, arrival, status }) => {
  const response = await axios.put(`/api/levering/${id}`, {
    leverancier,
    inhoud,
    aankomst: arrival,
    status_code: status,
  });
  return response.data;
};

const deleteLevering = async (id) => {
  const response = await axios.delete(`/api/levering/${id}`);
  return response.data;
};

export default {
  getAllLeveringen,
  createNewLevering,
  updateLevering,
  deleteLevering,
};
