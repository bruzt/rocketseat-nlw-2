import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem: React.FC = () => {

  return (
    <article className="teacher-item">
        <header>
            <img 
                src="https://avatars0.githubusercontent.com/u/12144828?s=460&u=c6f46aa919cc4b69ffc4bdc583905fa279930a95&v=4" 
                alt="Bruno Zutim"
            />
            <div>
                <strong>José da Silva</strong>
                <span>Astrofísica</span>
            </div>
        </header>

        <p>
            Entusiasta da astrofisica!
            <br/><br/>
            Vivo voando nas minha ideias
        </p>

        <footer>
            <p>
                Preço/hora
                <strong>R$ 20,00</strong>
            </p>
            <button type='button'>
                <img src={whatsappIcon} alt="whatsapp"/>
                Entrar em contato
            </button>
        </footer>
    </article>
  );
}

export default TeacherItem;