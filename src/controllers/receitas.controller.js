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
	    FROM receitas JOIN "receitas_Categorias"
		    ON receitas.id = "receitas_Categorias".id_receita
	    JOIN categorias
		    ON categorias.id = "receitas_Categorias".id_categoria
              WHERE receitas.id=$1;`, [id]);

        // se precisar que seja apenas 1 registro com algumas infos \/
        const receitaIdAll = {
            ...receitaId.rows[0],
            categorias: receitaId.rows.map(rec => rec.categoria)
        }
        delete receitaIdAll.categoria;
        res.send(receitaIdAll);
        // res.send(receitaId.rows);
        // res.send(receitaId.rows[0]); // esse [0] é para tirar ele de dentro do array, vir só objeto
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