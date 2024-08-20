import "./style.css"
import React, {Component} from "react";

function MeusDados() {
  return (
    <div className="fundo-amarelo">
      <h1>Nome: Francisco Lucas Lopes Araujo</h1>
      <h1>Curso: RC</h1>
      <h1>Universidade: UFC</h1>
    </div>
  );
}

const MeusDadosV1 = () => {
  return (
    <div>
      <h1>Nome: Francisco Lucas Lopes Araujo</h1>
      <h1>Curso: RC</h1>
      <h1>Universidade: UFC</h1>
    </div>
  );
};

const MeusDadosV2 = () => 
  <div>
    <h1>Nome: Francisco Lucas Lopes Araujo</h1>
    <h1>Curso: RC</h1>
    <h1>Universidade: UFC</h1>
  </div>

class MeusDadosV3 extends Component {
    render() {
        return (
            <div>
                <h1>Nome: Francisco Lucas Lopes Araujo</h1>
                <h1>Curso: RC</h1>
                <h1>Universidade: UFC</h1>
            </div>
        )
    }
}

export { MeusDados, MeusDadosV1, MeusDadosV2, MeusDadosV3 };