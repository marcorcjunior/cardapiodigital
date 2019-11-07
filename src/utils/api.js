/* @flow */
import firebase from "firebase";
import moment from "moment";
import { unescapeComponent } from "uri-js";

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

const createPedido = userId =>
  db()
    .collection("pedidos")
    .add({
      userId: 1,
      status: "aberto",
      data: moment().format("YYYY-MM-DD HH:mm:ss"),
      produtos: [],
      valor: 0.0
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

const getListPedido = (userId, action) =>
  db()
    .collection("pedidos")
    .onSnapshot(querySnapshot => {
      const pedidos = converterDados(querySnapshot.docs);
      action(
        pedidos
          .filter(pedido => pedido.userId === userId)
          .sort(
            (pedido1, pedido2) =>
              moment(pedido1.data).unix() < moment(pedido2.data).unix()
          )
      );
    });

const updatePedido = (pedidoId, coluna, valor) =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .update(coluna, valor);

const getListProdutosPedido = (pedidoId, action) =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .onSnapshot(querySnapshot => {
      action(querySnapshot.data() ? querySnapshot.data().produtos : []);
    });

const addProdutoListaPedido = (pedidoId, produto) =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .get()
    .then(querySnapshot => {
      const produtos = querySnapshot.data().produtos;
      db()
        .collection("pedidos")
        .doc(pedidoId)
        .update("produtos", [...produtos, produto]);
    });

const updateProdutoListaPedido = (pedidoId, index, newProduto) =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .get()
    .then(querySnapshot => {
      const produtos = querySnapshot.data().produtos;
      const newProdutos = produtos.map((pro, ind) => {
        if (ind === index) {
          return newProduto;
        }
        return pro;
      });

      db()
        .collection("pedidos")
        .doc(pedidoId)
        .update("produtos", newProdutos);
    });

const removeProdutoListaPedido = (pedidoId, index) =>
  db()
    .collection("pedidos")
    .doc(pedidoId)
    .get()
    .then(querySnapshot => {
      const produtos = querySnapshot.data().produtos;
      produtos.splice(index, 1);
      db()
        .collection("pedidos")
        .doc(pedidoId)
        .update("produtos", produtos);
    });

const getUsuario = usuarioId =>
  db()
    .collection("usuarios")
    .doc(usuarioId)
    .get()
    .then(querySnapshot => querySnapshot.data());

const findUsuario = uid =>
  db()
    .collection("usuarios")
    .get()
    .then(converterDados)
    .then(users => users.find(user => user.uid === uid || user.id === uid));

const createUsuario = ({ uid, id, nome, email, senha }) =>
  db()
    .collection("usuarios")
    .add({ uid, id, nome, email, senha })
    .then(docRef => docRef.id)
    .catch(error => {
      console.error("Error adding document: ", error);
    });

const updateUsuario = (userId, coluna, valor) =>
  db()
    .collection("usuarios")
    .doc(userId)
    .update(coluna, valor);

const getMesas = () =>
  db()
    .collection("mesas")
    .get()
    .then(converterDados);

const getMaxNumberMesa = () =>
  getMesas().then(data => Math.max.apply(Math, data.map(item => item.numero)));

const findMesa = uid =>
  db()
    .collection("mesas")
    .get()
    .then(converterDados)
    .then(mesas => mesas.find(mesa => mesa.uid === uid));

const createMesa = () =>
  db()
    .collection("mesas")
    .add({
      uid: null,
      numero: null
    })
    .then(async docRef => {
      docRef.update("uid", docRef.id);
      const numMesa = await getMaxNumberMesa();
      let mesaNumber = 1;
      if (numMesa) {
        mesaNumber = parseInt(numMesa) + 1;
      }
      docRef.update("numero", mesaNumber);
      return await findMesa(docRef.id);
    })
    .catch(error => {
      console.error("Error adding document: ", error);
    });

const api = {
  createPedido,
  getPedido,
  getListPedido,
  updatePedido,
  getListProdutosPedido,
  addProdutoListaPedido,
  updateProdutoListaPedido,
  removeProdutoListaPedido,
  getListProdutos,
  findUsuario,
  getUsuario,
  createUsuario,
  updateUsuario,
  findMesa,
  createMesa
};

export default api;
