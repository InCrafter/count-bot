const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();

bot.on('ready', () =>
{
    console.log('Bot has started.');
    console.log('Logged in as: ' + bot.user.username + '#' + bot.user.discriminator);
    console.log('id: ' + bot.user.id);
    console.log('-------------------------------');
});

bot.on('message', async msg =>
{
    if (msg.author.id !== bot.user.id)
        return;


    if(msg.content.indexOf(config.prefix) !== 0) return;

    const args = msg.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLocaleLowerCase();

    var old_num = 0;

    // Enter the channel ID of the channel where the counting is taking place
    let channel = bot.channels.get("Channel ID");

    function count(){
        // fetch last message
        channel.fetchMessages({limit: 1}).then(messages => {
            let last_msg_author = messages.first();
        

            //check if author isn't us.
            if (!last_msg_author.author.bot) {

                //get last message.
                let last_msg = msg.channel.messages.last();
                console.log('Last message: ' + last_msg.content.toString());


                if(Number(last_msg) === old_num + 1 || old_num === 0)
                {
                    // Send the message
                    if(!isNaN(Number(last_msg))){
                        msg.channel.send(Number(last_msg) + 1);
                        old_num = Number(last_msg) + 1;
                    }
                }
            }
        }
        );
    }

    // Check last message every 1000 milliseconds. can be changed.
    let interval = 1000

    if (command === 'count'){
        // The snippet below can be deleted if you don't want to see the count in the console.
        console.log('[self-bot] started counting in: ' + msg.channel.id);
        setInterval(count, interval);

        //  delete command message after usage.
        msg.delete().catch(O_o=>{});
    }
});

bot.login(config.token);