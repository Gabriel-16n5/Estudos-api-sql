import { db } from "../database/database.connection.js";

export async function getReceitas(req, res) {
    try{
        const receitas = await db.query('SELECT * FROM receitas;');
        res.send(receitas.rows);
    } catch (erro){
        res.send(erro.message)
    }
}

export async function getReceitaById(req, res) {
    const {id} = req.params;
    try{
        const receitaId = await db.query(`
        SELECT receitas.*, categorias.nome AS categoria 
            FROM receitas
            JOIN categorias ON receitas.id_categoria = categorias.id 
            WHERE receitas.id=$1;`, [id]);
        /* exemplo para melhorar a apresentação do que volta para user
        const deixandoApresentavel = receitaId.rows[0];
        if(deixandoApresentavel.id_categoria === 1){
            const categoria = "amador";
            const receita = {...deixandoApresentavel, categoria};
            res.send(receita);
        }*/

        res.send(receitaId.rows[0]); // esse [0] é para tirar ele de dentro do array, vir só objeto
    } catch (erro){
        res.send(erro.message)
    }
}

export async function createReceita(req, res) {
    res.send("createReceita")
}

export async function deleteReceita(req, res) {
    res.send("deleteReceita")
}

export async function editReceitaById(req, res) {
    res.send("editReceitaById")
}