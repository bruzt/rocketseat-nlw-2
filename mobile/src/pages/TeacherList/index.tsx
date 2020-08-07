import React, { useState } from 'react';
import { View, Text, ScrollView, Platform, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker, { Event } from '@react-native-community/datetimepicker';
import { FontAwesome5, Feather } from '@expo/vector-icons'
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

export interface ITeacher {
    id: number;
    subject: string;
    cost: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
}

const TeacherList: React.FC = () => {

    const [getShowFilters, setShowFilters] = useState(true);
    const [getShowTimePicker, setShowTimePicker] = useState(false);

    const [getSubject, setSubject] = useState('');
    const [getWeekDay, setWeekDay] = useState('');
    const [getTime, setTime] = useState<Date>(new Date(20, 1));

    const [getTeachers, setTeachers] = useState<ITeacher[]>([]);

    function onChangeTime(event: Event, selectedDate?: Date){

        const time = selectedDate || getTime;
        setShowTimePicker(Platform.OS === 'ios');
        setTime(time);
    }

    async function handleFilterSubmit(){

        if(getSubject.length == 0 || getWeekDay.length == 0) return;

        try {

            const response = await api.get('/classes', {
                params: {
                    week_day: getWeekDay,
                    subject: getSubject,
                    time: `${(getTime.getHours() < 10) ? '0' + getTime.getHours() : getTime.getHours()}:${(getTime.getMinutes() < 10) ? '0' + getTime.getMinutes() : getTime.getMinutes()}`
                }
            });

            setShowFilters(false);
            setTeachers(response.data);
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao buscar professores');
        }
    }

    return (
        <View style={styles.container}>
            <PageHeader 
                title='Proffys disponíveis'
                headerRight={(
                    <BorderlessButton onPress={() => setShowFilters(!getShowFilters)}>
                        <Feather name='filter' size={20} color='#fff' />
                    </BorderlessButton>
                )}
            >

                {getShowFilters && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>

                        <RNPickerSelect
                            style={{ 
                                inputAndroid: { color: '#d4c2ff' },
                                inputIOS: { color: '#d4c2ff' },
                            }}
                            placeholder={{ label: 'Selecione a matéria', value: '' }}
                            items={[
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
                                { value: 'Química', label: 'Química' }
                            ]}
                            value={getSubject}
                            onValueChange={(value) => setSubject(value)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>

                                <RNPickerSelect
                                    style={{ 
                                        inputAndroid: { color: '#d4c2ff' },
                                        inputIOS: { color: '#d4c2ff' }
                                    }}
                                    placeholder={{ label: 'Selecione o dia da semana', value: '' }}
                                    items={[
                                        { value: '0', label: 'Domingo' },
                                        { value: '1', label: 'Segunda-feira' },
                                        { value: '2', label: 'Terça-feira' },
                                        { value: '3', label: 'Quarta-feira' },
                                        { value: '4', label: 'Quinta-feira' },
                                        { value: '5', label: 'Sexta-feira' },
                                        { value: '6', label: 'Sábado' },
                                    ]}
                                    value={getWeekDay}
                                    onValueChange={(value) => setWeekDay(value)}
                                />
                                
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                <RectButton 
                                    style={styles.input}
                                    onPress={() => setShowTimePicker(true)}
                                >
                                    <Text style={styles.inputText}>
                                        {`${(getTime.getHours() < 10) ? '0' + getTime.getHours() : getTime.getHours()}:${(getTime.getMinutes() < 10) ? '0' + getTime.getMinutes() : getTime.getMinutes()}`}
                                    </Text>
                                    <FontAwesome5 name='caret-down' color='#353839' size={16} />
                                </RectButton>

                                {getShowTimePicker && (
                                    <DateTimePicker
                                        value={getTime}
                                        mode='time'
                                        is24Hour={true}
                                        display="default"
                                        onChange={onChangeTime}
                                    />
                                )}

                            </View>
                        </View>

                        <RectButton 
                            style={styles.submitButton}
                            onPress={() => handleFilterSubmit()}
                        >
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}

            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {getTeachers.map( (teacher) => (
                    <TeacherItem 
                        key={teacher.id} 
                        data={teacher} 
                    />
                ))}

            </ScrollView>

        </View>
    );
}

export default TeacherList;
