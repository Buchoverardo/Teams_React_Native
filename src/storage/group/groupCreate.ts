import AsyncStorage from '@react-native-async-storage/async-storage';
// importo o AsyncStorage pra poder gravar no dispositivo do usuario

import { GROUP_COLLECTION } from '@storage/storageConfig';
// importo o nome das chaves

import { AppError } from '@utils/AppError';
// importo a classe de erro personalizado

import { groupsGetAll } from './groupsGetAll';
//importo a funcao que pega os grupos ja criados


//abaixo exporto a funcao usando o async pra poder usar o await tambem
// como vou criar um novo grupo, o nome dele é newGroup ja passando a tipagem
export async function groupCreate(newGroup: string){
// bloco try e catch serve pra capturar com funcao e erro das props que vao ser armazenadas
    try {

        const storedGroups = await groupsGetAll();
        // aqui pego todos os grupos que estao no dispositivo

        const groupAlreadyExists = storedGroups.includes(newGroup);
        // minha const verificando se existe o mesmo nome do grupo que ja estao armazenados

        // se ja existe o mesmo nome acima, ele roda esse if de erro
        if(groupAlreadyExists){
            throw new AppError('Já existe um grupo cadastrado com esse nome');
        }
        // acima eu chamo o erro personalizado caso ja tenha o grupo com o mesmo nome

        const storage = JSON.stringify([...storedGroups, newGroup]);
        // aqui eu converto o array em texto

        await AsyncStorage.setItem(GROUP_COLLECTION, storage );
        // tenho que definir a chave, group_collection, mais todos os grupos ja salvo mais o novo grupo que quero salvar

    } catch (error){
        throw error;
    }

}