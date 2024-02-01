const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.createCliente = (req, res) => {
  let cliente = {};

  try {
    cliente.nome = req.body.nome;
    cliente.idade = req.body.idade;
    cliente.id_usuario = req.body.id_usuario;
    Cliente.create(cliente,
      { attributes: ['id', 'nome', 'idade', 'id_usuario'] })
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
    { attributes: ['id', 'nome', 'idade', 'id_usuario'] })
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
    Cliente.findAll({ attributes: ['id', 'nome', 'idade', 'id_usuario'] })
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
    const { id, codigoExclusao } = req.body;

    const cliente = await Cliente.findByPk(id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente não encontrado com o ID fornecido",
        error: "404"
      });
    }

    const codigoEsperado = cliente.codigoExclusao;

    if (codigoExclusao !== codigoEsperado) {
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

exports.updateCliente = async (req, res) => {
  try {
    let cliente = await Cliente.findByPk(req.body.id);

    if (!cliente) {
      return res.status(404).json({
        message: "Cliente não encontrado com o Id fornecido",
        error: "404",
      });
    } else {
      let updateObject = {
        nome: req.body.nome,
        idade: req.body.idade
      }
      let result = await Cliente.update(updateObject,
        {
          returning: true,
          where: { id: req.body.id },
          attributes: ['id', 'nome', 'idade', 'id_usuario']
        }
      );
        
    if (!result) {
      return res.status(500).json({
        message: "Error -> Can not update a customer with id = " + req.params.id,
        error: "Can NOT Updated"
      });
    }

    console.log(result);
    res.status(200).json(result);    
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error -> Can not update a customer with id = " + req.params.id,
      error: error.message
    });
  }
}