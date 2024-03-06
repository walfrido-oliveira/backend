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
            set(value) {
               if (value.length >= 8 && value.length <= 20) {
                this.setDataValue('senha', bcrypt.hashSync(value, 10));
                } else {
                  throw new Error('Your password should be between 8-20 characters!' + value);
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
            /*beforeCreate: async (Usuario) => {
                if(Usuario.changed('senha')){
                    const hashedSenha = await bcrypt.hash(Usuario.senha, 10);
                    Usuario.senha = hashedSenha;
                };
            },*/
        }
    });

    Usuario.prototype.verificarSenha = async function (senha) {
        return await bcrypt.compare(senha, this.getDataValue('senha'));
    }
      
    Usuario.associate = (models) => {
        Usuario.hasOne(Cliente, {
            foreignKey: 'id_usuario'
        });
    };

    Usuario.associate = (models) => {
        Usuario.hasOne(Funcionario, {
            foreignKey: 'id_usuario'
        });
    }

    return Usuario;
}

