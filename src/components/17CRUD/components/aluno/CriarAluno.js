import AlunoService from "../../services/AlunoService";

import AlunoFirebaseService from "../../services/AlunoFirebaseService";
import "../../css/crud.css";
import FirebaseContext from "../../utils/FirebaseContext";


import { useState, useContext } from "react"
const CriarAluno = () => {
    
    const [nome, setNome] = useState("")
    const [curso, setCurso] = useState("")
    const [ira, setIra] = useState()
   

    const firebase = useContext(FirebaseContext)
    
    const handleInputNome = (event) => {
        setNome(event.target.value)
    }

    const handleInputCurso = (event) => {
        setCurso(event.target.value)
    }

    const handleInputIra = (event) => {
        setIra(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        //alert("Nome: " + nome + "\nCurso: " + curso + " \nTitulacao: " + titulacao)
        const novoAluno = {nome,curso, ira}
        //postProfessorAxiosThenCatch(novoProfessor)
        //postProfessorFetchThenCatch(novoProfessor)
        /*ProfessorService.postProfessorAxiosThenCatch(
            novoProfessor,
            (data) => {
                console.log(data)
            }
        )*/
       AlunoFirebaseService.criar(
        firebase.getFirestoreDb(),
        (alunoSimples) => console.log(alunoSimples),
         novoAluno
       )

    }
    
    return (
        <div className="page-content">
            <h1>Criar Professor</h1>
            <form className="form-content" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <label className="form-label" htmlFor="inputNome">Nome</label>
                    <input
                        className="form-control"
                        type="text"
                        name="nome" 
                        id="inputNome"
                        onChange={handleInputNome}
                    />
                </div>
                
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputCurso">Curso</label>
                    <input
                        className="form-control"
                        type="text"
                        name="curso"
                        id="inputCurso"
                        onChange={handleInputCurso} 
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="inputIra">Ira</label>
                    <input
                        className="form-control"
                        type="number"
                        name="ira"
                        id="inputIra"
                        onChange={handleInputIra} 
                    />
                </div>

                

                <div className="div-button-submit">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{marginLeft:0}}
                    >
                        Submeter
                    </button>
                </div>

            </form>
        </div>
        
    )
}

export { CriarAluno }