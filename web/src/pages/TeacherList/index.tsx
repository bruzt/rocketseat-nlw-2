import React, { useState, FormEvent } from 'react';

import api from '../../services/api';

import './styles.css';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

export interface IClasses {
    id: number; 
    subject: string;
    cost: number;
    user_id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

const TeacherList: React.FC = () => {

    const [getSubject, setSubject] = useState('');
    const [getWeekDay, setWeekDay] = useState('');
    const [getTime, setTime] = useState('');

    const [getClasses, setClasses] = useState<IClasses[]>([]);

    async function fetchTeachers(){

        try {

            //const response = await api.get(`/classes?week_day=${getWeekDay}&subject=${getSubject}&time=${getTime}`);

            const response = await api.get(`/classes`, {
                params: {
                    week_day: getWeekDay,
                    subject: getSubject,
                    time: getTime
                }
            });

            if(response.data.length === 0){

                alert('Nenhum professor encontrado');

            } else {

                setClasses(response.data);
            }

        } catch (error) {
            console.log(error);
            alert('Erro ao buscar professores');
        }
    }

    function handleSubmit(event: FormEvent){

        event.preventDefault();

        if(
            getSubject.length > 0 &&
            getWeekDay.length > 0 &&
            getTime.length > 0
        ){
            fetchTeachers();
        }
    }

    return (
        <div id="page-teacher-list" className='container'>
            <PageHeader title='Esses são os proffys disponíveis'>

                <form 
                    id="search-teachers"
                    onSubmit={handleSubmit}
                >

                    <Select 
                        name='subject' 
                        label='Matéria' 
                        onChange={(event) => setSubject(event.target.value)}
                        options={[
                            { value: 'Artes', label: 'Artes' },
                            { value: 'Biologia', label: 'Biologia' },
                            { value: 'Ciências', label: 'Ciências' },
                            { value: 'Educação física', label: 'Educação física' },
                            { value: 'Física', label: 'Física' },
                            { value: 'Geografia', label: 'Geografia' },
                            { value: 'História', label: 'História' },
                            { value: 'Matemática', label: 'Matemática' },
                            { value: 'Português', label: 'Português' },
                            { value: 'Inglês', label: 'Inglês' },
                            { value: 'Química', label: 'Química' },
                        ]}
                    />

                    <Select 
                        name='week-day' 
                        label='Dia da semana' 
                        onChange={(event) => setWeekDay(event.target.value)}
                        options={[
                            { value: '0', label: 'Domingo' },
                            { value: '1', label: 'Segunda-feira' },
                            { value: '2', label: 'Terça-feira' },
                            { value: '3', label: 'Quarta-feira' },
                            { value: '4', label: 'Quinta-feira' },
                            { value: '5', label: 'Sexta-feira' },
                            { value: '6', label: 'Sábado' },
                            
                        ]}
                    />

                    <Input 
                        type='time'
                        name='time' 
                        label='Hora' 
                        onChange={(event) => setTime(event.target.value)}
                    />

                    <button type='submit'>
                        Buscar
                    </button>
                    
                </form>

            </PageHeader>

            <main>

                {getClasses.map( (oneClass) => <TeacherItem key={oneClass.id} data={oneClass}  /> )}
                
            </main>
        </div>
    );
}

export default TeacherList;