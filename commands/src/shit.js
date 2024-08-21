const cooldowns = new Set();

export default async function(interaction, db) {
    if(cooldowns.has(interaction.user.id)) return await interaction.createFollowup({ embeds: [{ "description": "🕒 Uh-Oh! That Command Is On Cooldown! Please Wait! (5m)", "color": 0x05a2e1 }] });

    const doc = db.collection(interaction.guildID).doc(interaction.user.id);
    const docSnap = await doc.get();

    const kg = docSnap.data().KG;
    const bs = docSnap.data().BS;

    if(kg === 1) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Only Have 1KG!", "color": 0x05a2e1 }] });

    let amount = interaction.data.options.getString("amount");
    let intAmount = parseFloat(amount);

    if (amount.toLowerCase() === "all") {
        intAmount = kg - 1;

        await doc.update({
            KG: kg - intAmount,
            BS: bs + intAmount
        }); 

        await interaction.createFollowup({ 
            embeds: [{
                "title": "You Shitted! 💩",
                "description": `-${intAmount}KG +${intAmount}BS`,
                "color": 0x05a2e1
            }]
        });
    } else {
        if(isNaN(intAmount)) return await interaction.createFollowup({ embeds: [{ "title": ":x: Amount Must Be A Number, Or All!", "color": 0x05a2e1 }] });
        if(intAmount < 0) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Must Specify A Positive Number!", "color": 0x05a2e1 }] });
        if(!Number.isInteger(intAmount)) return await interaction.createFollowup({ embeds: [{ "title": ":x: Amount Must Be An Integer/Whole Number!", "color": 0x05a2e1 }] });
        if(intAmount >= kg) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Do Not Have Enough KG!", "color": 0x05a2e1 }] });

        await doc.update({
            KG: kg - intAmount,
            BS: bs + intAmount
        }); 

        await interaction.createFollowup({ 
            embeds: [{
                "title": "You Shitted! 💩",
                "description": `-${intAmount}KG +${intAmount}BS`,
                "color": 0x05a2e1
            }]
        });

        cooldowns.add(interaction.user.id);
        setTimeout(() => { cooldowns.delete(interaction.user.id) }, 300000);
    }
}