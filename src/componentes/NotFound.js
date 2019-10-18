/* @flow */
import React, { type Node } from 'react';
import { withTheme, Title, Paragraph } from 'react-native-paper';
import { View, Image, Dimensions } from 'react-native';

import notfound from '../../images/notfound.png';

const { width, height } = Dimensions.get('window');

type Props = {
  title?: Node,
  subtitle?: Node,
  children?: Node,
  theme: Object,
};

const NotFound = ({ theme, title, subtitle, children }: Props) => (
  <View
    style={{
      flex: 1,
      backgroundColor: theme.colors.background,
      alignItems: 'center',
    }}
  >
    <View style={{ flex: 1 }} />
    <Image
      source={notfound}
      resizeMode="contain"
      style={{ width, height: height / 3 }}
    />
    <Title>{title}</Title>
    <Paragraph>{subtitle}</Paragraph>
    {children}
    <View style={{ flex: 1 }} />
  </View>
);

NotFound.defaultProps = {
  title: 'Dados não encontrados.',
  subtitle: 'Desculpe o inconveniente!',
  children: null,
};

export default withTheme(NotFound);
