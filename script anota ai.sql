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