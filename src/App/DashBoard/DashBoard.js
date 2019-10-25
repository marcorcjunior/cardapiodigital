import React, { useState, useEffect } from "react";
// import firestore from '@react-native-firebase/firestore';
import { StyleSheet, View, Alert } from "react-native";
import {
  withTheme,
  Title,
  Headline,
  Button,
  Paragraph,
  Card
} from "react-native-paper";

import FlatListData from "../../componentes/FlatListData";
import Container from "../../componentes/Container";
import DateSelector from "../../componentes/DateSelector";

import Layout from "../../componentes/Layout";
import api from "../../utils/api";
import ItemProduto from "./ItemProduto";
import ItemProdutoPedido from "./ItemProdutoPedido";
import { usePedidoId, setPedidoIdLocal, useUser } from "../../../Provider";
import { dinheiro } from "../../utils/formatarDinheiro";
import { Actions } from "react-native-router-flux";

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
  const [user] = useUser();
  const [pedidoId, setPedidoId] = usePedidoId();
  const [valorPedido, setValorPedido] = useState(0.0);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    api.getListProdutos().then(setData);
    if (pedidoId) {
      api.getListProdutosPedido(pedidoId, produtosCarrinho => {
        setCarrinho(produtosCarrinho);
        setValorPedido(
          produtosCarrinho.reduce(
            (total, currentValue) =>
              total + currentValue.quantidade * currentValue.preco,
            0.0
          )
        );
      });
    }
    setLoading(false);
  }, [pedidoId]);

  return (
    <Layout
      actionSearch
      title="Cardapio"
      subtitle="Lista de produtos disponiveis."
    >
      <Container style={{ flexDirection: "row", marginVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 17 }}>
            <Headline>Cardapio</Headline>
          </View>
          <FlatListData
            notImpar
            divider={false}
            numColumns={2}
            data={data}
            loading={loading}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (item.id !== null) {
                return <ItemProduto item={item} />;
              }
              return <Container style={{ marginHorizontal: 15 }} />;
            }}
            onRefresh={() => {
              setLoading(true);
            }}
            onLoadMore={() => {}}
          />
        </View>
        <View style={{ flex: 0.4 }}>
          <View style={{ marginHorizontal: 17 }}>
            <Headline>Itens do carrinho</Headline>
          </View>
          <FlatListData
            numColumns={1}
            data={carrinho}
            loading={loading}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
              <ItemProdutoPedido item={item} index={index} />
            )}
            onRefresh={() => {
              setLoading(true);
            }}
            onLoadMore={() => {}}
            notFoundTitle="Carrinho vazio"
            notFoundSubTitle="Adicione agora seu primeiro produto!"
          />
          <Button
            mode="outlined"
            style={{ marginHorizontal: 17 }}
            onPress={() => {
              Promise.all([
                api.updatePedido(pedidoId, "status", "solicitado"),
                api.updatePedido(pedidoId, "valor", valorPedido)
              ]).then(() => {
                setPedidoIdLocal(null).then(() => setPedidoId(null));
                Alert.alert(
                  "Obrigado pela preferencia!",
                  "Desejá fazer mais algum pedido ?",
                  [
                    {
                      text: "Quero pedir mais",
                      onPress: () => {
                        api.updatePedido(pedidoId, "userId", user.id);
                      }
                    },
                    {
                      text: "Não obrigado",
                      onPress: () => {
                        Actions.pop();
                      },
                      style: "cancel"
                    }
                  ],
                  { cancelable: false }
                );
              });
            }}
          >
            Enviar pedido ({dinheiro(valorPedido)})
          </Button>
        </View>
      </Container>
    </Layout>
  );
};

export default withTheme(DashBoard);
