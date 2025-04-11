import { success, error } from "../lib/sucess.js";
import { User } from "../db/sequelize.js";
import bcrypt from "bcrypt";

export const getUsers = async (req, res) => {
  const users = await User.findAll();
  const usersCount = await User.count();
  if (users && usersCount > 0) {
    res.json(success(200, "Users trouvés", users));
  } else {
    res.json(error(404, "Aucun User trouvé"));
  }
};

export const getOneUser = async (req, res) => {
  const id = Number(req.params.id);
  const selectedUser = await User.findByPk(id);
  if (selectedUser) {
    res.json(success(200, "User trouvé", selectedUser));
  } else {
    res.json(error(404, "Aucun User trouvé"));
  }
};

export const createUser = async (req, res) => {
  let dbUser;

  try {
    if (!req.body) throw new Error("No body received");

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json(error(400, "Champs manquants"));
    }

    const newId = (await User.count()) + 1;

    const createdUser = {
      id: newId,
      name: String(name).trim(),
      email: String(email).trim(),
      password: bcrypt.hashSync(String(password).trim(), 10),
      created: new Date(),
    };
    dbUser = await User.create(createdUser);

    return res.json(success(201, "User créé", dbUser));
  } catch (err) {
    console.error("ERREUR COMPLÈTE:", err);
    return res.json(error(500, "Erreur serveur", err));
  }
};

export const editUser = async (req, res) => {
  const id = Number(req.params.id);
  const editedUser = await User.findByPk(id);
  if (editedUser) {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json(error(400, "Champs manquants"));
    }

    const updatedUser = {
      id: id,
      name: String(name).trim(),
      email: String(email).trim(),
      password: bcrypt.hashSync(String(password).trim(), 10),
      created: editedUser.created,
    };

    await User.update(updatedUser, {
      where: { id: id },
    });

    return res.json(success(200, "User modifié", updatedUser));
  } else {
    res.json(error(404, "Aucun User modifié"));
  }
};

export const deleteUser = async (req, res) => {
  const id = Number(req.params.id);
  const user = await User.findByPk(id);
  console.log(user);
  if (user) {
    User.destroy({ where: { id: id } });

    res.json(success(200, "User supprimé", user));
  } else {
    res.json(error(404, "Aucun User supprimé"));
  }
};
