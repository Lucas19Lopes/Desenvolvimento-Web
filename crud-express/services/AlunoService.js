//import ProfessorModel from "../models/ProfessorModel";
//import professores from "../data/db_professor";
const AlunoModel = require("../models/AlunoModel")
const alunos = require("../data/db_aluno")

let id = 5

class AlunoService {
    
    static listar() {
        return alunos
    }

    static criar(data) {
        let novoAluno = new AlunoModel(
            ++id,
            data.nome,
            data.curso,
            data.ira
        )
        professores.push(novoAluno)
        return novoAluno
    }
}

module.exports = AlunoService