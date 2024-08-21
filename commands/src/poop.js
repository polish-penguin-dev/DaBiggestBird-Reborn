export default async function(interaction, db) {
    const doc = db.collection(interaction.guildID).doc(interaction.user.id);
    const docSnap = await doc.get();

    const kg = docSnap.data().KG;
    const bs = docSnap.data().BS;
    if(kg === 1) return await interaction.createFollowup({ embeds: [{ "title": ":x: You Only Have 1KG!", "color": 0x05a2e1 }] });

    await doc.update({
        KG: kg - 1,
        BS: bs + 1
    }); 

    await interaction.createFollowup({ 
        embeds: [{
            "title": "You Pooped! 💩",
            "description": `-1KG +1BS`,
            "color": 0x05a2e1
        }]
    });
}