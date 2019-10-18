/* eslint-disable react/jsx-props-no-spreading */
/* @flow */
import React, { type Node } from 'react';
import { Text } from 'react-native-paper';
import AnimateNumber from 'react-native-animate-number';
import { dinheiro } from '../utils/formatarDinheiro';

type Props = {
    animated?: boolean,
    children: Node,
}

const Money = ({ animated, children }: Props) => (
    animated
        ? <AnimateNumber value={children} formatter={dinheiro} />
        : <Text>{dinheiro(children)}</Text>
);

Money.defaultProps = {
    animated: true,
};

export default Money;
