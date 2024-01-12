import { TouchableOpacityProps } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { Container, Icon, ButtonIconTypeStyleProps } from './styles';

// aqui a prop fala que alem das config do touchable, o icon pega as config do MaterialIcon
// no typo o type é opcional, porem no export ele fala que se nao usado é o primart que funciona
type Props = TouchableOpacityProps & {
    icon: keyof typeof MaterialIcons.glyphMap;
    type?: ButtonIconTypeStyleProps;
}

export function ButtonSoma({ icon, type = 'PRIMARY', ...rest }: Props ) {
    return (
        <Container {...rest}>
            <Icon 
                name={icon} 
                type={type} 
            />
        </Container>
    )
}