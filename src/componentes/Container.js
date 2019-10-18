/* @flow */

import React, { type Node } from 'react';
import { View } from 'react-native';

type Props = {
    children?: ?Node,
    style?: Object,
};

const Container = ({ style, ...props }: Props) => (
    <View {...props} style={{ ...style, flex: 1 }} />
);

Container.defaultProps = {
    children: null,
    style: {},
};

export default Container;
