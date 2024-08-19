import { ApplicationCommandOptionTypes, ApplicationCommandTypes } from "oceanic.js";

export const commands = [
    {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "help",
        description: "A List Of Commands For DaBiggestBird",
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "eat",
        description: "Eat Food To Gain KG",
        options: [
            {
                type: ApplicationCommandOptionTypes.STRING,
                name: "food",
                description: "Please Select A Food Type",
                choices: [
                    {
                        name: "worm",
                        value: "worm"
                    },
                    {
                        name: "weed",
                        value: "weed"
                    },
                    {
                        name: "burger",
                        value: "burger"
                    }
                ],
                required: true
            }
        ],
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "eatuser",
        description: "Eat Another Penguin To Gain 1/2 Of Their KG",
        options: [
            {
                type: ApplicationCommandOptionTypes.USER,
                name: "user",
                description: "Select A User To Eat",
                required: true
            }
        ],
        dmPermission: false
    }
];