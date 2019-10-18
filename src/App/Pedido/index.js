/* @flow */

import React, { useState } from 'react';
import { TabView } from 'react-native-tab-view';
import { withTheme, Appbar, Title } from 'react-native-paper';

import Layout from '../../componentes/Layout';
import DateSelectorPeriod from '../../componentes/DateSelectorPeriod';
import LocalTabBar from '../../componentes/LocalTabBar';
import Loading from '../../componentes/Loading';
import { View } from 'react-native';

const Pedido = ({ theme }) => {
    const [period, setPeriod] = useState({});
    const [openDataSelect, setOpenDataSelect] = useState(false);
    const [index, setIndex] = useState(0);
    const [routes, setRoutes] = useState([
        { key: 'pedido', title: 'Em andamento' },
        { key: 'pedidos', title: 'Pedidos efetuados' },
    ]);

    const dateSelectorOpen = (
        <Appbar.Action
            icon="date-range"
            onPress={() => setOpenDataSelect(true)}
        />
    );

    return (
        <Layout title="Pedidos" subtitle="Detalhes dos pedidos" actions={[dateSelectorOpen]}>
            <TabView
                lazy
                navigationState={{ index, routes }}
                onIndexChange={ind => setIndex(ind)}
                renderTabBar={props => <LocalTabBar {...props} />}
                renderScene={({ route, jumpTo }) => (
                    <View
                        jumpTo={jumpTo}
                        route={route}
                        period={period}
                    >
                        <Title>{route.title}</Title>
                    </View>
                )}
                renderLazyPlaceholder={() => <Loading />}
            />
            <DateSelectorPeriod
                open={openDataSelect}
                onClose={isOpen => setOpenDataSelect(isOpen)}
                onDone={dates => console.warn('oie')}
            />
        </Layout>
    );
};

export default withTheme(Pedido);
