import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

const TeacherItem: React.FC = () => {

    return (
        <View style={styles.container}>
            <View style={styles.profile}>

                <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/12144828?s=460&u=c6f46aa919cc4b69ffc4bdc583905fa279930a95&v=4' }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        Jão da Silva
                    </Text>
                    <Text style={styles.subject}>
                        Ciências
                    </Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Teste de bio
                {'\n'}{'\n'}
                vamos lá
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>
                        R$ 50,00
                    </Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton
                        style={[styles.favoriteButton, styles.favorited]}
                        onPress={() => {}}
                    >
                        {/* <Image source={heartOutlineIcon} /> */}
                        <Image source={unfavoriteIcon} />
                    </RectButton>

                    <RectButton
                        style={styles.contactButton}
                        onPress={() => {}}
                    >
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>
                            Entrar em contato
                        </Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;
