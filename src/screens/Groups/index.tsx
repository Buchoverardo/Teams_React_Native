import { useState, useCallback } from 'react';
// usar o usecallback quando usar o ousefocuseffect, que serve pra renderizar a pagina quando voltar nela

import { Alert, FlatList } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
// acima importa pra conseguir navegar, e o useFocus, é usado pra renderizar quando voltar na tela

import { groupsGetAll } from '@storage/group/groupsGetAll';
// importo para usar na funcao de listar todos os grupos

// abaixo importo components
import { Header } from '@components/Header';
import { Highlight } from '@components/Highlight';
import { GroupCard } from '@components/GoupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';
import { Loading } from '@components/Loading';

import { Container } from './styles';

export function Groups() {

  const [isLoading, setIsLoading] = useState(true);
    // chamando o loading antes de carregar a tela

  const [groups, setGroups] = useState<string[]>([]); // setando que o groups é string

  const navigation = useNavigation(); // cria a navigation usando o hook useNavigation

  function handleNewGroup(){
     navigation.navigate('new'); // funcao do botao que ao apertar leva pra pagina requerida
  }

  // aqui vou usar a funcao pra listar os grupos
  async function fetGroups() {
    try {

      setIsLoading(true); // mostro o loading enquanto esta carregando

      //crio uma const dada pegando todos os grupo
      // abaixo mudo o setGroups com o data criado
      const data = await groupsGetAll();
      setGroups(data);

    } catch(error) {
      Alert.alert('Trumas','Não foi possivel Carregar as turmas.');
      console.log(error);

    } finally { // finally significa que se independete do ocorrido na funcao, ele finaliza
      setIsLoading(false); // tiro o loading depois de carregar
    }
  }

  // funcao pra abrir os grupos
  // nela pego o nome do group e levo pra tela players pelo navigate
  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }



  // useFocusEffects e useCallbac sao hooks pra listar a funcao fetGroups quando ouser voltar a pagina
  useFocusEffect(useCallback(() => {
    fetGroups();
  }, []));

  return (
    
    <Container>
      
      <Header />
      <Highlight 
        title='TREINOS AAI'
        subtitle='Jogue com sua turma!'
      />
      
    {
        // se loading for verdadeiro, mostro ele, caso nao, mostro a FlatList
        isLoading ? <Loading /> :
      
      <FlatList 
        data={ groups }
        keyExtractor={ item => item }
        renderItem={({ item }) => (
          <GroupCard 
            title={ item }
            onPress={() => handleOpenGroup(item)}
          />
        )}
        // aqui na primeira alinho a mensagem no centro se o grupo for zero
        // na segunda linha é meu componente de lista vazia, 
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty 
            message='Vamos cadastrar a primeira turma!'
          />
          )}
          showsVerticalScrollIndicator={false}
        
      />

    }
      
      <Button 
        title = "Criar Nova Turma"
        onPress={handleNewGroup}
      />
        
     
      </Container>

      
      
  );
}

