const db = require('../config/db.config.js');

const Usuario = db.Usuario;

exports.createUsuario = async (req, res) => {
    let usuario = {};

    try {
        usuario.login = req.body.login;
        usuario.email = req.body.email;
        usuario.senha = req.body.senha;

        Usuario.create(usuario,
            { attributes: ['id', 'login', 'email', 'senha', 'codigoExclusao'] })
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

exports.updateUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { novoLogin, novoEmail } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado com o Id fornecido",
                error: "404"
            });
        }

        if (novoLogin) {
            usuario.login = novoLogin;
        }

        if (novoEmail) {
            usuario.email = novoEmail; 
        }

        await usuario.save();

        return res.status(200).json({
            message: `Usuário com Id ${id} atualizado com sucesso.`,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar o usuário",
            error: error.message
        });
    }
}

exports.usuarios = (req, res) => {
    try {
       Usuario.findAll({ attributes: ['id', 'login','email', 'senha', 'codigoExclusao'] })
       .then(usuarios => {
            res.status(200).json(usuarios);
       })
    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.modifyPassword = async (req, res) => {
    try {
        const { id, senhaAtual, novaSenha } = req.body;

        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
            return res.status(404).json({
                message: "Usuário não encontrado com o Id fornecido",
                error: "404"
            });
        }

        const senhaCorreta = await usuario.verificarSenha(senhaAtual);

        if (!senhaCorreta) {
            return res.status(401).json({
                message: "Senha atual incorreta",
                error: "401"
            });
        }

        const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

        await usuario.update({ hashedNovaSenha });

        return res.status(200).json({
            message: "Senha do usuário atualizada com sucesso",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao modificar a senha do usuário",
            error: error.message
        });
    }
}