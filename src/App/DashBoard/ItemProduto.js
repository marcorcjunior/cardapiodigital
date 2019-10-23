/* @flow */

import React from "react";
import {
  withTheme,
  Card,
  Paragraph,
  Button,
  Title,
  Caption
} from "react-native-paper";

import Money from "../../componentes/Money";

const ItemProduto = ({ theme, item }) => {
  const oi = "oie";
  return (
    <Card style={{ flex: 1, marginHorizontal: 15 }}>
      <Card.Cover
        resizeMode="center"
        source={{ uri: item.image }}
        style={{ resizeMode: "center" }}
      />
      <Card.Title
        title={item.nome}
        right={props => (
          <Title style={{ marginHorizontal: 15 }}>
            <Money>{item.preco}</Money>
          </Title>
        )}
      />
      <Card.Content>
        <Caption numberOfLines={3}>{item.descricao}</Caption>
      </Card.Content>
      <Card.Actions>
        <Button>Adicionar</Button>
      </Card.Actions>
    </Card>
  );
};

ItemProduto.defaultProps = {};

export default withTheme(ItemProduto);
