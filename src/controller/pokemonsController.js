import bdd from "../db/bdd.json" with { type: "json" };
import { success, error } from "../lib/sucess.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../../index.js";

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

export const createPokemon = (req, res) => {
  console.log({
    "ReqBody: ": req.body,
  });

  const {
    name = "",
    hp = 0,
    cp = 0,
    picture = "",
    types = [],
    created = new Date(),
  } = req.body;

  const pokemon = {
    id: bdd.pokemons.length + 1,
    name,
    hp,
    cp,
    picture,
    types,
    created,
  };

  if (
    pokemon &&
    pokemon.name &&
    pokemon.hp &&
    pokemon.cp &&
    pokemon.picture &&
    pokemon.types &&
    pokemon.created
  ) {
    bdd.pokemons.push(pokemon);

    // Update bdd.json
    fs.writeFileSync(
      path.resolve(__dirname, "bdd.json"),
      JSON.stringify(bdd, null, 2),
    );

    res.json(success(200, "Pokemon créé", pokemon));
  } else {
    res.json(error(404, "Aucun Pokemon créé"));
  }
};

export const editPokemon = (req, res) => {
  const id = Number(req.params.id);
  const pokemon = bdd.pokemons.find((pokemon) => pokemon.id === id);
  if (pokemon) {
    const {
      name = "",
      hp = 0,
      cp = 0,
      picture = "",
      types = [],
      created = new Date(),
    } = req.body;

    const updatedPokemon = {
      id,
      name,
      hp,
      cp,
      picture,
      types,
      created,
    };
    if (
      updatedPokemon &&
      updatedPokemon.name &&
      updatedPokemon.hp &&
      updatedPokemon.cp &&
      updatedPokemon.picture &&
      updatedPokemon.types &&
      updatedPokemon.created
    ) {
      bdd.pokemons = bdd.pokemons.map((pokemon) => {
        if (pokemon.id === id) {
          return updatedPokemon;
        } else {
          return pokemon;
        }
      });

      // Update bdd.json
      fs.writeFileSync(
        path.resolve(__dirname, "bdd.json"),
        JSON.stringify(bdd, null, 2),
      );

      res.json(success(200, "Pokemon édité", updatedPokemon));
    } else {
      res.json(error(404, "Aucun Pokemon édité"));
    }
  } else {
    res.json(error(404, "Aucun Pokemon trouvé"));
  }
};

export const deletePokemon = (req, res) => {
  const id = Number(req.params.id);
  const pokemon = bdd.pokemons.find((pokemon) => pokemon.id === id);
  if (pokemon) {
    const index = bdd.pokemons.findIndex((pokemon) => pokemon.id === id);

    if (index !== -1) {
      bdd.pokemons.splice(index, 1);
    }

    // Update bdd.json
    fs.writeFileSync(
      path.resolve(__dirname, "bdd.json"),
      JSON.stringify(bdd, null, 2),
    );

    res.json(success(200, "Pokemon supprimé", pokemon));
  } else {
    res.json(error(404, "Aucun Pokemon supprimé"));
  }
};
