import { TextInput, TextInputProps } from 'react-native';

// aqui eu falo pra react usar meu tema atual
import { useTheme } from 'styled-components/native';

import { Container } from './styles';

type Props = TextInputProps & {
    inputRef?: React.RefObject<TextInput>;
}


export function Input({ inputRef, ...rest }: Props){
    // aqui eu pego as COLORS do meu tema e uso no paceholder abaixo
    const { COLORS } = useTheme();

    return (
        <Container 
            ref={inputRef}
            placeholderTextColor={COLORS.GRAY_300}
            { ...rest } 
        />
    );
}