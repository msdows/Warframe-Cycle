const Discord = require('discord.js');
const WarframeWorldState = require('warframe-worldstate-parser');
const axios = require('axios');
const client = new Discord.Client({ intents: ['Guilds', 'GuildMessages', 'GuildVoiceStates', 'MessageContent', 'DirectMessages'] });

client.on('messageCreate', async message => {
    if (message.content === '!ciclos') {
        let cetusMessage, fortunaMessage, vallisMessage, cambionMessage;

        try {
            const response = await axios.get('https://api.warframestat.us/pc');
            const worldState = new WarframeWorldState(JSON.stringify(response.data));

            const cetusCycle = worldState.cetusCycle || {};
            const fortunaCycle = worldState.fortunaCycle || {};
            const vallisCycle = worldState.vallisCycle || {};
            const cambionCycle = worldState.cambionCycle || {};

            cetusMessage = await message.channel.send(`Em cetus agora é ${cetusCycle.isDay ? 'Dia' : 'Noite'}.`);
            fortunaMessage = await message.channel.send(`Em Fortuna agora é ${fortunaCycle.isDay ? 'Dia' : 'Noite'}.`);
            vallisMessage = await message.channel.send(`Em Vallis agora está ${vallisCycle.isWarm ? 'Quente' : 'Frio'}.`);
            cambionMessage = await message.channel.send(`Em Cambion agora é ${cambionCycle.isActive ? 'Dia' : 'Noite'}.`);

            // Atualiza as mensagens a cada 5 minuto
            setInterval(async () => {
                const response = await axios.get('https://api.warframestat.us/pc');
                const worldState = new WarframeWorldState(JSON.stringify(response.data));

                const cetusCycle = worldState.cetusCycle || {};
                const fortunaCycle = worldState.fortunaCycle || {};
                const vallisCycle = worldState.vallisCycle || {};
                const cambionCycle = worldState.cambionCycle || {};

                cetusMessage.edit(`Em Cetus agora é ${cetusCycle.isDay ? 'Dia' : 'Noite'}.`);
                fortunaMessage.edit(`Em Fortuna agora é ${fortunaCycle.isDay ? 'Dia' : 'Noite'}.`);
                vallisMessage.edit(`Em Vallis agora está ${vallisCycle.isWarm ? 'Quente' : 'Frio'}.`);
                cambionMessage.edit(`Em Cambion agora é ${cambionCycle.isActive ? 'Dia' : 'Noite'}.`);
            }, 5 * 60 * 1000); // 5 minuto
        } catch (error) {
            console.error(`Erro ao fazer a solicitação: ${error.message}`);
            console.error(error);
        }
    }
});


client.login('PUT YOUR TOKEN HERE');