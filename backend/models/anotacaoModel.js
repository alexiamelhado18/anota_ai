
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db";

const Anotacao = sequelize.define(
    "Anotacao",
    {
        id_anotacao: {
            type: DataTypes.INTEGER, //define o tipo do atributo
            primaryKey: true,       //confirma se é PK
            autoIncrement: true,    //confirma se o valor é auto incrementado
            allowNull: false        //confirma se o valor pode ser nulo
        },
        

    }
);