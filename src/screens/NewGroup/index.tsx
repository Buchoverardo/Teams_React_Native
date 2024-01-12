import { useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { groupCreate } from '@storage/group/groupCreate';
//importo a funcao que cria os grupos
import { AppError } from '@utils/AppError';
// importo a classe de erro personalizado

import { Container, Content, Icon } from './styles';

import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { Input } from '@components/Input';

export function NewGroup(){

    const [group, setGroup] = useState('');
    // useState pra pegar o conteudo do texto imput

    const navigation = useNavigation();
    // usando o navgation pra navegacao

    // funcao assincorna acionada no botao criar
    // assincrono significa, promeiro ele faz o await, depois executa o resto da funcao
    async function handleNew() {
        try {
            // vejo se o imput esta vazio,  o trim retira espaços antes e depois, e o lenght faz a contagem de caracteres, que nao pode ser = 0
            if (group.trim().length ===0 ) {
                return Alert.alert('Novo Grupo', 'Informe o nome do grupo.');
            }
            // quando uso return no alert, significa que o restante nao vai ser executado

            await groupCreate(group);
            navigation.navigate('players', { group });
            // navigation.navigate('players', { group: group}); quando tem o mesmo nome, usar da forma acima

        } catch (error) {
            // aqui pergunto se o erro é uma instancia da classe personalizada
            if (error instanceof AppError){
                Alert.alert('Novo Grupo', error.message);
            } else {
                Alert.alert('Novo Grupo', 'Não foi possivel criar novo grupo.');
            }

            console.log(error);

        }

    }


    return (

        <Container>
            <Header showBackButton />

            <Content>
                <Icon />

                <Highlight 
                    title='Nova Turma'
                    subtitle='Crie a turma para adicionar jogadores!'
                />

                <Input 
                    placeholder='Nome da turma'
                    onChangeText={setGroup}
                />

                <Button 
                    title='Criar'
                    onPress={handleNew}
                />
            </Content>
            
        </Container>

     
    );
}