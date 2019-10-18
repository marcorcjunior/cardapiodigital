/* @flow */
import firebase from 'firebase';
import moment from 'moment';

const db = () => firebase.firestore();

const converterDados = querySnapshot => {
  const response = [];
  querySnapshot.forEach(doc => {
    const dados = doc.data();
    response.push({ id: doc.id, ...dados });
  });
  return response;
};

const getListProdutos = () =>
  db()
    .collection('produtos')
    .get()
    .then(converterDados);

const createPedido = () =>
  db()
    .collection('pedidos')
    .add({
      userId: 1,
      data: moment().format('YYYY-MM-DD HH:mm:ss'),
      produtos: [],
    })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error('Error adding document: ', error);
    });

const getPedido = pedidoId =>
  db()
    .collection('pedidos')
    .doc(pedidoId)
    .get()
    .then(querySnapshot => {
      console.warn('querySnapshot', JSON.stringify(querySnapshot));
    });

const api = {
  createPedido,
  getPedido,
  getListProdutos,
};

export default api;
