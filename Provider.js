/* @flow */
import React, {
  type Node,
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

import { StatusBar, View } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import {
  Provider as PaperProvider,
  Snackbar,
} from 'react-native-paper';

import { themeDark, themeLigh } from './AppTheme';
import storage from './src/utils/storage';
import api from './src/utils/api';

// storage.deleteAll();

type Theme = 'light' | 'dark';

type GlobalContextType = {
  theme: Theme,
  setTheme: Theme => void,
  user: Object,
  setUser: Function => void,
};

export const GlobalContext = createContext<GlobalContextType>({
  theme: 'light',
  setTheme: () => undefined,
  user: {},
  setUser: () => undefined,
});

const getThemeLocal = () => storage.getItem('theme');
const setThemeLocal = item => storage.setItem('theme', item);

const getPedidoIdLocal = () => storage.getItem('pedidoId');
const setPedidoIdLocal = item => storage.setItem('pedidoId', item);

const PaperStatusBar = ({ theme }) => (
  <>
    <StatusBar
      translucent
      backgroundColor="rgba(0, 0, 0, 0.2)"
      barStyle="light-content"
    />
    {/* <View
      style={{
        backgroundColor: theme.colors.primary,
        height: getStatusBarHeight(),
      }}
    /> */}
  </>
);

type User = {
  login: Object,
  token: string,
};

export const Provider = ({ children }: { children: Node }) => {
  const [visible, setVisible] = useState(false);
  const [pedidoId, setPedidoId] = useState<Number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<Theme>('light');
  const localTheme = theme === 'light' ? themeLigh : themeDark;

  useEffect(() => {
    getThemeLocal().then(item => {
      let t = 'light';
      if (typeof item !== 'undefined') {
        t = item;
      }
      setTheme(t);
    });
  }, []);

  useEffect(() => {
    // setPedidoIdLocal(null);
    getPedidoIdLocal().then(item => {
      console.warn(item);
      api.getPedido(item).then(pedido => console.warn(pedido));
      if (!item) {
        api.createPedido().then(newPedidoId => {
          setPedidoIdLocal(newPedidoId);
          setPedidoId(newPedidoId);
        });
        return;
      }
      setPedidoId(item);
    });
  }, []);

  const valuesProvider = {
    theme,
    setTheme,
    user,
    setUser,
    pedidoId,
    setPedidoId,
  };

  return (
    <GlobalContext.Provider value={valuesProvider}>
      <PaperProvider theme={localTheme}>
        <PaperStatusBar theme={localTheme} />
        {children}
        <Snackbar
          duration={10000}
          visible={visible}
          onDismiss={() => setVisible(false)}
        >
          Sua sessão expirou!
        </Snackbar>
      </PaperProvider>
    </GlobalContext.Provider>
  );
};

export const useTheme = () => {
  const { theme, setTheme } = useContext(GlobalContext);
  return [
    theme,
    theme === 'light' ? themeLigh : themeDark,
    () => {
      const themeLocal = theme === 'light' ? 'dark' : 'light';
      setTheme(themeLocal);
      setThemeLocal(themeLocal);
    },
  ];
};

type Login = {
  email: String,
  senha: String,
};

export const useUser = () => {
  const { user, setUser } = useContext(GlobalContext);
  return [user, setUser];
};
