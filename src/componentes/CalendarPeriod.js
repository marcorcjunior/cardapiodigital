/* @flow */
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { withTheme, IconButton } from 'react-native-paper';
import Calendario from './Calendario';
import { getArrayOfDatesPeriod } from '../utils/constantes';


type Props = {
    initial: string,
    final: string,
    onSelectDates: ({ initial: string, final: string }) => void,
    theme: Object,
}

type DatesState = [string, ?string];

const getDatesStateInOrder = ([initial, final]: DatesState) => {
    if (!initial) {
        return [];
    }
    if (!final) {
        return [initial];
    }
    if (moment(initial).unix() > moment(final).unix()) {
        return [final, initial];
    }
    return [initial, final];
};

const CalendarPeriod = ({
    initial: defaultInitial,
    final: defaultFinal,
    onSelectDates,
    theme,
}: Props) => {
    const [dates, setDates] = useState<DatesState>([defaultInitial, defaultFinal]);
    const [initial, final] = getDatesStateInOrder(dates);

    useEffect(() => {
        if (initial && final) {
            onSelectDates({ initial, final });
        }
    }, [initial, final]);

    useEffect(() => {
        setDates([defaultInitial, defaultFinal]);
    }, [defaultInitial, defaultFinal]);


    const addTheme = {
        color: theme.colors.primary,
        textColor: 'white',
    };

    const getMarkedDates = () => {
        if (!initial) {
            return {};
        }

        const arrayOfDatesPeriod = getArrayOfDatesPeriod(moment(initial), moment(final || initial));
        const markedDates = {};
        arrayOfDatesPeriod.forEach((date, index) => {
            markedDates[date] = {
                startingDay: index === 0,
                endingDay: index === arrayOfDatesPeriod.length - 1,
                ...addTheme,
            };
        });

        return markedDates;
    };

    return (
        <Calendario
            current={moment(initial).format('YYYY-MM-DD')}
            markedDates={getMarkedDates()}
            markingType="period"
            onDayPress={({ dateString }) => {
                setDates(!initial || final ? [dateString, null] : [initial, dateString]);
            }}
        />
    );
};

export default withTheme(CalendarPeriod);
