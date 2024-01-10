import {playersGetByGroup} from './playersGetByGroup';
// importo a funcao de pegar os players dos grupos

// aqui eu exporto a funcao falando que ela precisa das variaveis de group e tem
export async function playersGetByGroupAndTeam(group: string, team: string) {

    try {
        // aqui crio o storage pedindo pra pegar todos os players do group para aplicar o filter abaixo
        const storage = await playersGetByGroup(group);

        // aqui crio o player, pegando do storage o filtro onde o team é = o time selecionado
        const players = storage.filter(player => player.team === team);

        return players;

    } catch (error) {
        throw error;
    }
    
}