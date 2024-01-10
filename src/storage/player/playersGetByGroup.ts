import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { PlayerStorageDTO } from './PlayerStorageDTO';

export async function playersGetByGroup(group: string) {

    try {
        // buscando pela lista de jogadores pelo grupo
        const storage = await AsyncStorage.getItem(`${PLAYER_COLLECTION}-${group}`);

        //se o storage tem conteudo, eu faco um parse, se nao tem, retorno um array vazio
        const players: PlayerStorageDTO[] = storage ? JSON.parse(storage) : [];

        return players;

    } catch (error) {

        throw(error);
    }
    
}