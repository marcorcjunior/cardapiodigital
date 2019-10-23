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
import api from "../../utils/api";
import { usePedidoId } from "../../../Provider";

const ItemProdutoPedido = ({ theme, item, index }) => {
  const [pedidoId] = usePedidoId();
  return (
    <Card style={{ flex: 1, marginHorizontal: 5 }}>
      <Card.Title
        title={item.nome}
        subtitle={item.descricao}
        right={props => (
          <Title style={{ marginHorizontal: 15 }}>
            <Money>{item.quantidade * item.preco}</Money>
          </Title>
        )}
      />
      <Card.Actions>
        <View style={{ flexDirection: "row" }}>
          <IconButton
            icon={item.quantidade === 1 ? "delete" : "remove"}
            size={27}
            color={theme.colors.erro}
            onPress={() => {
              if (item.quantidade > 1) {
                api.updateProdutoListaPedido(pedidoId, index, {
                  ...item,
                  quantidade: item.quantidade - 1
                });
              } else {
                api.removeProdutoListaPedido(pedidoId, index);
              }
            }}
          />
          <View style={{ marginTop: 5 }}>
            <Title>{item.quantidade || 1}</Title>
          </View>
          <IconButton
            icon="add"
            size={27}
            color={theme.colors.sucesso}
            onPress={() => {
              if (item.quantidade <= 30) {
                api.updateProdutoListaPedido(pedidoId, index, {
                  ...item,
                  quantidade: item.quantidade + 1
                });
              }
            }}
          />
        </View>
      </Card.Actions>
    </Card>
  );
};

ItemProdutoPedido.defaultProps = {};

export default withTheme(ItemProdutoPedido);
