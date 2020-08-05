import React, { useState,  FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

import warningIcon from '../../assets/images/icons/warning.svg';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Textarea from '../../components/Textarea';

interface IScheduleItems {
    week_day: string;
    from: string;
    to: string;
}

const TeacherForm: React.FC = () => {

    const [getScheduleItems, setScheduleItems] = useState<IScheduleItems[]>([]);

    const [getName, setName] = useState('');
    const [getAvatar, setAvatar] = useState('');
    const [getWhatsapp, setWhatsapp] = useState('');
    const [getBio, setBio] = useState('');

    const [getSubject, setSubject] = useState('');
    const [getCost, setCost] = useState('');

    const history = useHistory();

    function addNewScheduleItem() {

        setScheduleItems([ 
            ...getScheduleItems, 
            {
                week_day: '',
                from: '',
                to: ''
            }
        ]);
    }

    function handleScheduleItemValue(position: number, field: string, value: string){

        const updatedScheduleItems = getScheduleItems.map( (scheduleItem, index) => {

            if(index === position){
                return {
                    ...scheduleItem,
                    [field]: value
                }

            } else {
                return scheduleItem;
            }
        });

        setScheduleItems(updatedScheduleItems);
    }

    async function handleSubmit(event: FormEvent){

        event.preventDefault();

        try {

            await api.post('/classes', {
                name: getName,
                avatar: getAvatar,
                whatsapp: getWhatsapp,
                bio: getBio,
                subject: getSubject,
                cost: Number(getCost),
                schedule: getScheduleItems
            });

            alert('Cadastro realizado com sucesso');

            history.push('/');
            
        } catch (error) {
            console.log(error);
            alert('Erro ao enviar dados');
        }
    }

    return (
        <div id='page-teacher-form' className='container'>
            <PageHeader 
                title='Que incrível que você quer dar aulas' 
                description='O primeiro passo é preencher esse formulário de escrição'
            />

            <main>

                <form onSubmit={(event) => handleSubmit(event)}>
                    <fieldset>
                        <legend>Seus dados</legend>

                        <Input 
                            name='name' 
                            label='Nome completo' 
                            value={getName}
                            onChange={(event) => setName(event.target.value)}
                        />

                        <Input 
                            name='avatar' 
                            label='Avatar' 
                            value={getAvatar}
                            onChange={(event) => setAvatar(event.target.value)}
                        />

                        <Input 
                            name='whatsapp' 
                            label='Whatsapp' 
                            value={getWhatsapp}
                            onChange={(event) => setWhatsapp(event.target.value)}
                        />

                        <Textarea 
                            name='bio' 
                            label='Biografia' 
                            value={getBio}
                            onChange={(event) => setBio(event.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>Sobre a aula</legend>

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

                        <Input 
                            name='cost' 
                            label='Custo da sua hora por aula' 
                            value={getCost}
                            onChange={(event) => setCost(event.target.value)}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button 
                                type='button'
                                onClick={addNewScheduleItem}
                            >
                                + Novo Horário
                            </button>
                        </legend>

                        {getScheduleItems.map( (sheduleItem, index) => (
                            <div key={index} className="schedule-item">
                                <Select 
                                    name='week-day' 
                                    label='Dia da semana' 
                                    //value={sheduleItem.week_day}
                                    onChange={(event) => handleScheduleItemValue(index, 'week_day', event.target.value)}
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
                                    name='from' 
                                    label='Das' 
                                    type='time' 
                                    //value={sheduleItem.from}
                                    onChange={(event) => handleScheduleItemValue(index, 'from', event.target.value)}
                                />

                                <Input 
                                    name='to' 
                                    label='Até' 
                                    type='time' 
                                    //value={sheduleItem.to}
                                    onChange={(event) => handleScheduleItemValue(index, 'to', event.target.value)}
                                />
                            </div>
                        ))}
                        
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>

                        <button type='submit'>
                            Salva dados
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
}

export default TeacherForm;