const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        login: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [5, 10],
                    msg: 'A senha deve ter entre 5 a 10 caracteres.'
                }
            }
        },
        codigoExclusao: {
            type: Sequelize.STRING,
            allowNull: false,
            defaultValue: () => uuidv4().replace(/-/g, '').substring(0, 5)
        },
    },
    {
        hooks: {
            beforeCreate: async (Usuario) => {
                if(Usuario.changed('senha')){
                    const hashedSenha = await bcrypt.hash(Usuario.senha, 10);
                    Usuario.senha = hashedSenha;
                };
            },
            beforeUpdate: async (Usuario) => {
                if(Usuario.changed('senha')){
                    const hashedNovaSenha = await bcrypt.hash(Usuario.getDataValue('senha'), 10);
                    Usuario.getDataValue('senha', hashedNovaSenha);
                }
            }
        }
    });

    Usuario.prototype.verificarSenha = async function (senha) {
        return await bcrypt.compare(senha, this.getDataValue('senha'));
    }

    return Usuario;
}

