import React from 'react';

import api from '../../services/api';

import './styles.css';
import { IClasses } from '../../pages/TeacherList';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

interface ITeacherItemProps {
    data: IClasses;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ data }: ITeacherItemProps) => {

    async function createConnection(){

        try {

            api.post('/connections', {
                user_id: data.id
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <article className="teacher-item">
            <header>
                <img
                    src={data.avatar}
                    alt={data.name}
                />
                <div>
                    <strong>{data.name}</strong>
                    <span>{data.subject}</span>
                </div>
            </header>

            <p>
                {data.bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                <strong>R$ {data.cost.toFixed(2)}</strong>
                </p>
                <a
                    onClick={createConnection}
                    href={`http://wa.me/${data.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img src={whatsappIcon} alt="whatsapp" />
                Entrar em contato
            </a>
            </footer>
        </article>
    );
}

export default TeacherItem;