import React from 'react';
import { View, Image, Text, Linking, Alert } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import styles from './styles';
import api from '../../services/api';

import { useFavorites } from '../../context/FavoritesContext';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import { ITeacher } from '../../pages/TeacherList';

interface ITeacherItemProps {
    data: ITeacher;
}

const TeacherItem: React.FC<ITeacherItemProps> = ({ data }: ITeacherItemProps) => {

    const favoriteContext = useFavorites();
    
    async function handleLinkToWhatsapp(){

        try {

            await Linking.openURL(`whatsapp://send?phone=${data.whatsapp}`);

            await api.post('/connections', {
                user_id: data.id
            });
            
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao abrir Whatsapp');
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.profile}>

                <Image style={styles.avatar} source={{ uri: data.avatar }} />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>
                        {data.name}
                    </Text>
                    <Text style={styles.subject}>
                        {data.subject}
                    </Text>
                </View>
            </View>

            <Text style={styles.bio}>
                {data.bio}
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/Hora {'   '}
                    <Text style={styles.priceValue}>
                        R$ {data.cost.toFixed(2)}
                    </Text>
                </Text>
                
                <View style={styles.buttonsContainer}>
                    <RectButton
                        style={[styles.favoriteButton, (favoriteContext.isFavorited(data)) ? styles.favorited : null]}
                        onPress={() => favoriteContext.toggleFavorited(data)}
                    >
                        {(favoriteContext.isFavorited(data)) 
                            ? <Image source={unfavoriteIcon} />
                            : <Image source={heartOutlineIcon} />
                        }
                        
                    </RectButton>

                    <RectButton
                        style={styles.contactButton}
                        onPress={() => handleLinkToWhatsapp()}
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
