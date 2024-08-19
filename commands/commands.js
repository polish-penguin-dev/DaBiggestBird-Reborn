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
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "shit",
        description: "Shit To Lose KG And Earn BS!",
        options: [
            {
                type: ApplicationCommandOptionTypes.STRING,
                name: "amount",
                description: "Enter Amount Of KG To Shit (Or All)",
                required: true
            }
        ],
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "poop",
        description: "Poop To Immediately Lose 1KG and earn 1BS",
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "stats",
        description: "Check Your Or Another User's Statistics",
        options: [
            {
                type: ApplicationCommandOptionTypes.USER,
                name: "user",
                description: "Specify If Checking Another User's Statistics",
            }
        ],
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "milk",
        description: "Milk Another User To Gain Milk",
        options: [
            {
                type: ApplicationCommandOptionTypes.USER,
                name: "user",
                description: "Specify A User To Milk",
                required: true
            }
        ],
        dmPermission: false
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "sellmilk",
        description: "Sell Milk On The Dark Web For KG/BS",
        options: [
            {
                type: ApplicationCommandOptionTypes.STRING,
                name: "amount",
                description: "Enter Amount Of Milk To Sell (Or All)",
                required: true
            }, {
                type: ApplicationCommandOptionTypes.STRING,
                name: "currency",
                description: "Enter Currency To Convert Milk Into",
                choices: [
                    {
                        name: "kg",
                        value: "kg"
                    }, 
                    {
                        name: "bs",
                        value: "bs"
                    }
                ],
                required: true
            }
        ],
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "shop",
        description: "Buy Something To Progress In The Game",
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "inventory",
        description: "Check Your Items Purchased From The Shop",
        options: [
            {
                type: ApplicationCommandOptionTypes.USER,
                name: "user",
                description: "Specify If Checking Another User's Inventory",
            }
        ],
        dmPermission: true
    }, {
        type: ApplicationCommandTypes.CHAT_INPUT,
        name: "rob",
        description: "Rob Someone To Steal Their BS/Milk Bottles",
        options: [
            {
                type: ApplicationCommandOptionTypes.USER,
                name: "user",
                description: "Specify User To Rob",
                required: true
            }
        ],
        dmPermission: false
    }
];