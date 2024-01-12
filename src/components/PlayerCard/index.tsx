

import { Container, Icon, Name, Contage, ContageText } from './styles';

import { ButtonIcon } from '@components/ButtonIcon';

import { ButtonSoma } from '@components/ButtonSoma';

type Props = {
    name: string;
    onRemove: () => void; // prosp que vai chamar a function pra remover
    onFrequency: () => void;
    frequency: string;
}


export function PlayerCard({ name, onRemove, onFrequency, frequency }: Props) {

    
    return (
        <Container>
            <Contage>
                <ContageText>{frequency}</ContageText>
            </Contage>
            <Icon 
                name='person'
            />
            <Name>
                {name}
            </Name>

            <ButtonSoma 
                icon='arrow-circle-up'
                type='PRIMARY'
                onPress={onFrequency} // funcao para somar
            />

            <ButtonIcon 
                icon='close'
                type='SECONDARY'
                onPress={onRemove} // funcao para remover
            />

        </Container>
    );
}