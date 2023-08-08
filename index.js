const Discord = require("discord.js");
const { url } = require("inspector");
const { SlashCommandBuilder } = require("@discordjs/builders");
const Client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
    ]
});

/////ID Roles \\\\\\
// Nouveau Membre -> 1007407498816401538

// Modo -> 858510678364913675

// Test -> 1008104098568081419

// Membre lvl 5 -> 858517633972174858
// Membre lvl 10 -> 860283904010223687
// Membre lvl 20 -> 860284080280961044
// Membre lvl 30 -> 860284232416493588
// Membre lvl 40 -> 1007408497245307012
// Membre lvl 50 -> 1007407002735091723
// Membre lvl 100 -> 1007425894064857159

//Différents ID
const theo = "533997209226575873";

const degand = "526685040185180180";

const test = "858646488496996392";

//prefixe de commande !
const prefix = "!";

const streamer = new SlashCommandBuilder()
    .setName("streamer")
    .setDescription("Permet d'accéder à la chaine d'un streamer au choix qui est sur le serveur.")
    .addUserOption(option => option
        .setName("utilisateur")
        .setDescription("Utilisateur que tu souhaites mentionner")
        .setRequired(true));

Client.on("ready", () => {
    Client.application.commands.create(streamer);
    console.log("bot opérationnel")
});

//const Discord = require("discord.js");
//const fs = require("fs");
//const client = new Discord.Client();

//const listUpdate = require("./videosUpdate");
//const listJson = require("./youtube.json");

Client.login("ODYxNzM0MDkxMjU4OTg2NTA2.GDKto4.E2oFbXQQeuNsrW-NGqTCvHHCoaXhYoWMR_mFdM")

//Arrivées
Client.on("guildMemberAdd", member => {
    Client.channels.cache.get("1008027127754526720").send("<@" + member.id + ">" + " est arrivé !")
    var memberrole = Boolean(false);
    
    //Roles Théo
    if(member.id === theo){
        member.roles.add("1007407498816401538")
        member.roles.add("858510678364913675")
        member.roles.add("858523009097793556")
        var memberrole = false;
    }
    //Role Robin Degand
    else if(member.id === degand){
        member.roles.add("1007407498816401538")
        member.roles.add("858523009097793556")
        var memberrole = false;
    }
    //Role Test
    else if(member.id === test){
        member.roles.add("1008104098568081419")
        var memberrole = false;
    };

        if(memberrole == true){
            member.roles.add("1007407498816401538");
        }

        else {
            console.log("Un nouveau membre est arrivé sur le serveur !");
        }
});


//Départs
Client.on("guildMemberRemove", member => {
    Client.channels.cache.get("1008027127754526720").send("<@" + member.id + ">" + " vient de partir.")
});

Client.on("InteractionCreate", interaction => {
    if(interaction.isCommand()){
        if(interaction.commandName === "streamer "){
            let user = interaction.option.getUser(interaction.user.username);
  
            if(user != undefined){
                if(user.id === theo){
                    interaction.reply("Voici sa chaîne Twitch → https://twitch.tv/Xstheo")
                }
                if(user.id === degand){
                    interaction.reply("Voici sa chaîne Youtube → https://www.youtube.com/channel/UCCxXx-pdsKOtelaNCYSuqdw")
                }
            }
            else{
                interaction.reply({ content:"Vous n'avez pas séléctionner de streamer", ephemeral: true });
            }
        }
    }
});

Client.on("messageCreate", message => {
    if (message.author.bot) return;

//!help
else if(message.content === prefix + "help"){
    const embed1 = new Discord.MessageEmbed()
        .setColor("DARKER_GREY")
        .setTitle("**__Listes des commandes de SlaizBot :__**")
        .addField("!help", "→ affiche toutes les commandes que tu peux utilisées sur le serveur")
        .addField("!youtube", "→ ouvre un lien direct vers ma chaîne Youtube")
        .addField("!twitch", "→ ouvre un lien direct vers ma chaîne Twitch")
        .addField("!streamers", "→ ouvre une page avec toutes les chaînes des streamers qui sont sur le serveur")
        .setFooter("Si tu as encore besoin d'aide n'hésite pas a contacter le staff via un tickets😉");
    message.channel.send({ embeds: [embed1]});
}
//!Youtube
else if(message.content === prefix + "youtube"){
    const embed2 = new Discord.MessageEmbed()
        .setColor("#f00020")
        .setTitle("Appui ici pour aller sur ma chaîne Youtube")
        .setURL("https://www.youtube.com/channel/UCTrwCUVLfkKRRXvCMgHeWVg")
        .setAuthor("Chaîne de Slaizer")
    message.channel.send({ embeds: [embed2]});
}
//!Twitch
else if(message.content === prefix + "twitch"){
    const embed3 = new Discord.MessageEmbed()
        .setColor("#7F00FF")
        .setTitle("Appui ici pour accéder à ma chaîne Twitch")
        .setURL("https://www.twitch.tv/slaiizerr")
        .setAuthor("Chaîne de Slaizer");
    message.channel.send({ embeds: [embed3]});
}
//Commande affichage liste streamers
else if(message.content === prefix + "streamers"){
    const embed6 = new Discord.MessageEmbed()
        .setColor("DARK_RED")
        .setTitle("**__Listes des streamers qui sont sur le serveur :__**")
        .addField("Slaizer", "→ Twitch : https://twitch.tv/slaiizerr |   Youtube : https://www.youtube.com/@Slaiizerr")
        .addField("XsThéo", "→ https://twitch.tv/XsThéo | Youtube : https://www.youtube.com/@xstheo")
        .addField("EXALEYES_YT", "→ https://www.youtube.com/channel/UCCxXx-pdsKOtelaNCYSuqdw")
        .setFooter("N'hésite pas à aller faire un tour sur les chaînes pour découvrir tout le monde !");
    message.channel.send({ embeds: [embed6]});
}
});
