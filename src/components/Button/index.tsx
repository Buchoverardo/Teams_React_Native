import { TouchableHighlightProps } from 'react-native';

import { Container, Title, ButtonTypeStyleProps} from './styles';

// abaixo eu pego as props do touchable, o titulo, e o type, marcando o type dele ( ? ) como opcional
type Props = TouchableHighlightProps & {
    title: string;
    type?: ButtonTypeStyleProps;
}

export function Button ({ title, type = 'PRIMARY', ...rest }: Props){
    return(
        <Container 
            type={type}
            {...rest}>
                <Title>
                    {title}
                </Title>
        </Container>
    );
}