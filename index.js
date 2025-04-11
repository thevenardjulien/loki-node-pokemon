import express from "express";
import { dirname, sep } from "path";
import { fileURLToPath } from "url";
import V1apiRoutes from "./src/routes/v1apiRoutes.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import process from "process";
import { initDb } from "./src/db/sequelize.js";

export const app = express();
export const __dirname = dirname(fileURLToPath(import.meta.url)) + sep;

// Configuration
const cfg = {
  port: process.env.PORT || process.argv[2] || 3000,
  dir: {
    root: __dirname,
    public: __dirname + "public" + sep,
    views: __dirname + "views" + sep,
  },
};

// DB
initDb();

// Static files
app.use(express.static(cfg.dir.public));

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Configuration EJS
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.status(200).send("loki-node-pokemon");
});

// API Routes
app.use("/api/v1", V1apiRoutes);

// Gestion des erreurs
app.use((req, res) => {
  console.log(`[404] ${req.method} ${req.path}`);
  res.status(404).send("Page not found");
});

// Démarrage du serveur
app.listen(cfg.port, () => {
  console.log(`Serveur démarré sur http://localhost:${cfg.port}`);
});
