import bdd from "../db/bdd.json" with { type: "json" };
import { success, error } from "../lib/sucess.js";
import fs from "fs";
import path from "path";
import { __dirname } from "../../index.js";
import { Pokemon } from "../db/sequelize.js";

export const getPokemons = async (req, res) => {
  const pokemons = await Pokemon.findAll();
  if (pokemons) {
    res.json(success(200, "Pokemons trouvés", pokemons));
  } else {
    res.json(error(404, "Aucun Pokemon trouvé"));
  }
};

export const getOnePokemon = async (req, res) => {
  const id = Number(req.params.id);
  const selectedPokemon = await Pokemon.findByPk(id);
  if (selectedPokemon) {
    res.json(success(200, "Pokemon trouvé", selectedPokemon));
  } else {
    res.json(error(404, "Aucun Pokemon trouvé"));
  }
};

export const createPokemon = async (req, res) => {
  let dbPokemon;

  try {
    if (!req.body) throw new Error("No body received");

    const { name, hp, cp, picture, types } = req.body;
    if (!name || !hp || !cp || !picture || !types) {
      return res.json(error(400, "Champs manquants"));
    }

    const newId = (await Pokemon.count()) + 1;

    const createdPokemon = {
      id: newId,
      name: String(name).trim(),
      hp: Number(hp),
      cp: Number(cp),
      picture: String(picture).trim(),
      types: Array.isArray(types) ? types : [types],
      created: new Date(),
    };

    dbPokemon = await Pokemon.create(createdPokemon);

    return res.json(success(201, "Pokemon créé", dbPokemon));
  } catch (err) {
    console.error("ERREUR COMPLÈTE:", err);
    return res.json(error(500, "Erreur serveur", err));
  }
};

export const editPokemon = async (req, res) => {
  const id = Number(req.params.id);
  const editedPokemon = await Pokemon.findByPk(id);
  if (editedPokemon) {
    const { name, hp, cp, picture, types } = req.body;
    if (!name || !hp || !cp || !picture || !types) {
      return res.json(error(400, "Champs manquants"));
    }

    const updatedPokemon = {
      id: id,
      name: String(name).trim(),
      hp: Number(hp),
      cp: Number(cp),
      picture: String(picture).trim(),
      types: Array.isArray(types) ? types : [types],
      created: editedPokemon.created,
    };

    await Pokemon.update(updatedPokemon, {
      where: { id: id },
    });

    return res.json(success(200, "Pokemon modifié", updatedPokemon));
  } else {
    res.json(error(404, "Aucun Pokemon modifié"));
  }
};

export const deletePokemon = (req, res) => {
  const id = Number(req.params.id);
  const pokemon = Pokemon.findByPk(id);
  if (pokemon) {
    Pokemon.destroy({ where: { id: id } });

    res.json(success(200, "Pokemon supprimé", pokemon));
  } else {
    res.json(error(404, "Aucun Pokemon supprimé"));
  }
};
