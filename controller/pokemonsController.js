import bdd from "../bdd.json" with { type: "json" };
import { success, error } from "../lib/sucess.js";

export const getPokemons = (req, res) => {
  const pokemons = JSON.stringify(bdd.pokemons);
  if (pokemons) {
    res.json(success(200, "Pokemons trouvés", pokemons));
  } else {
    res.json(error(404, "Aucun Pokemon trouvé"));
  }
};

export const getOnePokemon = (req, res) => {
  const id = Number(req.params.id);
  const pokemon = bdd.pokemons.find((pokemon) => pokemon.id === id);
  if (pokemon) {
    res.json(success(200, "Pokemon trouvé", pokemon));
  } else {
    res.json(error(404, "Aucun Pokemon trouvé"));
  }
};
