var express = require('express');
var router = express.Router();

const AlunoService = require("../services/AlunoService");
const AlunoServiceMongo = require("../services/AlunoServiceMongo")

/*router.get(
    "/listar",
    (request, response, next) => {
        response.json(ProfessorService.listar())
    }
)*/

router.get(
    "/listar",
    (request, response, next) => {
        AlunoServiceMongo.listar(request,response)
    }
)

/*router.post(
    "/criar",
    (request, response, next) => {
        const novoProfessor = ProfessorService.criar(request.body)
        response.json(novoProfessor)
    }
)*/

//MONGO
router.post(
    "/criar",
    (request, response, next) => {
       AlunoServiceMongo.criar(request,response)
    }
)

/*router.delete(
    "/apagar/:id",
    (request,response,next) => {
        const res = ProfessorService.apagar(request.params.id)
        response.json({"res":res})
    }
)*/

//MONGO
router.delete(
    "/apagar/:id",
    (request,response,next) => {
    AlunoServiceMongo.apagar(request,response)
    }
)


module.exports = router