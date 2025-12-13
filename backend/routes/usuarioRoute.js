import { Router } from "express";
import usuarioController from "../controllers/usuarioController.js";

//Chama a função Router do express para config as rotas
const routes = Router();

routes
    .get("/usuario", usuarioController.listar)
    .get("/usuario/:id", usuarioController.obterPorID)
    .post("/usuario", usuarioController.criar)
    .patch("/usuario/:id", usuarioController.atualizar) //passamos somente o atributo que queremos atualizar do obj
    //.put() //passamos o objeto todo para ser atualizado
    .delete("/usuario/:id", usuarioController.deletar);

export default routes;