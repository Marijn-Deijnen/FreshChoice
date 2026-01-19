import express from "express";
import Levering from "../../../models/Levering.js";

const leveringRouter = express.Router();

leveringRouter.use(express.json());

leveringRouter.post("/", async (req, res) => {
  console.log("POST /api/levering");
  const { leverancier, inhoud, aankomst, status_code } = req.body;
  const newLevering = await Levering.create({
    leverancier,
    inhoud,
    aankomst,
    status_code,
  });
  return res.status(201).json(newLevering);
});

leveringRouter.get("/", async (req, res) => {
  console.log("GET /api/levering");
  const leveringen = await Levering.findAll();
  return res.status(200).json(leveringen);
});

leveringRouter.get("/:id", async (req, res) => {
  console.log("GET /api/levering:id");
  const { id } = req.params;
  const levering = await Levering.findByPk(id);
  if (levering) {
    return res.status(200).json(levering);
  } else {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }
});

leveringRouter.put("/:id", async (req, res) => {
  console.log("PUT /api/levering:id");
  const { id } = req.params;
  const levering = await Levering.findByPk(id);
  if (!levering) {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }

  const { leverancier, inhoud, aankomst, status_code } = req.body;
  await levering.update({
    leverancier: leverancier ?? levering.leverancier,
    inhoud: inhoud ?? levering.inhoud,
    aankomst: aankomst ?? levering.aankomst,
    status_code: status_code ?? levering.status_code,
  });
  return res.status(200).json({ message: "Levering aangepast" });
});

leveringRouter.delete("/:id", async (req, res) => {
  console.log("DELETE /api/levering:id");
  const { id } = req.params;
  const deleted = await Levering.destroy({ where: { levering_id: id } });
  if (deleted) {
    return res.status(200).json({ message: "Levering verwijderd" });
  } else {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }
});

export default leveringRouter;
