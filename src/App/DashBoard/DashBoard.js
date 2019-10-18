import React, { useState, useEffect } from 'react';
// import firestore from '@react-native-firebase/firestore';
import { StyleSheet } from 'react-native';
import { withTheme, Title } from 'react-native-paper';

import FlatListData from '../../componentes/FlatListData';
import Container from '../../componentes/Container';
import DateSelector from '../../componentes/DateSelector';

import Layout from '../../componentes/Layout';
import api from '../../utils/api';
import ItemProduto from './ItemProduto';

const styles = StyleSheet.create({
  dot: {
    width: 16,
    height: 16,
    borderRadius: 16,
    margin: 16,
  },
  dotInner: {
    width: 8,
    height: 8,
    borderRadius: 8,
    margin: 4,
  },
});

const DashBoard = ({ theme }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    api.getListProdutos().then(setData);
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
      <Container style={{ marginVertical: 16 }}>
        <FlatListData
          numColumns={3}
          data={data}
          loading={loading}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ItemProduto item={item} />}
          onRefresh={() => {
            setLoading(true);
          }}
          onLoadMore={() => {}}
        />
      </Container>
    </Layout>
  );
};

export default withTheme(DashBoard);
