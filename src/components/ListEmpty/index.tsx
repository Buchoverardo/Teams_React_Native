import { Container, Message } from './styles';

// props pra typagem mostrando que o list precisa de uma message
type Props = {
    message: string
}

export function ListEmpty({ message }: Props ){
    return (
        <Container>
            <Message>
                {message}
            </Message>
        </Container>
    );
}