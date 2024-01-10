import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';

import { UsersThree } from 'phosphor-react-native';
// pegando icone da biclioteca


// esse botao ficou entre parentes porque vai receber propriedades de fora
export const Container = styled(TouchableOpacity)`
    width: 100%;
    height: 90px;

    flex-direction: row;
    align-items: center;
    border-radius: 6px;
    
    background-color: ${({ theme }) => theme.COLORS.GRAY_500};

    padding: 24px;
   
    margin-bottom: 12px;
`;

export const Title = styled.Text`
    font-size: ${({ theme }) => theme.FONT_SIZE.MD}px;
    color: ${({ theme }) => theme.COLORS.GRAY_200};
    font-family: ${({ theme }) => theme.FONT_FAMILY.REGULAR};
`;

export const Icon = styled(UsersThree).attrs(({ theme }) => ({
    size: 32,
    color: theme.COLORS.GREEN_700,
    weight: 'fill',
}))`
    margin-right: 20px;
`;