import React, { PropsWithChildren } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import logoImg from '../../assets/images/logo.svg';
import backIcon from '../../assets/images/icons/back.svg';

interface IPageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ title, description, children }: PropsWithChildren<IPageHeaderProps>) => {

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

                {description && <p>{description}</p>}

                {children}
            </div>
        </header>
    );
}

export default PageHeader;