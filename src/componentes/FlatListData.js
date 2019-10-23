/* @flow */

import React, { type Node, useState, useEffect } from "react";
import {
  FlatList,
  RefreshControl,
  View,
  ActivityIndicator
} from "react-native";
import { withTheme, Text, Divider } from "react-native-paper";

import Loading from "./Loading";
import NotFound from "./NotFound";

type Props = {
  notFoundTitle: String,
  notFoundSubTitle: String,
  notFoundImage: any,
  notImpar: Boolean,
  divider: Boolean,
  data: Array<Object>,
  onRefresh?: Function,
  renderItem: Function,
  keyExtractor?: Function,
  style?: Object
};

const FlatListData = ({
  theme,
  notImpar,
  divider,
  notFoundTitle,
  notFoundSubTitle,
  notFoundImage,
  data,
  loading,
  onRefresh,
  onLoadMore,
  renderItem,
  keyExtractor,
  style,
  ...props
}: Props): Node => {
  const [loadMore, setLoadMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingOpen, setLoadingOpen] = useState(loading);

  useEffect(() => {
    setLoadingOpen(loading);
  }, [loading]);

  if (loadingOpen) {
    return <Loading />;
  }

  if (notImpar && data.length % 2 !== 0) {
    data.push({ id: null });
  }

  return (
    <FlatList
      {...props}
      refreshing={refreshing}
      style={{
        ...style,
        flex: 1,
        paddingTop: 10,
        paddingHorizontal: 10
      }}
      ItemSeparatorComponent={() =>
        divider ? (
          <Divider style={{ marginVertical: 4 }} />
        ) : (
          <View style={{ marginVertical: 4 }} />
        )
      }
      ListEmptyComponent={() => (
        <NotFound
          title={notFoundTitle}
          subtitle={notFoundSubTitle}
          image={notFoundImage}
        />
      )}
      refreshControl={
        <RefreshControl
          colors={[theme.colors.primary, theme.colors.accent]}
          refreshing={refreshing}
          onRefresh={async () => {
            setRefreshing(true);
            await onRefresh();
            setRefreshing(false);
          }}
        />
      }
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      ListFooterComponent={() =>
        loadMore ? (
          <ActivityIndicator
            animating
            size="small"
            color={theme.colors.accent}
            style={{ marginTop: 8, marginBottom: 16 }}
          />
        ) : null
      }
      onEndReachedThreshold={0.5}
      onEndReached={async resp => {
        setLoadMore(true);
        await onLoadMore();
        setLoadMore(false);
      }}
    />
  );
};

FlatListData.defaultProps = {
  data: [],
  notImpar: false,
  divider: true,
  notFoundTitle: null,
  notFoundSubTitle: null,
  notFoundImage: null,
  loading: false,
  onRefresh: () => {},
  onLoadMore: () => {},
  renderItem: item => <Text>{JSON.stringify(item)}</Text>,
  keyExtractor: item => item.id,
  style: {}
};

export default withTheme(FlatListData);
