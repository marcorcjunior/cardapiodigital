/* @flow */

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { withTheme, Appbar, Title, Text, Card } from "react-native-paper";
import { TabView } from "react-native-tab-view";

import api from "../../utils/api";
import Layout from "../../componentes/Layout";
import Container from "../../componentes/Container";
import Loading from "../../componentes/Loading";
import FlatListData from "../../componentes/FlatListData";
import ItemPedido from "./ItemPedido";

const Pedido = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    // console.warn("pedidoId", pedidoId);
    //   api.getListProdutos().then(setData);
    api.getListPedido(1, setData);
    setLoading(false);
  }, [loading]);

  return (
    <Layout title="Pedidos" subtitle="Lista dos pedidos efetuados">
      <FlatListData
        notImpar
        divider={false}
        numColumns={2}
        data={data}
        loading={loading}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          if (item.id !== null) {
            return <ItemPedido item={item} />;
          }
          return <Container style={{ marginHorizontal: 15 }} />;
        }}
        onRefresh={() => {
          setLoading(true);
        }}
        onLoadMore={() => {}}
      />
    </Layout>
  );
};

export default withTheme(Pedido);
