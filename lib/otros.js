// FUNCIÓN PARA SELECCIONAR UNA FRASE RANDOM Y MOSTRARLA.
//------------------------------------------------------.
exports.frase_random = function()
    {
        const lista_frases = require ("../datos/frases.json");
        let numero_frase =  Math.floor(Math.random()*30)
        return lista_frases.frases[numero_frase];
    }
// FUNCIÓN PARA JUGAR AL TRIVIAL DEL WOW.
//--------------------------------------.
exports.trivial = function (message)
    {
        const quiz = require('../datos/trivial.json');
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        const filter = response => 
            {
                return item.answers.toLowerCase() === response.content.toLowerCase();
            };
        
        message.channel.send(item.question).then(() => 
            {
                message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                    .then(collected => 
                        {
                            message.channel.send(`¡¡¡¡Enhorabuena ${collected.first().author} has acertado!!!!`);
                            message.channel.send("Aqui tienes tu premio, ¡conocimientos extra!:\n ``` "+ item.info + "```");
                        })
                    .catch(collected => 
                        {
                            message.channel.send('Parece que nadie ha acertado la respuesta a tiempo.');
                        });
            });
    }
// FUNCION PARA MOSTRAR UN GIF POR LA ALIANZA.
//-------------------------------------------.
exports.por_la_alianza = function ()
    {
        const imagen_url = require("../datos/imagen.json");
        const Discord = require("discord.js");                                  //Declaramos Discord.js para poder utilizar el mensaje embed
        const mensaje_embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('WoW Bot',imagen_url.url_logo_wow)
            .setTitle ("¡¡¡ POR LA ALIANZA !!!")
            .setThumbnail(imagen_url.url_logo_ali)
            .setImage ("https://media.giphy.com/media/1zJExxElqvk2l8ott3/giphy.gif")
            .setTimestamp()
            .setFooter ("Gracias por utilizar WoW Bot");        
            return mensaje_embed;
        }
// FUNCION PARA MOSTRAR UN GIF POR LA HORDA.
//-------------------------------------------.
exports.por_la_horda = function ()
    {
        const imagen_url = require("../datos/imagen.json");
        const Discord = require("discord.js");                                  //Declaramos Discord.js para poder utilizar el mensaje embed
        const mensaje_embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
            .setTitle ("¡¡¡ POR LA HORDA !!!")
            .setThumbnail(imagen_url.url_logo_horda)
            .setImage ("https://media.giphy.com/media/8vHSt3vau0pFh0ZemM/giphy.gif")
            .setTimestamp()
            .setFooter ("Gracias por utilizar WoW Bot!");        
            return mensaje_embed;
        }
// COMANDO PARA MOSTRAR UN GIF ALEATORIO DE WOW.
// --------------------------------------------.
exports.gif_wow = async function(message)
    {
        const Discord = require("discord.js");
        const imagen_url = require("../datos/imagen.json");
        const api_key = require("../api.json");
        const http = require("http");
        
        let isDone=false;
        let mensaje_embed;

        function niceTry(dataFromApi){
            if(!isDone){
                isDone=true;
                let data = dataFromApi.toString();
                let prueba = data.substring(data.indexOf('images'));
                let gif = prueba.substring(prueba.indexOf('url')+5).split('"')[1].split("?")[0];
                message.channel.send(setMensajeEmbed(gif));
            }
        }
        function setMensajeEmbed(gifUrl){
            let urlBuena=gifUrl.replace(/\\/g,"");
            mensaje_embed = new Discord.MessageEmbed()
            .setColor('#00caca')
            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
            .setTitle ("¡¡¡ POR LA PATATA !!!")
            .setThumbnail(imagen_url.url_logo_wow)
            .setImage(urlBuena)
            .setTimestamp()
            .setFooter ("Gracias por utilizar WoW Bot!");
            return mensaje_embed
        }
        const options =
            {
                hostname: 'api.giphy.com',
                port: 80,
                path: "/v1/gifs/random?api_key="+api_key.giphy+"&tag=Warcraft&username=warcraft",
                method: "GET"
            }
        let response = res=>{            
            return res.on('data',data)
        }
        let data = d => {
//                    message.channel.send (d);
                niceTry(d)
            }
        const req = await http.request(options, response);
        req.on('error',error=> {Console.error(error)})
       
        req.end()
        
    }
// FUNCION PARA SACAR UNA TIRADA DE DADOS DE 1 AL 100.
// --------------------------------------------------.
exports.dados = function()
    {
        const Discord = require("discord.js");
        const imagen_url = require("../datos/imagen.json");
        let frase_titulo = "";
        let tirada_dados =  Math.floor(Math.random() * 100);
        if (tirada_dados == 1)
            {frase_titulo="**Soldado, los dados no son lo tuyo, mejor entrena para el combate.**";}
        if (tirada_dados >1 && tirada_dados <= 25)
            {frase_titulo = "**La suerte no te acompaña, mejor prepara tus armas.**";}
        if (tirada_dados > 25 && tirada_dados <= 50)
            {frase_titulo = "**Una suerte media baja, piensa que siempre puede ser peor.**";}
        if (tirada_dados > 50 && tirada_dados <= 75)
            {frase_titulo = "**No está mal soldado, nada mal, aunque te pueden superar.**";}
        if (tirada_dados > 75 && tirada_dados < 100)
            {frase_titulo = "**Muy buena soldado, pero recuerda, afortunado en el juego ...**";}
        if (tirada_dados == 100)
            {frase_titulo = "**Os presento a la personificación de la Diosa Fortuna.**";}
        mensaje_embed = new Discord.MessageEmbed()
            .setColor('#00caca')
            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
            .setTitle ("TU TIRADA : "+ tirada_dados)
            .setDescription (frase_titulo)
            .setThumbnail(imagen_url.url_logo_wow)
            .setImage("https://media.giphy.com/media/wKXH7bkRB9Wpy/giphy.gif")
            .setTimestamp()
            .setFooter ("Gracias por utilizar WoW Bot!");
        return mensaje_embed;

    }
