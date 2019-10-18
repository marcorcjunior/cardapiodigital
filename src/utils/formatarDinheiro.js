import { MaskService } from 'react-native-masked-text';

export const dinheiro = (valor) => MaskService.toMask('money', parseFloat(valor).toFixed(2), {
    unit: 'R$',
    separator: ',',
    delimiter: '.',
});
