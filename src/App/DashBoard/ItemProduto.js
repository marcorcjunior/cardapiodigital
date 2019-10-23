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
import api from "../../utils/api";
import { usePedidoId } from "../../../Provider";

const ItemProduto = ({ theme, item }) => {
  const [pedidoId] = usePedidoId();

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
        <Paragraph numberOfLines={3}>{item.descricao}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Button
          onPress={() => {
            api.addProdutoListaPedido(pedidoId, { ...item, quantidade: 1 });
          }}
        >
          Adicionar
        </Button>
      </Card.Actions>
    </Card>
  );
};

ItemProduto.defaultProps = {};

export default withTheme(ItemProduto);
