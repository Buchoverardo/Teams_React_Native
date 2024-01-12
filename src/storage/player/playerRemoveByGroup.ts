import AsyncStorage from '@react-native-async-storage/async-storage';
// acesso o storage do celular

import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {

    try {
        // acesso o storage para pegar os players do grupo
        const storage = await playersGetByGroup(group, playerName);

        // agora faco um filter recuperando todo mundo menos ( diferente !== ) o que quero deletar
        const filtered = storage.filter(player => player.name !== playerName);

        // transformo meus players atuais em string
        const players = JSON.stringify(filtered);

        // gravo no sptorage a chave do player - grou e o nome do player
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);

    } catch (error) {
        throw error;
    }
    
}