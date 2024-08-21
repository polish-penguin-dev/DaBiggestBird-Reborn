const cooldowns = new Set();

export default async function(interaction, db) {
    if(cooldowns.has(interaction.user.id)) return await interaction.createFollowup({ embeds: [{ "description": "🕒 Uh-Oh! That Command Is On Cooldown! Please Wait! (2h)", "color": 0x05a2e1 }] });

    const user = interaction.data.options.getUser("user");

    const executer = db.collection(interaction.guildID).doc(interaction.user.id);
    const executerSnap = await executer.get();
    const executerKg = executerSnap.data().KG;

    const victim = db.collection(interaction.guildID).doc(user.id);
    const victimSnap = await victim.get();

    if(!victimSnap.exists) return await interaction.createFollowup({ embeds: [{ "title": ":x: That Person Is Not Playing!", "footer": {"text": "In Order To Play, A User Must Use At Least 1 DaBiggestBird Command." }, "color": 0x05a2e1}] });
    const victimKg = victimSnap.data().KG;

    if(user.id === interaction.user.id) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Cannot Eat Yourself!", "color": 0x05a2e1 }] });
    if(victimKg === 1) return await interaction.createFollowup({ embeds: [{ "title": ":x: That Person Only Has 1KG!", "color": 0x05a2e1 }] });
    if(victimKg >= executerKg) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Must Have More KG Than That Person!", "color": 0x05a2e1 }] });

    const newExecuterKg = executerKg + Math.round(victimKg / 2);
    const newVictimKg = Math.round(victimKg / 2);

    await executer.update({
        KG: newExecuterKg
    });      
    
    await victim.update({
        KG: newVictimKg
    });

    await interaction.createFollowup({
        embeds: [{
            "title": "Victory! 🎉 🥳",
            "description": `You Ate 1/2 Of <@${user.id}>'s (${Math.round(victimKg / 2)}KG!)`,
            "color": 0x05a2e1
        }]
    });

    cooldowns.add(interaction.user.id);
    setTimeout(() => { cooldowns.delete(interaction.user.id) }, 7200000);
}