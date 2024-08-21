export default async function(interaction, db) {
    const doc = db.collection(interaction.guildID).doc(interaction.user.id);
    const docSnap = await doc.get();
    const mlk = docSnap.data().MLK;
    const kg = docSnap.data().KG;
    const bs = docSnap.data().BS;

    const amount = interaction.data.options.getString("amount");
    const intAmount = parseFloat(amount);
    const currency = interaction.data.options.getString("currency");

    async function convertMlk(intAmount) {
        switch(currency) {
            case "kg":
                const newKg = intAmount * 25;
                const newMilk = mlk - intAmount;

                await doc.update({
                    KG: kg + newKg,
                    MLK: newMilk
                });

                await interaction.createFollowup({ 
                    embeds: [{
                        "title": "You Sold The Milk On The Dark Web! 💻",
                        "description": `+${newKg}KG -${intAmount}MLK`,
                        "color": 0x05a2e1
                    }]
                });
                break;
            case "bs":
                const newBs = intAmount * 50;
                const newMilk2 = mlk - intAmount;

                await doc.update({
                    BS: bs + newBs,
                    MLK: newMilk2
                });

                await interaction.createFollowup({ 
                    embeds: [{
                        "title": "You Sold The Milk On The Dark Web! 💻",
                        "description": `+${newBs}BS -${intAmount}MLK`,
                        "color": 0x05a2e1
                    }]
                });
                break;
        }
    }

    if (amount.toLowerCase() === "all") {
        convertMlk(mlk);
    } else {
        if(isNaN(intAmount)) return await interaction.createFollowup({ embeds: [{ "title": ":x: Amount Must Be A Number, Or All!", "color": 0x05a2e1 }] });
        if(intAmount < 0) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Must Specify A Positive Number!", "color": 0x05a2e1 }] });
        if(!Number.isInteger(intAmount)) return await interaction.createFollowup({ embeds: [{ "title": ":x: Amount Must Be An Integer/Whole Number!", "color": 0x05a2e1 }] });
        if(intAmount > mlk) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Do Not Have Enough MLK!", "color": 0x05a2e1 }] });

        convertMlk(intAmount);
    }
    
}