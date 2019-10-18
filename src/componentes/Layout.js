/* @flow */
import React, { type Node, useState, useRef } from 'react';
import { Appbar, withTheme, Searchbar } from 'react-native-paper';
import { View, Dimensions, Platform } from 'react-native';

import Container from './Container';

type Props = {
    title: Node,
    subtitle: Node,
    children: Node,
    actionSearch?: boolean,
    actionsBack?: Node,
    actions?: Array<Node>,
    onSearchData?: Function => void,
};

const { width } = Dimensions.get('window');

const Layout = ({
    title,
    subtitle,
    actionsBack,
    actionSearch,
    actions,
    children,
    onSearchData,
}: Props) => {
    const bsUnidadeNegocio = useRef();
    const [search, setSearch] = useState('');
    const [searchVisible, setSearchVisible] = useState(false);

    return (
        <Container>
            {searchVisible ? (
                <Appbar.Header>
                    <View style={{ margin: 4, marginHorizontal: 2, flex: 1 }}>
                        <Searchbar
                            autoFocus
                            style={{ flex: 1 }}
                            placeholder="Pesquisa"
                            icon="arrow-back"
                            clearIcon="close"
                            onChangeText={nText => {
                                setSearch(nText);
                                onSearchData(nText);
                            }}
                            onIconPress={() => {
                                setSearchVisible(false);
                                setSearch('');
                                onSearchData('');
                            }}
                            value={search}
                        />
                    </View>
                </Appbar.Header>
            ) : (
                <Appbar.Header>
                    {actionsBack}
                    <Appbar.Content title={title} subtitle={subtitle} />
                    {actions.map(item => item)}
                    {actionSearch && (
                        <Appbar.Action
                            icon="search"
                            onPress={() => setSearchVisible(true)}
                        />
                    )}
                </Appbar.Header>
            )}

            {children}
        </Container>
    );
};

Layout.defaultProps = {
    actionSearch: false,
    actionsBack: null,
    actions: [],
    onSearchData: () => {},
};

export default withTheme(Layout);
