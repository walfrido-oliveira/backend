module.exports = (sequelize, Sequelize) => {
    const Funcionario = sequelize.define('funcionario', {
        id: {
            type: Sequelize.INTEGER,
            autoINcrement: true,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        idade: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        cargo: {
            type: Sequelize.STRING,
            allowNull: false
        },
        id_usuario: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });

    Funcionario.associate = (models) => {
        Cliente.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
    };

    return Funcionario;
};