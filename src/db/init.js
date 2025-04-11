import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/PokemonsModel.js";
import bdd from "../db/bdd.json" with { type: "json" };
import process from "process";

export const initDb = () => {
  // Database
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: process.env.DB_DIALECT,
      dialectOptions: {
        timezone: process.env.DB_TIMEZONE,
      },
      logging: false,
    },
  );

  sequelize
    .authenticate()
    .then(() => {
      console.log("Connexion à la base de données réussie");
    })
    .catch((err) => {
      console.log("Connexion à la base de données échouée: ", err);
    });

  // Synchronisation de la base de données
  const Pokemon = pokemon_model(sequelize, DataTypes);
  const pokemons = bdd.pokemons;

  sequelize.sync({ force: true }).then(() => {
    console.log("Synchronisation de la base de données réussie");
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types.join(),
      });
    });
  });
};
