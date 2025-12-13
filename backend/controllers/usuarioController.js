import Usuario from "../models/usuarioModel.js";

async function listar(req, res) {

    try {
        //findAll é equivalente ao select * from tb_usuario
        const usuarios = await Usuario.findAll();

        res.status(200).json(usuarios);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }

}
async function obterPorID(req, res) {
    const { id } = req.params;

    try {
        const usuarioBuscado = await obterPorIDInterno(id);

        //se não for encontrada
        if (!usuarioBuscado) {
            //pode utilizar o 204 para retornar que não tem o conteudo
            //assim como tbm o 404 que é o não encontrado
            return res.status(204).json({ mensagem: "Usuário não encontrado" });
        }

        res.status(200).json(usuarioBuscado);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }

}
async function criar(req, res) {
    const {
        descricao,
        data_criacao,
        id_usuario
    } = req.body;

    try {
        let novoUsuario = {
            descricao: descricao,
            data_criacao: data_criacao,
            finalizada: false
        }

        if (id_usuario != undefined) {
            //adiciona uma nova propriedade com o valor do id do usuário
            novoUsuario.id_usuario = id_usuario;
        }

        const usuarioCriado = await Usuario.create(novoUsuario);

        res.status(201).json({ mensagem: "Usuário criado com sucesso", usuarioCriado });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }
}
async function atualizar(req, res) {
    const { id } = req.params; //processo de desestruturação

    const { descricao, finalizada } = req.body;
    let propEscolhida = {};

    try {
        const usuarioBuscado = await obterPorIDInterno(id);

        //se não existir a Usuário com o ID passado pelo cliente
        if (!usuarioBuscado) {
            return res.status(404).json({ mensagem: "Este Usuário não existe na nossa base de dados." })
        }

        //se for diferente de não definido
        if (descricao != undefined) {
            propEscolhida.descricao = descricao;
        }

        //se for diferente de não definido
        else if (finalizada != undefined) {
            propEscolhida.finalizada = finalizada;
        }

        //o metodo update do sequelize vale para os verbos put e patch
        await usuarioBuscado.update(propEscolhida);

        res.status(200).json({ mensagem: "Usuário atualizado com sucesso", usuarioBuscado })

    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado, infelizmente não foi possível atualizar o Usuário", error });
    }

}
async function deletar(req, res) {
    const { id } = req.params;

    try {
        const usuarioBuscado = await obterPorIDInterno(id);

        if (!usuarioBuscado) {
            res.status(404).json({ mensagem: "Não foi possível deletar esse Usuário, pois o mesmo não existe na nossa base." });
        }

        await usuarioBuscado.destroy({
            where: { id_usuario: id }
        });

        res.status(200).json({mensagem: "Usuário excluído com sucesso!"})
    } catch (error) {
        res.status(500).json({mensagem: "Erro inesperado, fale com um dos nossos administradores.", error});
    }
}
async function obterPorIDInterno(id) {
    try {
        return await Usuario.findByPk(id);
    } catch (error) {
        return error;
    }
}

export default { listar, obterPorID, criar, atualizar, deletar };