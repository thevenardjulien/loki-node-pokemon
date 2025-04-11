import express from "express";
import {
  getPokemons,
  getOnePokemon,
} from "../controller/pokemonsController.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("V1 API loki-node-pokemon");
});

router.get("/pokemons", getPokemons);
router.get("/pokemons/:id", getOnePokemon);

export default router;
