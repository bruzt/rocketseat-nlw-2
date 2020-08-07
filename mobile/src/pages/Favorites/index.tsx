import React from 'react';
import { View, ScrollView } from 'react-native';

import styles from './styles';

import { useFavorites } from '../../context/FavoritesContext';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';

const Favorites: React.FC = () => {

    const favoriteContext = useFavorites();

    return (
        <View style={styles.container}>
            <PageHeader title='Meus proffys favoritos' />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >

                {favoriteContext.getFavorites.map((favorite) => (
                    <TeacherItem
                        key={favorite.id}
                        data={favorite}
                    />
                ))}

            </ScrollView>
        </View>
    );
}

export default Favorites;
