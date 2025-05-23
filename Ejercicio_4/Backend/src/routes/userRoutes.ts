import { Router } from "express";
import cors from "cors";
import { createUser, deleteUser, getUserById, getUsers, login, updateUser } from "../controllers/userController";

const UserRoutes = Router();
UserRoutes.use(cors());

UserRoutes.get('/users', getUsers);
UserRoutes.get('/users/:id',getUserById);
UserRoutes.post('/users',createUser);
UserRoutes.put('/users/:id',updateUser);
UserRoutes.delete('users/:id',deleteUser);
UserRoutes.post('/login',login);

export default UserRoutes;