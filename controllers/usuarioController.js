const db = require('../models/Usuario.js');

const Usuario = db.Usuario;

exports.createUsuario = async (req, res) => {
    let usuario = {};

    try{
        usuario.id = req.body.id;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;
        usuario.codigoExclusao = req.body.codigoExclusão;
        Usuario.create(usuario, 
                { attributes: ['id', 'login', 'senha', 'codigoExclusao']})
            .then(result => {
                res.status(200).json(result);
            });
    } catch(error){
        res.status(500).json({
            message: "Erro ao criar usuário.",
            error: error.message
        });
    }
}