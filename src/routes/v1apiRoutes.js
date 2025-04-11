import express from "express";
import {
  getPokemons,
  getOnePokemon,
  createPokemon,
  editPokemon,
  deletePokemon,
} from "../controller/pokemonsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("V1 API loki-node-pokemon");
});

router.get("/pokemons", getPokemons);
router.get("/pokemons/:id", getOnePokemon);
router.post("/pokemons/create", createPokemon);
router.put("/pokemons/edit/:id", editPokemon);
router.delete("/pokemons/delete/:id", deletePokemon);

export default router;
