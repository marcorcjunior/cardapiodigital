/* @flow */

import React from 'react';
import { AsyncStorage } from 'react-native';

const setItem = async (chave: string, objeto: any): boolean => {
    try {
        await AsyncStorage.setItem(chave, JSON.stringify(objeto));
        return true;
    } catch (error) {
        // Error saving data
        return false;
    }
};

const getItem = async (chave: string): Object => {
    try {
        const value = await AsyncStorage.getItem(chave);
        if (value !== null) {
            return JSON.parse(value);
        }
    } catch (error) {
        // Error retrieving data
        return null;
    }
};

const deleteItem = async (chave: string) => {
    try {
        await AsyncStorage.removeItem(chave);
        return true;
    } catch (error) {
        return false;
    }
};

const deleteAll = async () => {
    try {
        await AsyncStorage.clear();
        return true;
    } catch (error) {
        return false;
    }
};

const localStorage = {
    setItem,
    getItem,
    deleteItem,
    deleteAll,
};

export default localStorage;
