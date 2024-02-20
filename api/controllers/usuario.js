import { db } from "../db.js";

export const getUsers = (_, res) => {
    const q = "SELECT * FROM usuario";

    db.query(q, (err, data) => {
        if (err) return res.status(500).json(err);

        return res.status(200).json(data);
    });
};

export const addUser = (req, res) => {

    const checkUserExist = "SELECT * FROM usuario WHERE nome = ?";

    db.query(checkUserExist, [req.body.nome], (err, results) => {
        if(err) {
            return res.status(500).json(err);
        }
        if(results.length > 0) {
            return res.status(409).json("Usuário já existe!");
        }
        else {
            
            const q = "INSERT INTO usuario(`nome`) VALUES(?)";
        
            const values = [
                req.body.nome,
            ];
        
            db.query(q, [values], (err) => {
                if(err) return res.status(500).json(err);
        
                return res.status(201).json("Usuário criado com sucesso");
            });
        }
    });
};

export const updateUser = (req, res) => {

    const q = "SELECT * FROM usuario WHERE `id` = ?";

    db.query(q, [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }

        if (results.length === 0) {
            return res.status(404).json("Usuário não encontrado");
        }

        else {
            const q = "UPDATE usuario SET `nome` = ?  WHERE `id` = ?";
            const values = [
                req.body.nome,
                req.params.id,
            ];
    
            db.query(q, values, (err) => {
                if (err) {
                    return res.status(500).json(err);
                }
    
                return res.status(200).json("Usuário atualizado com sucesso."   );
            });
        }
    });
};

export const deleteUser = (req, res) => {
    const checkUserExist = "SELECT * FROM usuario WHERE `id` = ?";

    db.query(checkUserExist, [req.params.id], (err, results) => {
        if(err) return res.status(500).json(err);

        else if(results.length === 0) {
            return res.status(404).json("Usuário não encontrado!");
        }
        else {
            const q = "DELETE FROM usuario WHERE `id` = ?";
        
            db.query(q, [req.params.id], (err) => {
                if(err) return res.json(err);
        
                return res.status(200).json("Usuário deletado com sucesso");
            });
        }
    })

};