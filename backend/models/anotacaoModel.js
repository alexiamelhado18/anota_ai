
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Usuario from "./usuarioModel.js"

const Anotacao = sequelize.define(
    "Anotacao",
    {
        id_anotacao: {
            type: DataTypes.INTEGER, //define o tipo do atributo
            primaryKey: true,       //confirma se é PK
            autoIncrement: true,    //confirma se o valor é auto incrementado
            allowNull: false        //confirma se o valor pode ser nulo
        },
        descricao: {
            type: DataTypes.STRING,
            allowNull: false
        },
        data_criacao: {
            type: DataTypes.DATE,
            allowNull: false
        },
        data_finalizacao: {
            type: DataTypes.DATE,
            allowNull: true
        },
        finalizada: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        id_usuario: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

    },
    {
        tableName: "tb_anotacao",
        timestamps: false
    }
);

//Associação - 1:N
Usuario.hasMany(Anotacao, { foreignKey: "id_usuario" });
Anotacao.belongsTo(Usuario, { foreignKey: "id_usuario" });

export default Anotacao;