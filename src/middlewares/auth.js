import jwt from "jsonwebtoken";
import process from "process";

/**
 * Middleware qui vérifie le JWT dans les en-têtes
 * @returns {Function} Middleware Express
 */
export const authenticateJWT = () => {
  return (req, res, next) => {
    // 1. Récupérer le token depuis le header "Authorization"
    const authHeader = req.headers.authorization;

    // 2. Vérifier la présence et le format du token
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "Format de token invalide. Utilisez 'Bearer <token>'",
      });
    }

    // 3. Extraire le token (en retirant "Bearer ")
    const token = authHeader.split(" ")[1];

    // 4. Vérifier et décoder le token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          error: "Token expiré ou invalide",
        });
      }

      // 5. Injecter les données utilisateur dans la requête
      req.user = decoded; // Contient userId, role, etc.
      next();
    });
  };
};
