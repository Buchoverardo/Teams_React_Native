import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

// aqui eu exporto o type porque vamos usar na config do botao
export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';

// aqui eu uso a props pro botao
type Props = {
    type: ButtonTypeStyleProps;
}

// aqui no background, eu pego o se o botao e primario, pelo type acima, e faco uma comparacao
// se a comparacao for = primary ele fica verde, caso contrario, vermelho
export const Container = styled( TouchableOpacity ) < Props >`
    flex: 1;

    min-height: 56px;
    max-height: 56px;

    background-color: ${({ theme, type }) => 
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};

    border-radius: 6px;
    justify-content: center;
    align-items: center;

    margin-top: 20px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.WHITE};
    font-family: ${({ theme }) => theme.FONT_FAMILY.BOLD};
`;