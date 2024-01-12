import {playersGetByGroup} from './playersGetByGroup';
// importo a funcao de pegar os players dos grupos

// aqui eu exporto a funcao falando que ela precisa das variaveis de group e tem
export async function playersGetByGroupAndTeam(group: string, team: string, frequency: string) {

    try {
        // aqui crio o storage pedindo pra pegar todos os players do group para aplicar o filter abaixo
        const storage = await playersGetByGroup(group, frequency);

        // aqui crio o player, pegando do storage o filtro onde o team é = o time selecionado
        const players = storage.filter(player => player.team === team);

        // aqui eu filtro a ordem da flatlist por quem tem mais numeros
        const playerOrder = players.sort((a, b) => parseInt(b.frequency) - parseInt(a.frequency));

        return playerOrder;

    } catch (error) {
        throw error;
    }
    
}