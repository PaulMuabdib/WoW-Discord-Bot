const Discord = require("discord.js");                                  //Declaramos Discord.js para poder utilizar el mensaje embed
// FUNCION PARA MOSTRAR LAS BUILDS POR MESAJE PRIVADO AL USUARIO.
//--------------------------------------------------------------.
exports.mensaje_build = function (comando)
    {
        const imagen_url = require("../datos/imagen.json");
        const datos = require("../datos/"+comando+".json");
        const mensaje_embed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
            .setTitle (datos.titulo)
            .setDescription ("Hola soldado, los datos que buscas para tu build estan aqui.")
            .setThumbnail(imagen_url.url_logo_wow)
            .setImage (datos.imagen)
            .addField ("ESTADISTICAS PRINCIPALES:",datos.estadisticas)
            .addField ("GLIFOS PRIMORDIALES:", datos.primordiales)
            .addField ("GLIFOS SUBLIMES:", datos.sublimes)
            .addField ("GLIFOS MENORES:", datos.menores)
            .setTimestamp()
            .setFooter ("Gracias por utilizar WoW Bot");        
        return mensaje_embed;
    }