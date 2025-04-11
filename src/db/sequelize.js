import { Sequelize, DataTypes } from "sequelize";
import { user_model } from "../models/usersModel.js";
import { pokemon_model } from "../models/PokemonsModel.js";
import process from "process";

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
export const User = user_model(sequelize, DataTypes);
export const Pokemon = pokemon_model(sequelize, DataTypes);

// Fonction d'initialisation de la base de données
export const initDb = async () => {
  try {
    // Test de connexion
    await sequelize.authenticate();
    console.log("Connexion à la base de données réussie");

    // Synchronisation des modèles
    await sequelize.sync();
    console.log("Synchronisation de la base de données réussie");

    return true;
  } catch (error) {
    console.error("Erreur d'initialisation de la base de données:", error);
    return false;
  }
};
