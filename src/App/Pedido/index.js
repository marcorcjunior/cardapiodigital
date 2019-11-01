/* @flow */

import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { withTheme, Appbar, Title, Text, Card } from "react-native-paper";
import { TabView } from "react-native-tab-view";
import Device from "react-native-device-detection";

import api from "../../utils/api";
import Layout from "../../componentes/Layout";
import Container from "../../componentes/Container";
import Loading from "../../componentes/Loading";
import FlatListData from "../../componentes/FlatListData";
import ItemPedido from "./ItemPedido";
import { useUser } from "../../../Provider";

const Pedido = ({ theme }) => {
  const [user, setUser] = useUser();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    api.getListPedido(user.uid, pedidos =>
      setData(pedidos.filter(pedido => pedido.status !== "aberto"))
    );
    setLoading(false);
  }, [loading]);

  return (
    <Layout title="Pedidos" subtitle="Lista dos pedidos efetuados">
      <FlatListData
        notImpar
        divider={false}
        numColumns={Device.isTablet ? 2 : 1}
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
        style={{ marginVertical: 16 }}
      />
    </Layout>
  );
};

export default withTheme(Pedido);
