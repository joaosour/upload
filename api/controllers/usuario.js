import { db } from "../db.js"

export const getUser = (_, res) => {
    const q = "SELECT * FROM usuario"

    db.query(q, (err, data) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json(data)
    })
}

export const addUser = (req, res) => {
    const q = "INSERT INTO usuario (`nome`) VALUES (?)"

    const value = [
        req.body.nome
    ]

    db.query(q, [value], (err) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json('Usuário criado com sucesso!')
    })
}

export const updateUser = (req, res) => {
    const q = "UPDATE usuario SET nome = ? WHERE id = ?"

    const value = [
        req.body.nome
    ]

    db.query(q, [req.body.nome, req.params.id], (err) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json('Usuário alterado com sucesso!')
    })
}

export const deleteUser = (req, res) => {
    const q = "DELETE FROM usuario WHERE id = ?"

    const value = [
        req.params.id
    ]

    db.query(q, [value], (err) => {
        if(err) return res.status(500).json(err)

        return res.status(200).json('Usuário deletado com sucesso!')
    })
}