import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AlunoFirebaseService from "../../services/AlunoFirebaseService";
import FirebaseContext from "../../utils/FirebaseContext";
import "../../css/crud.css";

const EditarAluno = () => {
  const [nome, setNome] = useState("");
  const [curso, setCurso] = useState("");
  const [ira, setIra] = useState("");

  const { id } = useParams(); 
  const navigate = useNavigate();
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    console.log(`Fetching data for ID: ${id}`); // Adicionado para depuração
    AlunoFirebaseService.getById(
      firebase.getFirestoreDb(),
      (aluno) => {
        console.log(aluno); // Adicionado para verificar dados recebidos
        const { nome, curso, ira } = aluno;
        setNome(nome);
        setCurso(curso);
        setIra(ira);
      },
      id
    );
  }, [id, firebase]);

  const handleInputNome = (event) => {
    setNome(event.target.value);
  };

  const handleInputCurso = (event) => {
    setCurso(event.target.value);
  };

  const handleInputIra = (event) => {
    setIra(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const alunoEditado = { nome, curso, ira };
    AlunoFirebaseService.atualizar(
      firebase.getFirestoreDb(),
      (response) => {
        console.log(response); // Adicionado para verificar resposta da atualização
        navigate("/aluno/listar");
      },
      id,
      alunoEditado
    )
    .catch(error => {
      console.error("Error updating student:", error);
    });
  };

  return (
    <div className="page-content">
      <h1>Editar Aluno</h1>
      <form className="form-content" onSubmit={handleSubmit}>

        <div className="mb-3">
          <label className="form-label" htmlFor="inputNome">Nome</label>
          <input
            className="form-control"
            type="text"
            name="nome"
            id="inputNome"
            onChange={handleInputNome}
            value={nome}
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
            value={curso}
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="inputIra">IRA</label>
          <input
            className="form-control"
            type="text"
            name="ira"
            id="inputIra"
            onChange={handleInputIra}
            value={ira}
          />
        </div>

        <div className="div-button-submit">
          <button
            type="submit"
            className="btn btn-primary"
            style={{ marginLeft: 0 }}
          >
            Atualizar
          </button>
        </div>

      </form>
    </div>
  );
}

export default EditarAluno;
