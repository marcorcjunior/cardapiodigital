/* @flow */
import React from 'react';
import { withTheme } from 'react-native-paper';
import { View, ActivityIndicator } from 'react-native';


const Loading = ({ theme }) => {
    const oi = '';
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }} />
            <ActivityIndicator animating size="large" color={theme.colors.accent} />
            <View style={{ flex: 1 }} />
        </View>
    );
};

export default withTheme(Loading);
