/* @flow */
import { DarkTheme, DefaultTheme } from 'react-native-paper';
import { Actions } from 'react-native-router-flux';

const coresDefault = {
    info: '#0277BD',
    infoDark: '#004c8c',
    alerta: '#ffb824',
    alertaDark: '#c78800',
    sucesso: '#00838F',
    sucessoDark: '#005662',
    erro: '#f4526d',
    erroDark: '#bc1242',
};

export const coresDefaultRGBA = {
    info: 'rgba(2,119,189, 0.3)',
    alerta: 'rgba(255,184,36, 0.3)',
    sucesso: 'rgba(0,131,143, 0.3)',
    erro: 'rgba(244,82,109, 0.3)',
};

export const themeLigh = {
    ...DefaultTheme,
    roundness: 4,
    colors: {
        ...DefaultTheme.colors,
        primary: '#795548',
        secondary: '#4b2c20',
        accent: '#bf360c',
        ...coresDefault,
    },
};

export const themeDark = {
    ...DarkTheme,
    roundness: 4,
    colors: {
        ...DarkTheme.colors,
        primary: '#4b2c20',
        secondary: '#795548',
        accent: '#870000',
        ...coresDefault,
    },
};

export const theme = Actions.dark ? themeDark : themeLigh;

export const colorsArray = Object.values({
    primary: '#00838e',
    accent: '#5867dd',
    ...coresDefault,
    primaryDark: '#005661',
    accentDarck: '#0e3daa',
    ...coresDefault,
});
