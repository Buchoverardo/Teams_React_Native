import { TouchableOpacityProps } from 'react-native';
// aqui eu pego a tipagem do touchable pra mandar pro styles e usar o onpress

import { Container, Icon, Title} from './styles';

// abaixo eu defino que as props tambem usam as funcoes do touchable
type Props = TouchableOpacityProps & {
    title: string
}

// abaixo tem a tipagem do titulo e o resto que é usado pras props do touchable
// lembrando que o Container abaixo é o touchableOpacity
export function GroupCard({ title, ...rest }: Props ){
    return(
       
        <Container { ...rest }>
            <Icon />
            <Title>
                {title}
            </Title>
        </Container>
        
    );
}