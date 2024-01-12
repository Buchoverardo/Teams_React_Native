import { useState, useEffect, useRef } from 'react';
import { Alert, FlatList, TextInput, Keyboard } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerAddByGroup } from'@storage/player/playerAddByGroups';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';
import { frequencyAddByPlayer} from '@storage/player/frequencyAddByPlayer';
import { frequencyRemoveByPlayer } from '@storage/player/frequencyRemoveByPlayer';

import { Container, Form, HeaderList, NumberPlayers } from './styles';

import { Highlight } from '@components/Highlight';
import { Header } from '@components/Header';
import { ButtonIcon } from '@components/ButtonIcon';
import { Input } from '@components/Input';
import { Filter } from '@components/Filter';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { AppError } from '@utils/AppError';

type RouteParams = {
    group: string;

}
// acima estou tipando os parametros que veio na rota

export function Players(){

    const frequency ='1';

    const [isLoading, setIsLoading] = useState(true);
    // chamando o loading antes de carregar a tela

    const [newPlayerName, setNewPlayerName] = useState('');

    // aqui eu passo o arrei dos meu times criados, usando o primeiro como incial
    const [ team, setTeam ] = useState('Manha');
    // aqui vou fazer a contagem de quantos players tem nos times

    const [ players, setPlayer ] = useState<PlayerStorageDTO[]>([]);
    // acima tipei usando o storageTDO, falando que tambem é uma lista

    
    const navigation = useNavigation();
    // chamo o useNavigation pra voltar pra rota

    const route = useRoute(); // com esse hook consigo acessar os parametros passados pra essa tela
    
    const { group } = route.params as RouteParams;
    // pego a variavel group ja tipada com o as RouteParams  que veio da tela newgrup

    const newPlayerNameInputRef = useRef<TextInput>(null);
    // uso o useRef do react e o TextInput do native, criando essa const como null
   
    // com a acao do bortao de + eu vejo se tem conteudo no textinput, se nao, mando o alert pro user
   // lembrando que uso o return pra funcao nao executar mais nada depois desse erro
    async function handleAddPlayer() {
        if (newPlayerName.trim().length === 0 ){
            return Alert.alert('Nova Pessoa', 'Informe o nome da pessoa para adicionar');
        }

        // aqui crio o newPlayercom o nome e o time que ele vai
        const newPlayer = {
            name: newPlayerName,
            team: team,
            frequency: frequency,
        }


        try {
            // chamo a funcao pra adicionar o jogador no grupo, mandando nome e o grupo
            await playerAddByGroup( newPlayer, group, frequency );

            newPlayerNameInputRef.current?.blur();
            // aqui eu falo que meu ref do inputText current é opcional e dou um blur pra tirar o cursor de dentro do input

            Keyboard.dismiss();
            // essa funcao fecha o teclado, nao estou usando, mas vou deixar aqui pra estudar

            setNewPlayerName(''); // seto o newPlayer para um valor vazio - usando tambem no value do input
           
            fetchPlayersByTeam();
           // sempre que o player é acionado, eu chamo a funcao acima novamente para recarregar a listagem

        } catch (error) {
            if (error instanceof AppError){
                Alert.alert('Nova Pessoa', error.message);
            } else {
                Alert.alert('Nova Pessoa', 'Não foi possivel adicionar.');
            }
        } // acima eu vejo se a mensagem foi instanciada ou se é generica

    }

    // essa funcao vamos usar o useEffect
    // funcao pra buscar os players do time selecionado
    async function fetchPlayersByTeam() {
        try{
            // inicio o carregando usando o loading pra mostrar pro user que esta carregando
            setIsLoading(true);

            //crio o playerbyteam usando a funcao playersGetByGroupandTeam passando group e team que recedo do useState
            const playersByTeam = await playersGetByGroupAndTeam(group, team, frequency);

            setPlayer(playersByTeam);
            // acima eu set no useState o playeyrs que recebi


        }catch (error) {
            Alert.alert('Pessoas', 'Não foi possivel carregar o time.');
        
        } finally {
            setIsLoading(false); // terminou de carregar desativa o loading ...
        }
        
    }

    // adiciono uma frequencia ao jogador
    async function frequencyPlayerByTeam(playerName: string) {
        
        try {
            // chamo a funcao para listar e somar 1 na frequencia do player
            await frequencyAddByPlayer(playerName, group);
            
            fetchPlayersByTeam(); // chamo a funcao novamente para recarregar a listagem

        } catch ( error ) {
            Alert.alert('Frequencia','Não foi possivel somar.');
        }
        
    }

    // removo uma frequencia ao jogador
    async function frequencyRemovePlayer(playerName: string) {
        
        try {
            // chamo a funcao para listar e somar 1 na frequencia do player
            await frequencyRemoveByPlayer(playerName, group);
            
            fetchPlayersByTeam(); // chamo a funcao novamente para recarregar a listagem

        } catch ( error ) {
            Alert.alert('Frequencia','Não foi possivel remover.');
        }
        
    }

     // aqui eu chamo o alert quando ele for remover o jogador,  sendo verdadeiro chamo a funcao abaixo
     async function confirmRemove(playerName: string) {
        Alert.alert('Observação','O que pretende fazer ?',
        [
            { text: 'Subtrair uma frequencia ?', onPress: () => frequencyRemovePlayer(playerName) },
            
            { text: 'Excluir o jogador ?', onPress: () => handlePlayerRemove(playerName)},

            { text: 'Cancelar', style: 'cancel' },
        ])
        
    }

    // removendo jogador
    async function handlePlayerRemove(playerName: string) {

        try {
            // chamo a funcao para remover players do grupo -pego eles como parametros
            await playerRemoveByGroup(playerName, group);
            fetchPlayersByTeam(); // chamo a funcao novamente para recarregar a listagem

        } catch ( error ) {
            Alert.alert('Remover Pessoa','Não foi possivel remover essa pessoa.');
        }
        
    }



    async function groupRemove() {

        try {
            // chamo a funcao do storage para remover, passado o parametro group
            await groupRemoveByName(group);

            navigation.navigate('groups');

        } catch (error) {
            Alert.alert('Remover Grupo','Não foi possivel remover o grupo.');
        }
    }

    // aqui eu chamo o alert quando ele quer remover o grupo, se a opcao for sim, eu chamo a funcao de cima
    async function handleGroupRemove() {
        Alert.alert('Remover','Deseja remover o Grupo?',
        [
            { text: 'Não', style: 'cancel' },
            { text: 'Sim', onPress: () => groupRemove()}
        ])
        
    }

    // aqui uso o useEffect pra chamar o funcao acima criada
    useEffect(() => {
        fetchPlayersByTeam();
       
    }, [team]);
    // cada vez que muda o state team, o useEffect é executado novamente

    
   
    return (
        <Container>

            <Header showBackButton />

            <Highlight 
                title={group}
                subtitle='Adcione jogadores e separe por período'
            />

            <Form>
                <Input 
                    inputRef={newPlayerNameInputRef}
                    onChangeText={setNewPlayerName}
                    value={newPlayerName}
                    placeholder='Nome do Jogador'
                    autoCorrect={false}
                    onSubmitEditing={handleAddPlayer} // faz o botao do detaclado tambem adicionar
                    returnKeyType='done' // faz o botao do detaclado tambem adicionar
                />

                <ButtonIcon 
                    icon='add'
                    onPress={handleAddPlayer}
                />

            </Form>
            
            <HeaderList>

            <FlatList 
                data={['Manha', 'Tarde']}
                keyExtractor={ item => item }
                renderItem={({ item }) => (
                    <Filter 
                        title={ item } 
                        isActive={ item === team } // aqui eu condiciono o tem que esta marcando na lista principal no state
                        onPress={ () => setTeam( item )} // aqui eu seto o item selecionado e mudo o setState da funcao
                    />
                )}
                horizontal
            />

            <NumberPlayers> 
            {players.length}
            </NumberPlayers>

            </HeaderList>

        {
            isLoading ? <Loading /> :
            // se o loading dor verdadeiro, mostra ele,  caso nao, mostra a FlatList
            
            <FlatList 
                data={players}
                keyExtractor={item => item.name}
                renderItem={({ item }) => (
                    <PlayerCard 
                        name={item.name} 
                        frequency={item.frequency}
                        onRemove={() => confirmRemove(item.name)}
                        onFrequency={()=> frequencyPlayerByTeam(item.name)}
                    />
                )}
                ListEmptyComponent={() => (
                    <ListEmpty 
                      message='Vamos cadastrar os jogadores?'
                    />
                )}
                showsVerticalScrollIndicator={false} // nao mostro o scroll na vertical
                contentContainerStyle={[
                    { paddingBottom: 100 }, // coloco um padding pri final da minha lista ser perceptivel
                    players.length === 0 && {flex: 1,}]} // se players = 0 eu aplico um flex 1
            />

        }

            <Button 
             title='Remover Turma'
             type='SECONDARY'
             onPress={handleGroupRemove}
            />
            

        </Container>
    )
}