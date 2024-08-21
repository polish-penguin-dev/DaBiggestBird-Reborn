import "dotenv/config";

//Initialise Firebase
import admin from "firebase-admin";
import account from "./account-key.json" assert { type: "json" };

admin.initializeApp({
    credential: admin.credential.cert(account)
});
  
const db = admin.firestore();

//Initialise Dicord
import { readdirSync } from "fs";
import { commands } from "./commands/commands.js";
import { InteractionTypes, ApplicationCommandTypes, Client } from "oceanic.js";

const client = new Client({
    auth: `Bot ${process.env.token}`,
    gateway: {
        intents: ["GUILDS", "GUILD_MESSAGES"]
    }
});

//Command Handler
const handlers = new Map();
const files = readdirSync("./commands/src").filter(file => file.endsWith(".js"));

for (const file of files) {
    const name = file.split(".")[0];
    const command = await import(`./commands/src/${file}`);
    handlers.set(name, command.default);
}

//Command Deployer
client.on("ready", async () => {
    console.log(`Ready As ${client.user.tag}!`);

    await client.application.bulkEditGlobalCommands(commands);
});

//Command Handler
client.on("interactionCreate", async (interaction) => {
    if (
        interaction.type === InteractionTypes.APPLICATION_COMMAND &&
        interaction.data.type === ApplicationCommandTypes.CHAT_INPUT
    ) {
        //Set-up User In Firestore
        const doc = db.collection(interaction.guildID).doc(interaction.user.id);
        const docSnap = await doc.get();
        if (!docSnap.exists) await doc.set({ "KG": 1, "BS": 0, "MLK": 0, "inventory": {}, "achievements": {} });

        const handler = handlers.get(interaction.data.name);

        if (handler) {
            await interaction.defer();
            await handler(interaction, db);
        }
    }
});

client.connect();