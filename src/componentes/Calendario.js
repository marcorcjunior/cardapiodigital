/* @flow */
import React from 'react';
import { withTheme, IconButton } from 'react-native-paper';
import { LocaleConfig, Calendar } from 'react-native-calendars';

type Props = {
    theme: Object,
    themeCalendar: Object,
    onPressBack: Function,
    onPressNext: Function,
}

const Calendario = ({
    theme, themeCalendar, onPressBack, onPressNext, ...props
}: Props) => {
    LocaleConfig.locales.br = {
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan.', 'Fev.', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul.', 'Ago', 'Set.', 'Out.', 'Nov.', 'Dez.'],
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Quar', 'Quin', 'Sex', 'Sáb'],
    };

    LocaleConfig.defaultLocale = 'br';

    return (
        <Calendar
            {...props}
            firstDay={1}
            monthFormat="MMMM yyyy"
            renderArrow={(direction) => (
                <IconButton
                    size={18}
                    color={theme.colors.text}
                    icon={direction === 'left' ? 'arrow-back' : 'arrow-forward'}
                />
            )}
            onPressArrowLeft={(substractMonth) => {
                substractMonth();
                onPressBack();
            }}
            onPressArrowRight={(addMonth) => {
                addMonth();
                onPressNext();
            }}
            theme={{
                ...themeCalendar,
                backgroundColor: theme.colors.background,
                calendarBackground: theme.colors.surface,
                selectedDayTextColor: '#000',
                textSectionTitleColor: '#b6c1cd',
                todayTextColor: theme.colors.text,
                dayTextColor: theme.colors.text,
                textDisabledColor: '#d9e1e8',
                monthTextColor: theme.colors.text,
                indicatorColor: theme.colors.text,
            }}
        />
    );
};

Calendario.defaultProps = {
    themeCalendar: {},
    onPressBack: () => {},
    onPressNext: () => {},
};

export default withTheme(Calendario);
