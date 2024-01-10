import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// usando o materialicon via expo
import { MaterialIcons } from '@expo/vector-icons';

// exporto a tipagem do botao pra usar nas config  primary ou secondary
export type ButtonIconTypeStyleProps = 'PRIMARY' | 'SECONDARY';

// pegando a tipagem
type Props = {
    type: ButtonIconTypeStyleProps
}

export const Container = styled( TouchableOpacity )`
    width: 56px;
    height: 56px;

    justify-content: center;
    align-items: center;

    margin-left: 16px;
`;

// usando o icone do material icon e atribuindo a timagem e a config do tema pra ele
// no color tenho ua condicional, se for primary uso verde, se nao, uso vermelho
export const Icon = styled(MaterialIcons).attrs <Props> (({ theme, type }) => ({
    size: 24,
    color: type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED,
}))``;