const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Goal = sequelize.define('Goal', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    curso_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Cursos',
            key: 'id'
        }
    },
    dia: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracao: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Usuarios',
            key: 'id'
        }
    }
}, {
    timestamps: true,
    tableName: 'Metas'
});

module.exports = Goal;