import React, { useState, useEffect, useCallback } from 'react';

// Componente Questao01A (usando arrow function)
const Questao01A = () => {
  // Estado para armazenar as médias
  const [medias, setMedias] = useState([]); 
  const [loading, setLoading] = useState(true); // Estado de carregamento

  // Memoriza a função `receberMedias` para evitar recriação em cada render
  const receberMedias = useCallback((mediasCalculadas) => {
    setMedias(mediasCalculadas); // Atualiza as médias
    setLoading(false); // Para o carregamento
  }, []);

  // Função que renderiza alunos com média maior ou igual a 6
  const mostrarAlunosAcimaDaMedia = () => {
    return (
      <ul>
        {medias.map((media, index) => {
          if (media.media >= 6) {
            return <li key={index}>{media.nome}</li>;
          }
          return null;
        })}
      </ul>
    );
  };

  // Lista de alunos e notas
  const alunos = [
    { nome: "Lucas", notas: { a: 10, b: 3, c:7 } },
    { nome: "Iza", notas: { a: 5, b:-3, c: 9 } },
    { nome: "Ronaldo", notas: { a:1, b: 9,c:40 } }
  ];

  return (
    <div>
      {/* Passando a função calcularMedias para o componente filho */}
      <Questao01B alunos={alunos} calcularMedias={receberMedias} />
      {/* Condicional para mostrar enquanto está carregando ou as médias */}
      {loading ? <p>Carregando...</p> : mostrarAlunosAcimaDaMedia()}
    </div>
  );
};

// Componente Questao01B (usando função clássica)
function Questao01B(props) {
  useEffect(() => {
    // Verifica se a prop alunos está disponível e se calcularMedias é uma função
    if (props.alunos && typeof props.calcularMedias === 'function') {
      // Calcula a média de cada aluno
      const mediasCalculadas = props.alunos.map((aluno) => {
        const media = (aluno.notas.a + aluno.notas.b + aluno.notas.b) / 3;
        return { nome: aluno.nome, media: media };
      });

      // Passa as médias para o componente pai (Questao01A)
      props.calcularMedias(mediasCalculadas);
    }
  }, [props.alunos, props.calcularMedias]); //
  return null;
}

export default Questao01A;
