-- criar o bd
CREATE DATABASE db_anotaai;

-- utiliza o banco
USE db_anotaai;

-- criar as tabelas em ordem das tabelas que não tem relação
CREATE TABLE tb_usuario(
	id_usuario		INT AUTO_INCREMENT PRIMARY KEY -- TIPO UUID()
    ,nome_completo	VARCHAR(255)	NOT NULL
    ,email			VARCHAR(255)	NOT NULL	UNIQUE
    ,senha			VARCHAR(100)	NOT NULL
    ,data_nasc		DATE  			NOT NULL
);

CREATE TABLE tb_anotacao(
	id_anotacao			INT AUTO_INCREMENT	PRIMARY KEY
    ,descricao			VARCHAR(500)	NOT NULL
    ,data_criacao		DATE			NOT NULL
    ,data_finalizacao	DATE  			NULL
    ,id_usuario			INT 			NULL
    
    ,FOREIGN KEY(id_usuario) REFERENCES tb_usuario(id_usuario)
);
/*alter table nomedatabela
add FOREIGN KEY (nomedacoluna) INT NULL REFERENCES tb_usuario(id_usuario)*/

-- consulta as tabelas para ver se existe
SELECT * FROM tb_usuario;
SELECT * FROM tb_anotacao;

-- inserir os dados nas tabelas
INSERT INTO tb_usuario(nome_completo, email, senha, data_nasc)
VALUES
	(
		'Joaquim da Silva'
        ,'joaquim@email.com'
        ,'123'
        ,'1992-07-02'
    )
    ,(
		'Maria José'
        ,'maria@email.com'
        ,'123'
        ,'1970-01-10'
    );
 
SELECT * FROM tb_usuario;
    
INSERT INTO tb_anotacao(descricao, data_criacao, data_finalizacao, id_usuario)
VALUES
	(
		'Finalizar o banco de dados Biblio e Anota Aí'
        ,'2025-10-11'
        ,'2025-10-18'
        ,2
    )
    ,(
		'Limpar o banheiro'
        ,'2025-10-18'
        ,'2025-10-18'
        ,1
	)
    ,(
		'Cuidar da crianças'
        ,'2025-10-18'
        ,NULL
        ,2
    );
    
SELECT * FROM tb_anotacao;












