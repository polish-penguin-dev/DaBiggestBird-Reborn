const cooldowns = new Set();

export default async function(interaction, db) {
    if(cooldowns.has(interaction.user.id)) return await interaction.createFollowup({ embeds: [{ "description": "🕒 Uh-Oh! That Command Is On Cooldown! Please Wait! (2h)", "color": 0x05a2e1 }] });

    function chance() {
        return Math.random() < 0.5;
    }
      
    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const user = interaction.data.options.getUser("user");

    const executer = db.collection(interaction.guildID).doc(interaction.user.id);
    const executerSnap = await executer.get();
    const executerMlk = executerSnap.data().MLK;

    const victim = db.collection(interaction.guildID).doc(user.id);
    const victimSnap = await victim.get();

    if(!victimSnap.exists) return await interaction.createFollowup({ embeds: [{ "title": ":x: That Person Is Not Playing!", "footer": {"text": "In Order To Play, A User Must Use At Least 1 DaBiggestBird Command." }, "color": 0x05a2e1}] });
    const victimKg = victimSnap.data().KG;

    if(user.id === interaction.user.id) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Cannot Milk Yourself!", "color": 0x05a2e1 }] });
    if(victimKg < 6) return await interaction.createFollowup({ embeds: [{ "title": ":x: That Person Needs At Least 6KG!", "color": 0x05a2e1 }] });

    const milkChance = chance();

    if(milkChance){
        const bottles = randomNumber(1, 5);
        await executer.update({
            MLK: executerMlk + bottles
        }); 

        await victim.update({
            KG: victimKg - bottles
        });

        interaction.createFollowup({
            embeds: [{
                "title": "You Milked Them! 🥛 🐄",
                "description": `You Milked <@${user.id}> For ${bottles}MLK And They Lost ${bottles}KG In Water Weight!`,
                "color": 0x05a2e1
            }]
        });

        cooldowns.add(interaction.user.id);
        setTimeout(() => { cooldowns.delete(interaction.user.id) }, 7200000);
    } else {
        interaction.createFollowup({
            embeds: [{
                "title": "You Got Caught! 😭 😔",
                "description": `You Got Caught While Trying To Milk <@${user.id}>, And Were Put Into A Hospitalised State! Better Luck Next Time!`,
                "color": 0x05a2e1
            }]
        });

        cooldowns.add(interaction.user.id);
        setTimeout(() => { cooldowns.delete(interaction.user.id) }, 7200000);
    }
}