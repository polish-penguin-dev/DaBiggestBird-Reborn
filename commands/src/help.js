export default async function(interaction) {
    await interaction.createFollowup({
        content: "Ok!",
    });
}
