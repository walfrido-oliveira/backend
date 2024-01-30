const db = require('../config/db.config.js');

const Usuario = db.Usuario;

exports.createUsuario = async (req, res) => {
    let usuario = {};

    try {
        usuario.id = req.body.id;
        usuario.login = req.body.login;
        usuario.senha = req.body.senha;
        usuario.codigoExclusao = req.body.codigoExclusao;

        Usuario.create(usuario,
            { attributes: ['id', 'login', 'senha', 'codigoExclusao'] })
            .then(result => {
                res.status(200).json(result);
            });
    } catch (error) {
        res.status(500).json({
            message: "Erro ao criar usuário.",
            error: error.message
        });
    }
}

exports.deleteUsuario = async (req, res) => {
    try {
        const { id, codigoExclusao } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado com o Id fornecido",
                error: "404"
            });
        }

        const codigoEsperado = usuario.codigoExclusao;

        if (codigoExclusao !== codigoEsperado) {
            return res.status(401).json({
                message: "Código de exclusão incorreto. A exclusão requer o código correto.",
                error: "401"
            });
        }

        await usuario.destroy();

        return res.status(200).json({
            message: "Usuário deletado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao deletar o usuário.",
            error: error.message
        });
    }
}