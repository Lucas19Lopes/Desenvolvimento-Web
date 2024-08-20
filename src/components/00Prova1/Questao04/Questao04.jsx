import React, { useEffect, useState } from 'react';

function Questao04() {
  // Estados para armazenar as capitais de maior e menor população
  const [capitalMaior, setCapitalMaior] = useState('');
  const [capitalMenor, setCapitalMenor] = useState('');

  useEffect(() => {
    // Faz a requisição para a API
    fetch("https://restcountries.com/v3.1/region/europe?fields=capital,population")
      .then(response => response.json())
      .then(data => {
        // Variáveis para armazenar as populações
        let maiorPop = -Infinity;
        let menorPop = Infinity;
        let maiorCapital = '';
        let menorCapital = '';

        // Percorre os países e encontra a maior e menor população
        data.forEach(country => {
          const populacao = country.population;
          const capital = country.capital[0];

          if (populacao > maiorPop) {
            maiorPop = populacao;
            maiorCapital = capital;
          }

          if (populacao < menorPop) {
            menorPop = populacao;
            menorCapital = capital;
          }
        });

        // Atualiza os estados com as capitais encontradas
        setCapitalMaior(maiorCapital);
        setCapitalMenor(menorCapital);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h1>Capitais com maior e menor população</h1>
      {/* Exibe as capitais de maior e menor população */}
      <p>Maior População: {capitalMaior}</p>
      <p>Menor População: {capitalMenor}</p>
    </div>
  );
}

export default Questao04;