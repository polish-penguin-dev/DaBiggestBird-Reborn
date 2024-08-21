export default async function(interaction, db) {
    const user = interaction.data.options.getUser("user");

    if(user) {
        const other = db.collection(interaction.guildID).doc(user.id);
        const otherSnap = await other.get();
        if(!otherSnap.exists) return await interaction.createFollowup({ embeds: [{ "title": ":x: That Person Is Not Playing!", "footer": {"text": "In Order To Play, A User Must Use At Least 1 DaBiggestBird Command." }, "color": 0x05a2e1}] });

        const otherData = otherSnap.data();

        await interaction.createFollowup({
            embeds: [{
                "title": `${user.username}'s Statistics`,
                "description": `KG: ${otherData.KG}\nBS: ${otherData.BS}\nMLK: ${otherData.MLK}`,
                "color": 0x05a2e1
            }]
        });
    } else {
        const doc = db.collection(interaction.guildID).doc(interaction.user.id);
        const docSnap = await doc.get();
        const docData = docSnap.data();

        await interaction.createFollowup({
            embeds: [{
                "title": "Your Statistics",
                "description": `KG: ${docData.KG}\nBS: ${docData.BS}\nMLK: ${docData.MLK}`,
                "color": 0x05a2e1
            }]
        });
    }
}