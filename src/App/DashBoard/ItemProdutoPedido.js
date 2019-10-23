/* @flow */

import React from "react";
import {
  withTheme,
  Card,
  Paragraph,
  Button,
  Title,
  IconButton,
  Headline
} from "react-native-paper";

import Money from "../../componentes/Money";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";

const ItemProdutoPedido = ({ theme, item }) => {
  const oi = "oie";
  return (
    <Card style={{ flex: 1, marginHorizontal: 5 }}>
      <Card.Title
        title={item.nome}
        subtitle={item.descricao}
        right={props => (
          <Title style={{ marginHorizontal: 15 }}>
            <Money>{item.preco}</Money>
          </Title>
        )}
      />
      <Card.Actions>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon="remove"
            size={20}
            color="white"
            style={{ backgroundColor: theme.colors.erro, borderRadius: 20 }}
          />
          <View style={{ marginTop: 5 }}>
            <Title>1</Title>
          </View>
          <IconButton
            icon="add"
            size={20}
            color="white"
            style={{ backgroundColor: theme.colors.sucesso, borderRadius: 20 }}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

ItemProdutoPedido.defaultProps = {};

export default withTheme(ItemProdutoPedido);
