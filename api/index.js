import express from "express"
import cors from "cors"
import usersRoutes from "./routes/usuarios.js"

const app = express()

app.use(express.json())

app.use(cors())

app.use('/', usersRoutes)

const port = 8000;

app.listen(port, () => console.log(`API online na porta ${port}`))