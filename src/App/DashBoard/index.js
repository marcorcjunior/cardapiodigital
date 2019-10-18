import React, { useState } from 'react';
import { BottomNavigation, withTheme } from 'react-native-paper';

import DashBoard from './DashBoard';
import Pedido from '../Pedido';
import Perfil from '../Perfil';

const Main = () => {
    const [state, setState] = useState({
        index: 0,
        routes: [
            { key: 'cardapio', title: 'Cardapio', icon: 'home' },
            { key: 'pedido', title: 'Pedido', icon: 'receipt' },
            { key: 'perfil', title: 'Perfil', icon: 'person' },
        ],
    });

    return (
        <BottomNavigation
            navigationState={state}
            onIndexChange={index => setState({ ...state, index })}
            renderScene={BottomNavigation.SceneMap({
                cardapio: DashBoard,
                pedido: Pedido,
                perfil: Perfil,
            })}
        />
    );
};

export default withTheme(Main);
