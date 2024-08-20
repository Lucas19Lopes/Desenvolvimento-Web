import React, { useState } from 'react';

function Questao02() {
  // Estado que define se está mostrando a frente ou costas do Pokémon
  const [virar, setVirar] = useState(false);

  // Caminho da imagem depende do estado 'virar'
  const imagem = virar
    ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/25.png"
    : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

  // Função para alternar a imagem
  function alternarImagem() {
    setVirar(!virar); // Alterna entre true e false
  }

  return (
    <div>
      <img src={imagem} alt="Pikachu" />
      {/* Botão para alternar entre frente e costas */}
      <button onClick={alternarImagem}>Virar Imagem</button>
    </div>
  );
}

export default Questao02;