import "dotenv/config";
import { readdirSync } from "fs";
import { commands } from "./commands/commands.js";
import { InteractionTypes, ApplicationCommandTypes, Client } from "oceanic.js";

const client = new Client({
    auth: `Bot ${process.env.token}`,
    gateway: {
        intents: ["GUILDS", "GUILD_MESSAGES"]
    }
});

const handlers = new Map();
const files = readdirSync("./commands/src").filter(file => file.endsWith(".js"));

for (const file of files) {
    const name = file.split(".")[0];
    const command = await import(`./commands/src/${file}`);
    handlers.set(name, command.default);
}

client.on("ready", async () => {
    console.log(`Ready As ${client.user.tag}!`);

    await client.application.bulkEditGlobalCommands(commands);
});

client.on("interactionCreate", async (interaction) => {
    if (
        interaction.type === InteractionTypes.APPLICATION_COMMAND &&
        interaction.data.type === ApplicationCommandTypes.CHAT_INPUT
    ) {
        const handler = handlers.get(interaction.data.name);

        if (handler) {
            await interaction.defer();
            await handler(interaction);
        }
    }
});

client.connect();