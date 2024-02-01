const db = require('../config/db.config');
const Funcionario = db.Funcionario;

exports.createFuncionario = (req, res) => {
  let funcionario = {};

  try {
    funcionario.nome = req.body.nome;
    funcionario.idade = req.body.idade;
    funcionario.cargo = req.body.cargo;
    funcionario.id_usuario = req.body.id_usuario;
    Funcionario.create(funcionario, 
      { attributes: ['id', 'nome', 'idade', 'cargo', 'id_usuario']})
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

exports.getFuncionario = (req, res) => {
  Funcionario.findByPk(req.params.id, 
    { attributes: ['id', 'nome', 'idade', 'cargo', 'id_usuario']})
    .then(funcionario => {
      res.status(200).json(funcionario);
    }).catch (error => {
      console.log(error);

      res.status(500).json({
        message: "Error!",
        error: error
      });
    })
}

exports.funcionarios = (req, res) => {
  try {
    Funcionario.findAll({ attributes: ['id', 'nome', 'idade', 'cargo', 'id_usuario']})
    .then(funcionarios => {
      res.status(200).json(funcionarios);
    })
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error!",
      error: error
    });
  }
}

exports.deleteFuncionarios = async (req, res) => {
  try {
    const { id, codigoExclusao } = req.body;

    const funcionario = await Funcionario.findByPk(id);

    if (!funcionario) {
      return res.status(401).json({
        message: "Funcionário não encontrado com o Id forncecido",
        error: "401"
      });
    }

    const codigoEsperado = codigoExclusao;

    if (codigoEsperado !== codigoExclusao) {
      return res.status(404).json({
        message: "Código de exclusão incorreto. A exclusão requer o código correto.",
        error: "401"
      });
    }

    await funcionario.destroy();

    return res.status(200).json({
      message: "Funcionário deletado com sucesso."
    });
  } catch (error) {
    return res.status(500).json({
      message: "Erro ao deletar funcionário",
      error: error.message
    });
  }
}