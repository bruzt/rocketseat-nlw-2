import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

interface IPageHeader {
    title: string;
}

const PageHeader: React.FC<IPageHeader> = ({ title, children }) => {

    return (
        <header className='page-header'>
            <div className="top-bar-container">
                <Link to='/'>
                    <img src={backIcon} alt="voltar" />
                </Link>

                <img src={logoImg} alt="logo proffy" />
            </div>

            <div className="header-content">
                <strong>{title}</strong>

                {children}
            </div>
        </header>
    );
}

export default PageHeader;