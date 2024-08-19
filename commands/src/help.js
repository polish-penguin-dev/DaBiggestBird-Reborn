export default async function(interaction) {
    await interaction.createFollowup({
        embeds: [
            {
                "title": "DaBiggestBird Commands",
                "description": "Here Is A List Of Commands For DaBiggestBird.\n\n__**General Information**__\nThe Aim Of The Game Is To Be The Biggest/Fattest Bird In The Server.\nThere Are Three Currencies - KG/Kilograms, BS/Bird Shit, MLK/Milk.\nParameters Enclosed In </> Are **Required**. Paramaters In (/) Are **Optional**.\nNot All Commands Can Be Used In DM.\n\n__**Commands**__",
                "fields": [
                  {
                    "name": "help",
                    "value": "Returns A List Of\nCommands About\nDaBiggetsBird.",
                    "inline": true
                  },
                  {
                    "name": "eat <food>",
                    "value": "Eat Food To Gain KG. \nFood Values Include:\nWorm, Weed, Burger.\nBurger Requires Factory\nItem.",
                    "inline": true
                  },
                  {
                    "name": "eatuser <user>",
                    "value": "Eat Another User \nTo Steal Half Of\nTheir KG For Yourself.\nCannot Be Used On \nPeople With < 1KG.",
                    "inline": true
                  },
                  {
                    "name": "shit <amount>",
                    "value": "Shit A Certain Amount\nOf KG To Earn BS. \n<amount> Can Be A\nNumber Or 'All'.",
                    "inline": true
                  },
                  {
                    "name": "poop",
                    "value": "Immediately Lose 1KG\nAnd Gain 1BS With No\nCooldown.",
                    "inline": true
                  },
                  {
                    "name": "stats (user)",
                    "value": "Check Your Statistics \n(KG, BS, MLK) Or \nPossibly Another\nUser's.",
                    "inline": true
                  },
                  {
                    "name": "milk <user>",
                    "value": "Milk Another User\nTo Gain MLK, Which\nCan Then Be Sold.",
                    "inline": true
                  },
                  {
                    "name": "sellmilk <am..> <curr...>",
                    "value": "Sell Your Milk On The\nDark Web For KG/BS.",
                    "inline": true
                  },
                  {
                    "name": "shop",
                    "value": "Buy Items To Protect \nYourself And Progress\nIn The Game.",
                    "inline": true
                  },
                  {
                    "name": "Inventory (user)",
                    "value": "Check Your Inventory\n(Shop Purchases) Or\nAnother User's.",
                    "inline": true
                  },
                  {
                    "name": "Rob <user>",
                    "value": "Rob Someone To Steal Their\nBS/Milk Bottles.\nThere Is A Chance Of \nGetting Caught And Punished.",
                    "inline": true
                  },
                  {
                    "name": "Coming Soon",
                    "value": "DaBiggestBird V5 Is Still\nA Work In Progress!\nThere Are Many More\nCommands Yet To Implement And Add!",
                    "inline": true
                  }
                ],
                "color": 0x05a2e1,
                "footer": {
                  "text": "Made With 💖 By Penguins184."
                }
              }
        ]
    });
}
