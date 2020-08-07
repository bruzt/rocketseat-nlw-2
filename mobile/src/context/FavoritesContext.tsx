import React, { createContext, useContext, useState, PropsWithChildren, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';

import { ITeacher } from '../pages/TeacherList';

interface IFavoriteProvider {
    toggleFavorited: (teacher: ITeacher) => void;
    isFavorited: (teacher: ITeacher) => boolean;
    getFavorites: ITeacher[];
}

const Context = createContext({});

export const FavoritesContextProvider: React.FC = ({ children }: PropsWithChildren<unknown>) => {

    const [getFavorites, setFavorites] = useState<ITeacher[]>([]);

    useEffect( () => {

        findFavorites();

    }, []);

    async function findFavorites(){

        try {
            
            const favorites = await AsyncStorage.getItem('favorites');
            let favoritesArray = [];
            if(favorites) favoritesArray = JSON.parse(favorites);

            setFavorites(favoritesArray);

        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro ao buscar favoritos');
        }
    }

    function isFavorited(teacher: ITeacher){

        const favorited = getFavorites.filter( (element) => element.id === teacher.id);

        return favorited.length > 0;
    }

    async function toggleFavorited(teacher: ITeacher){

        try {

            const favorited = isFavorited(teacher);

            if(favorited){

                const newFavorites = getFavorites.filter( (element: ITeacher) => element.id !== teacher.id);

                await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));

                setFavorites(newFavorites);

            } else {

                const favoritesArray = [ ...getFavorites, teacher ];

                await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));

                setFavorites(favoritesArray);
            }
        
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Erro nos favoritos');
        }
    }

    return (
        <Context.Provider value={{ 
            isFavorited,
            toggleFavorited,
            getFavorites, 
        }}>
            {children}
        </Context.Provider>
    );
}

export function useFavorites(){

    const context = useContext(Context) as IFavoriteProvider;

    return context;
}