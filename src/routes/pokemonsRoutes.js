import express from "express";
import {
  getPokemons,
  getOnePokemon,
  createPokemon,
  editPokemon,
  deletePokemon,
} from "../controllers/pokemonsController.js";

const router = express.Router();

router.get("/", getPokemons);
router.get("/:id", getOnePokemon);
router.post("/create", createPokemon);
router.put("/edit/:id", editPokemon);
router.delete("/delete/:id", deletePokemon);

export default router;
