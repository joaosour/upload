import express from "express"
import { addUser, deleteUser, getUser, updateUser } from "../controllers/usuario.js";

const router = express.Router()

router.get('/usuario', getUser)

router.post('/usuario', addUser)

router.put('/usuario/:id', updateUser)

router.delete('/usuario/:id', deleteUser)

export default router;