import "../../css/crud.css";
import AlunoFirebaseService from "../../services/AlunoFirebaseService";
import FirebaseContext from "../../utils/FirebaseContext";

import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const ListarAluno = () => {
  const [alunos, setAlunos] = useState([]);
  const [ira, setIra] = useState(0);
  const [highlighted, setHighlighted] = useState(false);

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    AlunoFirebaseService.listar(
      firebase.getFirestoreDb(),
      (alunos) => {
        setAlunos(alunos);

        // Calcula a soma dos IRAs e o número de alunos
        let somaIRA = 0;
        let numeroAlunos = 0;

        for (let aluno of alunos) {
          somaIRA += aluno.ira;
          numeroAlunos++;
        }

        // Calcula a média dos IRAs
        const media = numeroAlunos > 0 ? somaIRA / numeroAlunos : 0;
        setIra(media);
      }
    );
  }, [firebase]);

  const handleDelete = (id) => {
    if (window.confirm(`Deseja excluir id = ${id}`)) {
      AlunoFirebaseService.apagar(
        firebase.getFirestoreDb(),
        (response) => {
          const result = alunos.filter((aluno) => aluno.id !== id);
          setAlunos(result);

          // Recalcula a média após a exclusão
          let somaIRA = 0;
          let numeroAlunos = 0;

          for (let aluno of result) {
            somaIRA += aluno.ira;
            numeroAlunos++;
          }

          const media = numeroAlunos > 0 ? somaIRA / numeroAlunos : 0;
          setIra(media);
        },
        id
      );
    }
  };

  const handleHighlight = () => {
    setHighlighted(!highlighted);
  };

  const renderizarAlunos = () => {
    return alunos.map((aluno) => {
      const rowClass = highlighted 
        ? aluno.ira < ira 
          ? 'below-average' 
          : aluno.ira > ira 
            ? 'above-average' 
            : '' 
        : '';
        
      return (
        <tr key={aluno.id} className={rowClass}>
          <th scope="row">{aluno.id}</th>
          <td>{aluno.nome}</td>
          <td>{aluno.curso}</td>
          <td>{aluno.ira}</td>
          <td>
            <div className="button-content">
              <Link to={`/aluno/editar/${aluno.id}`} className="btn btn-primary">
                Editar
              </Link>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(aluno.id)}
              >
                Apagar
              </button>
            </div>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="page-content">
      <h1>Listar Alunos {process.env.REACT_APP_LINK_API}</h1>
      <button className="btn btn-secondary" onClick={handleHighlight}>
        {highlighted ? 'Reverter Cores' : 'Destacar Alunos'}
      </button>
      <div className="table-content">
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Curso</th>
              <th scope="col">IRA</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{renderizarAlunos()}</tbody>
          <tfoot>
            <tr className="table-info">
              <td colSpan="3">Média IRA</td>
              <td>{ira.toFixed(2)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ListarAluno;
