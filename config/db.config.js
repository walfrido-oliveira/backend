const env = require('./env');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorAliases: false
});

const db = [];

db.Usuario = require('../models/Usuario')(sequelize, Sequelize);
db.Cliente = require('../models/Cliente')(sequelize, Sequelize);
db.Funcionario = require('../models/funcionario')(sequelize, Sequelize);

db.Usuario.hasOne(db.Cliente, { foreingKey: 'id_usuario' });
db.Usuario.hasOne(db.Funcionario, { foreingKey: 'id_usuario' });

db.sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorAliases: false
});

module.exports = db;
