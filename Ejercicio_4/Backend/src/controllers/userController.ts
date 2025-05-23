import { Request, Response } from "express";
import { pool } from "../db/connection";
import bcrypt from "bcrypt";
import { createToken } from "../utils/jwt";

export const login = async (req: Request, res: Response) => {
  const { userPassword,userName } = req.body;

  try {
    const [rows]: any = await pool.query(
      "SELECT id, userPassword FROM Users WHERE userName = ?",
      [userName]
    );
    if (rows.length === 0){
      res.status(404).json({ message: "Usuario no encontrado" });return;
    }
    const isMatch = await bcrypt.compare(userPassword,rows[0].userPassword);
    if(!isMatch){
      res.status(404).json({ message: "Contraseña incorrecta" });return;
    }
    const toket = createToken(rows[0].id,userName);
    res.status(200).json({token: toket});
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const [rows] = await pool.query("SELECT id, userName FROM Users");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [rows]: any = await pool.query(
      "SELECT id, userName FROM Users WHERE id = ?",
      [id]
    );
    if (rows.length === 0)
      res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(rows[0]);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { userName, userPassword } = req.body;
  if (!userName || !userPassword) {
    res.status(400).json({ message: "Faltan campos requeridos" });
  }
  try {
    const pass = await bcrypt.hash(userPassword, 10);
    await pool.query(
      "INSERT INTO Users (userName, userPassword) VALUES (?, ?)",
      [userName, pass]
    );
    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { userName, userPassword } = req.body;

  try {
    const [result]: any = await pool.query(
      "UPDATE Users SET userName = ?, userPassword = ? WHERE id = ?",
      [userName, userPassword, id]
    );
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const [result]: any = await pool.query("DELETE FROM Users WHERE id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
