import { theme } from "../../AppTheme";

/* @flow */
export const getArrayOfDatesPeriod = (startOf, endOf) => {
    const days = [];
    let day = startOf;

    while (day <= endOf) {
        days.push(day.format('YYYY-MM-DD'));
        day = day.clone().add(1, 'd');
    }

    return days;
};

export const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

export const STATUS_PEDIDOS = {
    ABERTO: 'aberto',
    SOLICITADO: 'solicitado',
    PRODUCAO: 'producao',
    ENTREGUE: 'entregue',
    CANCELADO: 'cancelado',
};

export const statusPedidos = {
    aberto: { descricao: 'Aberto', cor: theme.colors.alerta },
    solicitado: { descricao: 'Enviado', cor: theme.colors.primary },
    producao: { descricao: 'Execução', cor: theme.colors.info },
    entregue: { descricao: 'Entrgue', cor: theme.colors.sucesso },
    cancelado: { descricao: 'Cancelado', cor: theme.colors.erro },
};
