import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

import styles from './styles';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

const TeacherList: React.FC = () => {

    const [getFiltersEnabled, setFiltersEnabled] = useState(true);
    
    const [getSubject, setSubject] = useState('');
    const [getWeekDay, setWeekDay] = useState('');
    const [getTime, setTime] = useState('');

    return (
        <View style={styles.container}>
            <PageHeader title='Proffys disponíveis'>

                {getFiltersEnabled && (
                    <View style={styles.searchForm}>
                        <Text style={styles.label}>Matéria</Text>
                        {/*<TextInput
                            style={styles.input}
                            placeholder='Qual a matéria?'
                            placeholderTextColor='#c1bccc' 
                        />*/}

                        <RNPickerSelect
                            useNativeAndroidPickerStyle={false}
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
                            onValueChange={(value) => setSubject(value)}
                        />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Dia da semana</Text>
                                {/*<TextInput
                                    style={styles.input}
                                    placeholder='Qual o dia?'
                                    placeholderTextColor='#c1bccc' 
                                />*/}
                            </View>

                            <View style={styles.inputBlock}>
                                <Text style={styles.label}>Horário</Text>
                                {/*<TextInput
                                    style={styles.input}
                                    placeholder='Qual horário?'
                                    placeholderTextColor='#c1bccc' 
                                />*/}
                            </View>
                        </View>
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

                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />

            </ScrollView>

        </View>
    );
}

export default TeacherList;
