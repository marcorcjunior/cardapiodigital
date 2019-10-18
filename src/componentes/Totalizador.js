/* @flow */

import React, { type Node } from 'react';
import {
    IconButton, Title, Headline, withTheme,
} from 'react-native-paper';
import { View } from 'react-native';
import Container from './Container';

type Props = {
    titulo: string,
    valor: Node,
    cor?: any,
    icone?: any,
    children?: ?Node,
    style?: Object,
    theme: Object,
};

const Totalizador = ({
    theme, titulo, valor, cor, icone, children, style,
}: Props) => (
    <View style={{ ...style }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            { icone && <IconButton icon={icone} color={cor} size={20} /> }
            <Title style={{ fontWeight: 'bold', color: cor || theme.colors.text }}>
                {titulo}
            </Title>
            <Container />
            <Headline style={{ marginRight: 8 }}>
                {valor}
            </Headline>
        </View>
        {children}
    </View>
);

Totalizador.defaultProps = {
    cor: null,
    icone: null,
    children: null,
    style: {},
};

export default withTheme(Totalizador);
