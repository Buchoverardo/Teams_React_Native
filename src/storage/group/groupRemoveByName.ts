import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION, PLAYER_COLLECTION } from '@storage/storageConfig';

import { groupsGetAll } from './groupsGetAll';

// funcao pra deletar o grupo
export async function groupRemoveByName(groupDeleted: string){

    try {

        const storedGroups = await groupsGetAll(); // pego todos os grupos

        const groups = storedGroups.filter(group => group !== groupDeleted);
        // acima eu percorro cada grupo, e me liste todos os grupo menos !== o que quero deletar

        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups));
        // setando um novo  item na chave GROUP COLLECTION trocando o atual pelo groups que ja fizemos o filter acima
        // acima uso o stringfy, passando o objeto pra texto, pra poder gravar no asyncStorage

        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`);
        // remover a chave inteira dos jogadores criados pro grupo que quero remover acima

    } catch (error) {
        throw error; // lançando erro pra frente
    }
}
