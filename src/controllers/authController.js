import { success, error } from "../lib/sucess.js";
import { User } from "../db/sequelize.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import process from "process";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.scope("withPassword").findOne({
      where: { email: email.toLowerCase().trim() },
      attributes: ["id", "name", "email", "password"],
    });

    if (!user) {
      return res.json(error(401, "Identifiants invalides"));
    }

    // 2. Vérification du mot de passe
    const isPasswordValid = await bcrypt.compare(
      password.trim(),
      user.password,
    );

    if (!isPasswordValid) {
      return res.json(error(401, "Mot de passe invalide"));
    }

    // 3. Génération du token JWT
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN || "1h" },
    );

    // 4. Réponse sans le mot de passe
    const userResponse = user.get();
    delete userResponse.password;

    return res.json(
      success(200, "Authentification réussie", userResponse, {
        token,
      }),
    );
  } catch (error) {
    console.error("Erreur auth:", error);
    return res.json({
      status: 500,
      message: "Erreur serveur",
      error,
    });
  }
};
