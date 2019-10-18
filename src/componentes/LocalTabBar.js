/* @flow */
import React from 'react';
import { TabBar } from 'react-native-tab-view';
import { withTheme } from 'react-native-paper';

type Props = {
    theme: Object,
    props: Object,
    indicatorStyle: Object,
    labelStyle: Object,
    style: Object,
};

const LocalTabBar = ({
    theme, indicatorStyle, labelStyle, style, ...props
}: Props) => (
    <TabBar
        {...props}
        scrollEnabled
        tabStyle={{ width: 192 }}
        indicatorStyle={{ backgroundColor: theme.colors.info, ...indicatorStyle }}
        labelStyle={{ ...labelStyle }}
        style={{ backgroundColor: theme.colors.secondary, ...style }}
    />
);

export default withTheme(LocalTabBar);
