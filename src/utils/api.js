/* @flow */
import firebase from "firebase";
import moment from "moment";

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
    .collection("produtos")
    .get()
    .then(converterDados);

const createPedido = () =>
  db()
    .collection("pedidos")
    .add({
      userId: 1,
      data: moment().format("YYYY-MM-DD HH:mm:ss"),
      produtos: []
    })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error("Error adding document: ", error);
    });

const getPedido = pedidoId =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .get()
    .then(querySnapshot => querySnapshot.data());

const getListProdutosPedido = pedidoId =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .get()
    .then(querySnapshot => querySnapshot.data().produtos);

const getUsuario = usuarioId =>
  db()
    .collection("usuarios")
    .doc(usuarioId)
    .get()
    .then(querySnapshot => querySnapshot.data());

const findUsuario = id =>
  db()
    .collection("usuarios")
    .get()
    .then(converterDados)
    .then(users => users.find(user => user.id === id));

const createUsuario = ({ id, nome, email, senha }) =>
  db()
    .collection("usuarios")
    .add({ id, nome, email, senha })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error("Error adding document: ", error);
    });

const api = {
  createPedido,
  getPedido,
  getListProdutosPedido,
  getListProdutos,
  findUsuario,
  getUsuario,
  createUsuario
};

export default api;
