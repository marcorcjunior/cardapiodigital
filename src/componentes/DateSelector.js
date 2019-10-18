/* @flow */
import React, { useState } from 'react';

import moment from 'moment';
import 'moment/locale/pt-br';

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
  data: Date,
  dataFormat: string;
  disabledButtons: boolean,
  onPressBack: Function,
  onPressNext: Function,
  style: object,
};


const DateSelector = ({
    theme, data, dataFormat, style, disabledButtons, onPressBack, onPressNext,
}) => {
    const [dataLocal, setDataLocal] = useState(data);

    const onPressLocalBack = async () => {
        const newDate = moment(dataLocal).subtract(1, 'month');
        setDataLocal(newDate);
        if (typeof onPressBack === 'function') {
            onPressBack(newDate);
        }
    };

    const onPressLocalNext = async () => {
        const newDate = moment(dataLocal).add(1, 'month');
        setDataLocal(newDate);
        if (typeof onPressNext === 'function') {
            onPressNext(newDate);
        }
    };

    return (
        <Surface style={[styles.containerButtons, style, { elevation: 1, backgroundColor: theme.colors.surface }]}>
            <IconButton disabled={disabledButtons} icon="arrow-back" color={theme.colors.text} size={20} onPress={onPressLocalBack} />
            <Text style={[styles.text, { color: theme.colors.text }]}>
                {ucfirst(moment(dataLocal).format(dataFormat))}
            </Text>
            <IconButton disabled={disabledButtons} icon="arrow-forward" color={theme.colors.text} size={20} onPress={onPressLocalNext} />
        </Surface>
    );
};

DateSelector.defaultProps = {
    data: moment().format(),
    dataFormat: 'MMMM YYYY',
    disabledButtons: false,
};

export default withTheme(DateSelector);
