/* @flow */
import React, { useState, useEffect } from 'react';
import {
    withTheme, Portal, Dialog, Button, Chip,
} from 'react-native-paper';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native';
import CalendarPeriod from './CalendarPeriod';

type Props = {
    open: boolean,
    onDone: Function,
    onClose: Function,
    onSelectDates: Function,
}

const DateSelectorPeriod = ({
    theme, open, onClose, onDone, onSelectDates,
}: Props) => {
    const periodNull = { initial: null, final: null };
    const ontem = { initial: moment().subtract(1, 'days'), final: moment().subtract(1, 'days') };
    const ultimos7dias = { initial: moment(), final: moment().subtract(7, 'days') };
    const ultimos30dias = { initial: moment(), final: moment().subtract(30, 'days') };

    const [period, setPeriod] = useState(ultimos7dias);
    const [visible, setVisible] = useState(open);

    useEffect(() => {
        setVisible(open);
    }, [open]);

    const close = () => {
        onClose(false);
        setVisible(false);
    };

    const done = () => {
        onDone();
        close();
    };

    const itemPeriod = (name, periodInterval) => {
        const isSelected = moment(period.initial).format('YYYY-MM-DD') === moment(periodInterval.final).format('YYYY-MM-DD')
            && moment(period.final).format('YYYY-MM-DD') === moment(periodInterval.initial).format('YYYY-MM-DD');

        return (
            <Chip
                mode="outlined"
                style={{ marginHorizontal: 2 }}
                selectedColor={theme.colors.text}
                selected={isSelected}
                onPress={() => {
                    if (isSelected) {
                        setPeriod(periodNull);
                        return;
                    }
                    setPeriod(periodInterval);
                }}
            >
                {name}
            </Chip>
        );
    };

    return (
        <Portal>
            <Dialog visible={visible} onDismiss={close}>
                <Dialog.Title>
                    {
                        period.initial !== null
                            ? (`De ${moment(period.initial).format('DD/MM/YY')} até ${moment(period.final).format('DD/MM/YY')}`)
                            : 'Filtro: intervalo de dias'
                    }
                </Dialog.Title>
                <Dialog.Content>
                    <ScrollView horizontal style={{ padding: 5 }}>
                        {itemPeriod('Ontem', ontem)}
                        {itemPeriod('Últ. 7 dias', ultimos7dias)}
                        {itemPeriod('Últ. 30 dias', ultimos30dias)}
                    </ScrollView>
                    <CalendarPeriod
                        initial={period.initial}
                        final={period.final}
                        onSelectDates={(dates) => setPeriod(dates)}
                    />
                </Dialog.Content>
                <Dialog.Actions>
                    <Button color={theme.colors.text} onPress={close}>
                        Cancelar
                    </Button>
                    <Button color={theme.colors.text} onPress={done}>
                        Selecionar
                    </Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    );
};

DateSelectorPeriod.defaultProps = {
    open: false,
    onDone: () => {},
    onClose: () => {},
    onSelectDates: () => {},
};

export default withTheme(DateSelectorPeriod);
