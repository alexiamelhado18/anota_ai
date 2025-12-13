import { Router } from "express";
import anotacaoController from "../controllers/anotacaoController.js";

//Chama a função Router do express para config as rotas
const routes = Router();

routes
    .get("/anotacao", anotacaoController.listar)
    .get("/anotacao/:id", anotacaoController.obterPorID)
    .post("/anotacao", anotacaoController.criar)
    .patch("/anotacao/:id", anotacaoController.atualizar); //passamos somente o atributo que queremos atualizar do obj
    //.put() //passamos o objeto todo para ser atualizado

export default routes;
