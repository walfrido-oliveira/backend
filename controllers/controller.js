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