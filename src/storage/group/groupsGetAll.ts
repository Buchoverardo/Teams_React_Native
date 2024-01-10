// aqui vou obter todos os grupos que ja tenho no dispositivo
import AsyncStorage from '@react-native-async-storage/async-storage';

import { GROUP_COLLECTION } from '@storage/storageConfig';

export async function groupsGetAll(){

    try {

        const storage = await AsyncStorage.getItem(GROUP_COLLECTION);
        //pegando informacao que estao armazenadas no dispositivo usando a chave do group collection

        // agora converto o texto em objeto
        const groups: string[] = storage ? JSON.parse(storage) : [];
        //mostro que groups é uma strind e falo que se tiver conteudo ele monta um ojeto, se nao ele manda um array vazio

        return groups;
        //retorno os grupos pra quem chamou a funcao

    } catch (error) {
        throw error;
    }
    
}