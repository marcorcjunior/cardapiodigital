/* @flow */

import React, { useState, useEffect } from "react";
import { ScrollView } from "react-native";
import {
  withTheme,
  Card,
  Paragraph,
  Button,
  Title,
  Caption,
  List,
  Chip,
  DataTable
} from "react-native-paper";
import moment from "moment";

import api from "../../utils/api";
import { usePedidoId } from "../../../Provider";
import Money from "../../componentes/Money";
import FlatListData from "../../componentes/FlatListData";

const ItemPedido = ({ theme, item }) => {
  const [pedidoId] = usePedidoId();
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (item.produtos.length) {
      setData(item.produtos);
    }
  }, [item]);

  return (
    <Card style={{ flex: 1, marginHorizontal: 15 }}>
      <Card.Title
        title={moment(item.data).format("DD MMMM YYYY HH:mm")}
        subtitle={`Pedido #${item.id}`}
        right={props => (
          <Chip
            mode="outlined"
            selectedColor={theme.colors.primary}
            style={{ marginHorizontal: 16 }}
          >
            {item.status}
          </Chip>
        )}
      />
      <Card.Content>
        <DataTable>
          <ScrollView style={{ height: 128 }}>
            <DataTable.Header>
              <DataTable.Title>Produto</DataTable.Title>
              <DataTable.Title numeric>Qtd.</DataTable.Title>
              <DataTable.Title numeric>Valor</DataTable.Title>
            </DataTable.Header>
            {data.map(produto => (
              <DataTable.Row>
                <DataTable.Cell>{produto.nome}</DataTable.Cell>
                <DataTable.Cell numeric> x{produto.quantidade}</DataTable.Cell>
                <DataTable.Cell numeric>
                  <Money>{produto.preco}</Money>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
          </ScrollView>
          <DataTable.Row>
            <DataTable.Cell>Total</DataTable.Cell>
            <DataTable.Cell numeric></DataTable.Cell>
            <DataTable.Cell numeric>
              <Money>{item.valor}</Money>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </Card.Content>
      {/* <Card.Actions>
        <Button onPress={() => {}}>Ver detalhes</Button>
      </Card.Actions> */}
    </Card>
  );
};

ItemPedido.defaultProps = {};

export default withTheme(ItemPedido);
