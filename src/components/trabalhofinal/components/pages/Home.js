import React from 'react';
import "../css/Home.css";
import logo from '../assets/logobarbearia .jpg';
import instagramLogo from '../assets/instagram.png';

function Home() {
  return (
    <div className="home-container">
      <main className="apresentacao">
        <section className="apresentacao__conteudo">
          <h1 className="apresentacao__conteudo__titulo">
            <strong className="titulo-destaque">Barbearia Solonópole: O Estilo e Cuidado que Você Merece!</strong>
          </h1>
          <p className="apresentacao__conteudo__paragrafo">
            Seja bem-vindo à Barbearia Solonópole, onde o estilo encontra a tradição. Nossos experientes barbeiros estão prontos para transformar seu visual e proporcionar uma experiência única. Desde cortes clássicos até as últimas tendências, aqui você encontrará o cuidado e a atenção que sua barba e cabelo merecem. Venha nos visitar e saia com um visual impecável! <strong className="titulo-destaque2">Venha nos visitar</strong>.
          </p>
          <div className="apresentacao__links">
            <h2 className="apresentacao__links__subtitulo">Veja nossa Rede Social:</h2>
            <a className="apresentacao__links__navegacao" href="https://www.instagram.com/barbeariasolonopole?igsh=bjQwOWpxc3Btd2Jk">
              <img src={instagramLogo} alt="Logo do Instagram" />
              Instagram
            </a>
          </div>
        </section>
        <img className="apresentacao__imagem" src={logo} alt="Foto do Logo da Barbearia Solonópole" width="460" height="460" />
      </main>
    </div>
  );
}

export default Home;
