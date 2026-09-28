import express from "express";
import farms from "../data/farms.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(farms);
});

router.get("/:id", (req, res) => {
  const farm = farms.find((farm) => farm.id === Number(req.params.id));
  if (!farm) {
    return res.status(404).json({ message: "Farm not found" });
  }
  res.json(farm);
});

export default router;
