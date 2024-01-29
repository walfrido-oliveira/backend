module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define('cliente', {
        id_cliente: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
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
        email: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    });

    Cliente.associate = (models) => {
        Cliente.belongsTo(models.Usuario, {
            foreignKey: 'id_usuario',
            as: 'usuario'
        });
    };

    return Cliente;
};