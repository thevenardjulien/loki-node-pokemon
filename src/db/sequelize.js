import { Sequelize, DataTypes } from "sequelize";
import { pokemon_model } from "../models/PokemonsModel.js";
import process from "process";
import bdd from "../db/bdd.json" with { type: "json" };

// Initialisation de l'instance Sequelize
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

// Initialisation du modèle
export const Pokemon = pokemon_model(sequelize, DataTypes);

// Fonction d'initialisation de la base de données
export const initDb = async () => {
  try {
    // Test de connexion
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie");

    // Synchronisation des modèles
    await sequelize.sync({ force: true });
    console.log("Synchronisation de la base de données réussie");

    // Pokemons initiaux
    await Pokemon.bulkCreate(bdd.pokemons);

    return true;
  } catch (error) {
    console.error("Erreur d'initialisation de la base de données:", error);
    return false;
  }
};
