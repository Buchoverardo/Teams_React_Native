import { Container, Icon, Name } from './styles';

import { ButtonIcon } from '@components/ButtonIcon';

type Props = {
    name: string;
    onRemove: () => void; // prosp que vai chamar a function pra remover
}

export function PlayerCard({ name, onRemove }: Props) {
    return (
        <Container>
            <Icon 
                name='person'
            />
            <Name>
                {name}
            </Name>

            <ButtonIcon 
                icon='close'
                type='SECONDARY'
                onPress={onRemove} // funcao para remover
            />

        </Container>
    );
}