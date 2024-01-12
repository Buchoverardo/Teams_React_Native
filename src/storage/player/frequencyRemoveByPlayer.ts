import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION, FREQUENCY_COLLECTION } from '../storageConfig';

import { playersGetByGroup } from './playersGetByGroup';
// importo a funcao que pega os jogadores de determinados grupos

import { PlayerStorageDTO } from './PlayerStorageDTO';
// importo as tipagens que fiz dos jogadores

export async function frequencyRemoveByPlayer(playerName: string, group: string) {

    try{
        // acesso o storage para pegar os players do grupo
        const playerStorage = await playersGetByGroup(group, playerName);

        // agora faco um filter recuperando todo mundo menos ( diferente !== ) o que quero deletar
        const filtered = playerStorage.filter(player => player.name === playerName);

            // Incrementa a propriedade "frequency" (convertendo para número e depois para string)
            filtered[0].frequency = (parseInt(filtered[0].frequency) - 1).toString();
        
            // Salvando os dados de volta no localStorage
            await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, JSON.stringify(playerStorage));


    } catch (error) {
        throw (error);
    }

}
