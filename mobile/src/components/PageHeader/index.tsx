import React, { PropsWithChildren } from 'react';
import { View, Image, Text } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import backIcon from '../../assets/images/icons/back.png';
import logoImg from '../../assets/images/logo.png';

interface IPageHeaderProps {
    title: string;
}

const PageHeader: React.FC<IPageHeaderProps> = ({ title, children }: PropsWithChildren<IPageHeaderProps>) => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.topBar}>
                <BorderlessButton
                    onPress={() => navigation.navigate('Landing')}
                >
                    <Image source={backIcon} resizeMode='contain' />
                </BorderlessButton>

                <Image source={logoImg} resizeMode='contain' />
            </View>

            <Text style={styles.title}>
                {title}
            </Text>

            {children}
        </View>
    );
}

export default PageHeader;
