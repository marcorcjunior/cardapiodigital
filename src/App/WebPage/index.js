import React from 'react';
import { Actions } from 'react-native-router-flux';
import WebView from 'react-native-webview';
import {
    withTheme, Appbar,
} from 'react-native-paper';

import Layout from '../../componentes/Layout';

const WebPage = ({
    title, description, url,
}) => (
    <Layout
        title={title}
        subtitle={description}
        selectUnit={false}
        actionsBack={<Appbar.BackAction onPress={() => Actions.pop()} />}
    >
        <WebView
            scrollEnabled
            javaScriptEnabled
            domStorageEnabled
            startInLoadingState
            originWhitelist={['*']}
            style={{ flex: 1 }}
            source={{ uri: url }}
        />
    </Layout>
);


export default withTheme(WebPage);
