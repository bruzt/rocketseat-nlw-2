import React, { useEffect, useState } from 'react';
import { View, Image, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
 
import styles from './styles';
import api from '../../services/api';

import landingImg from '../../assets/images/landing.png';
import studyIcon from '../../assets/images/icons/study.png';
import giveClassesIcon from '../../assets/images/icons/give-classes.png';
import heartIcon from '../../assets/images/icons/heart.png';

const Landing: React.FC = () => {

    const [getTotalConnections, setTotalConnections] = useState<number>(0);

    const navigation = useNavigation();

    useEffect( () => {

        fetchTotalConnections();

    }, []);

    async function fetchTotalConnections(){

        try {

            const response = await api.get('/connections');

            setTotalConnections(response.data.total);
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao buscar total de conexões');
        }
    }

    return (
        <View style={styles.container}>
            <Image source={landingImg} style={styles.banner} />
            
            <Text style={styles.title}>
                Seja bem-vindo, {'\n'}
                <Text style={styles.titleBold}>
                    O que deseja fazer?
                </Text>
            </Text>

            <View style={styles.buttonsContainer}>
                <RectButton 
                    style={[styles.button, styles.buttonPrimary]}
                    onPress={() => navigation.navigate('Study')}
                >
                    <Image source={studyIcon} />
                    <Text style={styles.buttonText}>Estudar</Text>
                </RectButton>

                <RectButton 
                    style={[styles.button, styles.buttonSecondary]}
                    onPress={() => navigation.navigate('GiveClasses')}
                >
                    <Image source={giveClassesIcon} />
                    <Text style={styles.buttonText}>Dar Aulas</Text>
                </RectButton>
            </View>

            <Text style={styles.totalConnections}>
                Total de {getTotalConnections} conexões já realizadas. {' '}
                <Image source={heartIcon} />
            </Text>
        </View>
    );
}

export default Landing;