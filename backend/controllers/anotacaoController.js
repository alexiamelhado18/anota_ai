import Anotacao from "../models/anotacaoModel.js";

async function listar(req, res) {

    try {
        //findAll é equivalente ao select * from tb_anotacao
        const anotacoes = await Anotacao.findAll();

        res.status(200).json(anotacoes);

    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }

}
async function obterPorID(req, res) {
    const { id } = req.params;

    try {
        const anotacaoBuscada = await obterPorIDInterno(id);

        //se não for encontrada
        if (!anotacaoBuscada) {
            //pode utilizar o 204 para retornar que não tem o conteudo
            //assim como tbm o 404 que é o não encontrado
            return res.status(204).json({ mensagem: "Anotação não encontrada" });
        }

        res.status(200).json(anotacaoBuscada);

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
        let novaAnotacao = {
            descricao: descricao,
            data_criacao: data_criacao,
            finalizada: false
        }

        if (id_usuario != undefined) {
            //adiciona uma nova propriedade com o valor do id do usuário
            novaAnotacao.id_usuario = id_usuario;
        }

        const anotacaoCriada = await Anotacao.create(novaAnotacao);

        res.status(201).json({ mensagem: "Anotação criado com sucesso", anotacaoCriada });
    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado", error });
    }
}
async function atualizar(req, res) {
    const { id } = req.params; //processo de desestruturação

    const { descricao, finalizada } = req.body;
    let propEscolhida = {};

    try {
        const anotacaoBuscada = await obterPorIDInterno(id);

        //se não existir a anotação com o ID passado pelo cliente
        if (!anotacaoBuscada) {
            return res.status(404).json({ mensagem: "Está anotação não existe na nossa base de dados." })
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
        await anotacaoBuscada.update(propEscolhida);

        res.status(200).json({ mensagem: "Anotação atualizada com sucesso", anotacaoBuscada })

    } catch (error) {
        res.status(500).json({ mensagem: "Erro inesperado, infelizmente não foi possível atualizar a anotação", error });
    }

}
async function deletar(req, res) {
    const { id } = req.params;

    try {
        const anotacaoBuscada = await obterPorIDInterno(id);

        if (!anotacaoBuscada) {
            res.status(404).json({ mensagem: "Não foi possível deletar essa anotação, pois a mesma não existe na nossa base." });
        }

        await anotacaoBuscada.destroy({
            where: { id_anotacao: id }
        });

        res.status(200).json({mensagem: "Anotação excluída com sucesso!"})
    } catch (error) {
        res.status(500).json({mensagem: "Erro inesperado, fale com um dos nossos administradores.", error});
    }
}
async function obterPorIDInterno(id) {
    try {
        return await Anotacao.findByPk(id);
    } catch (error) {
        return error;
    }
}

export default { listar, obterPorID, criar, atualizar, deletar };