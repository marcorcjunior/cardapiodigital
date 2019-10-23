import React, { useState, useEffect } from "react";
// import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View } from "react-native";
import { withTheme, Title, Headline, Button } from "react-native-paper";

import FlatListData from "../../componentes/FlatListData";
import Container from "../../componentes/Container";
import DateSelector from "../../componentes/DateSelector";

import Layout from "../../componentes/Layout";
import api from "../../utils/api";
import ItemProduto from "./ItemProduto";
import ItemProdutoPedido from "./ItemProdutoPedido";
import { usePedidoId } from "../../../Provider";

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderRadius: 16,
    margin: 16
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 4
  }
});

const DashBoard = ({ theme }) => {
  const [pedidoId] = usePedidoId();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    console.warn("pedidoId", pedidoId);
    api.getListProdutos().then(setData);
    // api.getListProdutosPedido(pedidoId).then(setCarrinho);
    setLoading(false);
  }, [loading]);

  // useEffect(() => {
  //   const documentSnapshot = firestore()
  //     .collection('users')
  //     .doc('alovelace')
  //     .get();

  //   console.log('User data', documentSnapshot.data());
  // }, []);

  return (
    <Layout
      actionSearch
      title="Cardapio"
      subtitle="Lista de produtos disponiveis."
    >
      <Container style={{ flexDirection: "row", marginVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <FlatListData
            numColumns={2}
            data={data}
            loading={loading}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemProduto item={item} />}
            onRefresh={() => {
              setLoading(true);
            }}
            onLoadMore={() => {}}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <View styel={{ marginHorizontal: 10 }}>
            <Headline>Itens do carrinho</Headline>
          </View>
          <FlatListData
            numColumns={1}
            data={carrinho}
            loading={loading}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ItemProdutoPedido item={item} />}
            onRefresh={() => {
              setLoading(true);
            }}
            onLoadMore={() => {}}
          />
          <Button mode="outlined" style={{ marginRight: 22 }}>
            Enviar pedido
          </Button>
        </View>
      </Container>
    </Layout>
  );
};

export default withTheme(DashBoard);
