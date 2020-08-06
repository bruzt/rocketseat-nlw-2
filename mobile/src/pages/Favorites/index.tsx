import React from 'react';
import { View, Text } from 'react-native';

import styles from './styles';

import PageHeader from '../../components/PageHeader';

const Favorites: React.FC = () => {

    return (
        <View style={styles.container}>
            <PageHeader title='Meus proffys favoritos' />

            <Text>teste 2</Text>
        </View>
    );
}

export default Favorites;
