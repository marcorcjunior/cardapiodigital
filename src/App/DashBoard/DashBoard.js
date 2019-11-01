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

import { ScreenOrientation } from "expo";
import Device from "react-native-device-detection";
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
import { STATUS_PEDIDOS } from "../../utils/constantes";

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

const arraysAreEqual = (ary1, ary2) => ary1.join("") == ary2.join("");

const DashBoard = ({ theme }) => {
  const [user] = useUser();
  const [pedidoId, setPedidoId] = usePedidoId();
  const [valorPedido, setValorPedido] = useState(0.0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    ScreenOrientation.getOrientationAsync().then(valor => console.warn(valor));
    api.getListProdutos().then(produtos => {
      if (search) {
        setData(produtos.filter(produto => !produto.nome.indexOf(search)));
        return;
      }
      setData(produtos);
    });
    setLoading(false);
  }, [search]);

  useEffect(() => {
    if (pedidoId) {
      api.getListProdutosPedido(pedidoId, produtosCarrinho => {
        if (!arraysAreEqual(carrinho, produtosCarrinho)) {
          setCarrinho(produtosCarrinho);
          setValorPedido(
            produtosCarrinho.reduce(
              (total, currentValue) =>
                total + currentValue.quantidade * currentValue.preco,
              0.0
            )
          );
        }
      });
    }

    setLoading(false);
  }, [loading, pedidoId]);

  return (
    <Layout
      actionSearch
      title="Cardapio"
      subtitle="Lista de produtos disponiveis."
      onSearchData={setSearch}
    >
      <Container style={{ flexDirection: "row", marginVertical: 16 }}>
        <View style={{ flex: 1 }}>
          <View style={{ marginHorizontal: 17 }}>
            <Headline>Cardapio</Headline>
          </View>
          <FlatListData
            notImpar
            divider={false}
            numColumns={Device.isTablet ? 2 : 1}
            data={data}
            // loading={loading}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              if (item.id !== null) {
                return <ItemProduto item={item} />;
              }
              return <Container style={{ marginHorizontal: 15 }} />;
            }}
            onRefresh={() => {
              // setLoading(true);
            }}
            onLoadMore={() => {}}
          />
        </View>
        <View style={{ flex: Device.isTablet ? 0.4 : 0.7 }}>
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
                api.updatePedido(pedidoId, "status", STATUS_PEDIDOS.SOLICITADO),
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
                        api.updatePedido(pedidoId, "userId", user.uid);
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
