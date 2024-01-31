const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.createCliente = (req, res) => {
  let cliente = {};

  try {
    cliente.nome = req.body.nome;
    cliente.idade = req.body.idade;
    Cliente.create(cliente,
      { attributes: ['id', 'nome', 'idade'] })
      .then(result => {
        res.status(200).json(result);
      });
  } catch (error) {
    res.status(500).json({
      message: "Fail!",
      error: error.message
    });
  }
}

exports.getCliente = (req, res) => {
  Cliente.findByPk(req.params.id,
    { attributes: ['id', 'nome', 'idade'] })
    .then(cliente => {
      res.status(200).json(cliente);
    }).catch(error => {
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error
      });
    })
}

exports.clientes = (req, res) => {
  try {
    Cliente.findAll({ attributes: ['id', 'nome', 'idade'] })
      .then(clientes => {
        res.status(200).json(clientes);
      })
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error!",
      error: error
    });
  }
}

exports.deleteCliente = async (req, res) => {
  try {
    const { id, codigoConfirmacao } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente não encontrado com o ID fornecido",
        error: "404"
      });
    }

    const codigoEsperado = cliente.codigoExclusao;

    if (codigoConfirmacao !== codigoEsperado) {
      return res.status(401).json({
        message: "Código de confirmação incorreto. A exclusão requer confirmação.",
        error: "401"
      });
    }

    await cliente.destroy();

    return res.status(200).json({
      message: "Cliente deletado com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar o cliente",
      error: error.message
    });
  }
}

exports.modifyPassword = async (req, res) => {
  try {
    const { id, senhaAtual, novaSenha } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente não encontrado com o ID fornecido",
        error: "404"
      });
    }

    const senhaCorreta = await cliente.verificarSenha(senhaAtual);

    if (!senhaCorreta) {
      return res.status(401).json({
        message: "Senha atual incorreta",
        error: "401"
      });
    }


    const hashedNovaSenha = await bcrypt.hash(novaSenha, 10);

    await cliente.update({ senha: hashedNovaSenha });

    return res.status(200).json({
      message: "Senha do cliente atualizada com sucesso",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao modificar a senha do cliente",
      error: error.message
    });
  }
};