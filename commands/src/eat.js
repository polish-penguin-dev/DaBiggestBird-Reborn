const wormCooldowns = new Set();
const weedCooldowns = new Set();

export default async function(interaction, db) {
    const doc = db.collection(interaction.guildID).doc(interaction.user.id);
    const docSnap = await doc.get();

    const kg = docSnap.data().KG;

    function randomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function response(amount) {
        const responses = ["That Was A Very Small", "That Was A Medium-Sized", "That Was A Very Large"];

        if(amount <= 2) return responses[0];
        if(amount === 3 || amount === 4) return responses[1];
        if(amount >= 5) return responses[2];
    }

    const food = interaction.data.options.getString("food");
    switch(food) {
        case "worm":
            if(wormCooldowns.has(interaction.user.id)) return await interaction.createFollowup({ embeds: [{ "description": "🕒 Uh-Oh! That Command Is On Cooldown! Please Wait! (5s)", "color": 0x05a2e1 }] });
            wormCooldowns.add(interaction.user.id);
            setTimeout(() => { wormCooldowns.delete(interaction.user.id) }, 5000);

            let amount1 = randomNumber(1, 3);
            await doc.update({
                KG: kg + amount1
            });        

            await interaction.createFollowup({
                embeds: [{
                    "title": "You Ate A Worm!",
                    "description": `+${amount1}KG. ${response(amount1)} Worm 🪱!`,
                    "color": 0x05a2e1
                  }]
            });
            break;
        case "weed":
            if(weedCooldowns.has(interaction.user.id)) return await interaction.createFollowup({ embeds: [{ "description": "🕒 Uh-Oh! That Command Is On Cooldown! Please Wait! (10s)", "color": 0x05a2e1 }] });
            weedCooldowns.add(interaction.user.id);
            setTimeout(() => { weedCooldowns.delete(interaction.user.id) }, 5000);

            let amount2 = randomNumber(3, 6);
            await doc.update({
                KG: kg + amount2
            });

            await interaction.createFollowup({
                embeds: [{
                    "title": "You Ate A Weed!",
                    "description": `+${amount2}KG. ${response(amount2)} Weed 🍃!`,
                    "color": 0x05a2e1
                  }]
            });
            break;
        case "burger":
            await interaction.createFollowup({ content: "W.I.P" });
            break;
    }
}