import { useNavigation } from '@react-navigation/native';
import { Container, Logo, BackButton, BackIcon} from './styles';

import logoImg from '@assets/logo.png';

type Props = {
    showBackButton?: boolean;
}
// acima eu type uma prop pra mostrar ou nao o botao de forma booleana

//abxixo eu mostro no header a opcao de false para nao mostrar a opcao de voltar
export function Header({ showBackButton = false }: Props) {

    const navigation = useNavigation();

    function handleGoBack(){
        navigation.navigate('groups');
    }

    return(

        <Container>
            {
                showBackButton && // aqui eu nostro se a props do botao é verdadeira ou falsa
                <BackButton onPress={handleGoBack}>
                    <BackIcon />
                </BackButton>
            }
            <Logo source={ logoImg } />
        </Container>
    );
}