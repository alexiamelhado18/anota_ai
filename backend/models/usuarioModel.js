import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";


const Usuario = sequelize.define(
    "Usuario",
    {
        id_usuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nome_completo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_nasc: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "tb_usuario",
        timestamps: false
    }
);

export default Usuario;