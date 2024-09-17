import axios from "axios";

const url = "http://localhost:3001/alunos/";

class AlunoService {
  static getAlunosFetchAsyncAwait = async (callback) => {
    try {
      const response = await fetch(url+"listar");
      const json = await response.json();
      callback(json);
    } catch (error) {
      console.log(error);
    }
  };

  static getAlunosFetchThenCatch = (callback) => {
    fetch(url+"listar")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        //console.log(json)
        callback(json);
      })
      .catch((error) => console.log(error));
  };

  static getAlunosAxiosAsyncAwait = async (callback) => {
    try {
      const response = await axios.get(url+"listar");
      callback(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  static getAlunosAxiosThenCatch = (callback) => {
    axios
      .get(url+"listar")
      .then((response) => {
        //console.log(response.data)
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };

  static getAlunoById = (id, callback) => {
    axios
      .get(`http://localhost:3001/alunos/${id}`)
      .then((response) => {
        //console.log(response.data)
        //const { nome, curso, titulacao, ai, universidade } = response.data;
        callback(response.data);
      })
      .catch((error) => console.log(error));
  };

  static atualizarAlunoById = (id, alunoEditado, callback) => {
    axios
      .put(`http://localhost:3001/aluno/${id}`, alunoEditado)
      .then((response) => {
        //console.log(response)
        //navigate("/professores/listar");
        callback(response);
      })
      .catch((error) => console.log(error));
  };

  static deleteAlunoById = (id, callback) => {
    axios
      .delete(`http://localhost:3001/alunos/apagar/${id}`)
      .then((response) => {
        //console.log(response);
        callback(response)
      })
      .catch((error) => console.log(error));
  };
}

export default AlunoService;