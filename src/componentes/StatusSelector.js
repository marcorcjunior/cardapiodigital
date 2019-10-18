/* @flow */
import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
} from 'react-native';

import {
    IconButton,
    Surface,
    withTheme,
} from 'react-native-paper';

import { ucfirst } from '../utils/funcoesAuxiliares';

const styles = StyleSheet.create({
    containerButtons: {
        flexDirection: 'row',
        borderRadius: 25,
        marginBottom: 15,
    },
    text: {
        flex: 1,
        padding: 13,
        fontSize: 18,
        textAlign: 'center',
        textAlignVertical: 'center',
    },
});

type Props = {
    theme: any,
    status: Array<String>,
    disabledButtons: boolean,
    onPressBack: Function,
    onPressNext: Function,
    style: Object,
};

const StatusSelector = ({
    theme,
    status,
    style,
    disabledButtons,
    onPressBack,
    onPressNext,
}): Props => {
    const [posicao, setPosicao] = useState(0);
    const onBack = async () => {
        setPosicao(posicao + 1);
        if (typeof onPressBack === 'function') {
            onPressBack(posicao);
        }
    };

    const onNext = async () => {
        setPosicao(posicao - 1);
        if (typeof onPressNext === 'function') {
            onPressNext(posicao);
        }
    };

    return (
        <Surface style={[styles.containerButtons, style, { elevation: 1, backgroundColor: theme.colors.surface }]}>
            <IconButton disabled={disabledButtons} icon="arrow-back" color={theme.colors.text} size={20} onPress={onBack} />
            <Text style={[styles.text, { color: theme.colors.text }]}>
                {ucfirst(status[posicao])}
            </Text>
            <IconButton disabled={disabledButtons} icon="arrow-forward" color={theme.colors.text} size={20} onPress={onNext} />
        </Surface>
    );
};

StatusSelector.defaultProps = {
    disabledButtons: false,
};

export default withTheme(StatusSelector);
