
/* @flow */
import React, { useState, useEffect } from 'react';
import { PieChart } from 'react-native-svg-charts';
import { withTheme } from 'react-native-paper';
import { colorsArray } from '../../AppTheme';

type Item = {
    key: string,
    value: Number,
};

type Props = {
    data: Array<Item>,
    colors?: Array<string>,
    onChangeItem?: Function,
};

const GraficoPieChart = ({
    theme, data, colors, onChangeItem,
}): Props => {
    const [selectedSlice, setSelectedSlice] = useState({
        key: '',
        value: 0,
    });

    const isColors = colors.length;

    const isSelecionado = (item) => (
        selectedSlice.key === item.key
            ? { outerRadius: '112%', cornerRadius: 4 }
            : { cornerRadius: 4 }
    );
    const selecionarItem = (item) => {
        const it = { key: item.key, value: item.value };
        setSelectedSlice(it);
        onChangeItem(it);
    };
    const dados = data.map((item, index) => ({
        ...item,
        svg: { fill: isColors ? colors[index] : colorsArray[index] },
        arc: { ...isSelecionado(item) },
        onPress: () => selecionarItem(item),
    }));

    useEffect(() => {
        if (data.length) {
            selecionarItem(data[0]);
        }
    }, [data]);

    return (
        <PieChart
            style={{ height: 200 }}
            outerRadius="80%"
            innerRadius="45%"
            data={dados}
        />
    );
};

GraficoPieChart.defaultProps = {
    colors: [],
    onChangeItem: () => {},
};

export default withTheme(GraficoPieChart);
