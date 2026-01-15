import express from "express";
import Levering from "../../../models/Levering.js";

const leveringRouter = express.Router();

leveringRouter.use(express.json());

leveringRouter.post("/", async (req, res) => {
  const { leverancier, inhoud, aankomst, status } = req.body;
  const newLevering = await Levering.create({
    leverancier,
    inhoud,
    aankomst,
    status,
  });
  return res.status(201).json(newLevering);
});

leveringRouter.get("/", async (req, res) => {
  const leveringen = await Levering.findAll();
  return res.status(200).json(leveringen);
});

leveringRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const levering = await Levering.findByPk(id);
  if (levering) {
    return res.status(200).json(levering);
  } else {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }
});

leveringRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const levering = await Levering.findByPk(id);
  if (!levering) {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }

  const { leverancier, inhoud, aankomst, status } = req.body;
  await levering.update({
    leverancier: leverancier ?? levering.leverancier,
    inhoud: inhoud ?? levering.inhoud,
    aankomst: aankomst ?? levering.aankomst,
    status: status ?? levering.status,
  });
  return res.status(200).json({ message: "Levering aangepast" });
});

leveringRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleted = await Levering.destroy({ where: { levering_id: id } });
  if (deleted) {
    return res.status(200).json({ message: "Levering verwijderd" });
  } else {
    return res.status(404).json({ error: "Levering niet gevonden" });
  }
});

export default leveringRouter;
