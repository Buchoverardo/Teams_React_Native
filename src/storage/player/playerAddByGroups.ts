import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppError } from '@utils/AppError';

import { PLAYER_COLLECTION } from '@storage/storageConfig';

import { playersGetByGroup } from './playersGetByGroup';
// importo a funcao que pega os jogadores de determinados grupos

import { PlayerStorageDTO } from './PlayerStorageDTO';
// importo as tipagens que fiz dos jogadores

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {

    try{

        // aqui recebo a informacao dos jogadores que tenho no grupo
        const storedPlayers = await playersGetByGroup(group);

        // percorrendo cada jogaro, se o nome for igual ao newplayer eu nao salvo o player
        const playerAlreadyExistis = storedPlayers.filter(player => player.name === newPlayer.name);

        // aqui vejo se o player existe! se sim, mando a mensagem
        if (playerAlreadyExistis.length > 0) {
            throw new AppError('Essa pessoa já está adicionada.');
        }
        //aqui crio o storage, transformo em texto string, ... pego o que ja tenho, mais o novo jogador
        const storage = JSON.stringify([...storedPlayers, newPlayer]);
        // feito tudo isso acima,  uso esse storage pra adiconar nos players do grupo

        // setando a chave de onde vou guardar o conteudo, depois da virgula é o conteudo que estou guardando
        await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, storage);

    } catch (error) {
        throw (error);
    }

    
}
