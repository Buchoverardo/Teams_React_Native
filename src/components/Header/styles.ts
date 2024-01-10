import styled from 'styled-components/native';

import { CaretLeft } from 'phosphor-react-native';
//importo o icone da biclioteca phosphor


export const Container = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export const Logo = styled.Image`
    width: 46px;
    height: 55px;
`;

// crio um touchabOpacity para envolver meu icone clicavel
export const BackButton = styled.TouchableOpacity`
    flex: 1;
`;

// usando o icone da biclioteca via style
export const BackIcon = styled(CaretLeft).attrs(({ theme }) => ({
    size: 32,
    color: '#fff',

}))``;