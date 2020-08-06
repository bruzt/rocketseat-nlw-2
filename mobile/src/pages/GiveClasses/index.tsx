import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import giveClassesBgImg from '../../assets/images/give-classes-background.png';

const GiveClasses: React.FC = () => {

    const { goBack } = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={giveClassesBgImg}
                style={styles.content}
                resizeMode='contain'
            >

                <View>
                    <Text style={styles.title}>
                        Quer ser um Proffy?
                    </Text>
                    <Text style={styles.description}>
                        Para começar, você precisa se cadastrar como professor na nossa plataforma web.
                    </Text>
                </View>

                <RectButton
                    style={styles.okButton}
                    onPress={() => goBack()}
                >
                    <Text style={styles.okButtonText}>
                        Tudo bem
                    </Text>
                </RectButton>

            </ImageBackground>
        </View>
    );
}

export default GiveClasses;
