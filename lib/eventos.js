const fs = require("fs");
const api_key = require("../api.json");
const respuesta  = require('request-libcurl'); 
const identificacion = api_key.blizzardID+':'+api_key.blizzardSecret
const imagen_url = require("../datos/imagen.json");
const Discord = require("discord.js");
let token = null;

class Evento
    {
        constructor (fecha,hora,gs,nombre)
            {
                this.fecha = fecha;
                this.hora = hora;
                this.gs = gs;
                this.nombre = nombre;
                this.lista_tanques = [];
                this.lista_heals = [];
                this.lista_dps = [];
            }        
    }

exports.crear_evento = function(message,fecha,hora,gs,nombre)
    {   
        let eventos;        
        try {eventos = require('../datos/eventos-'+message.guild.id+'.json');}
        catch {fs.appendFileSync('./datos/eventos-'+message.guild.id+'.json', '[]' , 'utf8');} 
        eventos = require('../datos/eventos-'+message.guild.id+'.json');        
        if  (eventos.length >= 10)
            {message.channel.send ('Ya has llenado el cupo de 10 eventos, borra algunos para poder crear nuevos');return;}
        if (!fecha || !hora || !gs || !nombre)
            {message.channel.send ('Debe intrducir fecha, hora, GearScore minimo y nombre para crear el evento');return;}
        
        let comprobacion_fecha = comprobar_fecha (fecha);
        if (comprobacion_fecha != 'OK')            
            {message.channel.send (comprobacion_fecha);return;}
        
        let comprobacion_hora = comprobar_hora(hora);
        if (comprobacion_hora != 'OK')            
            {message.channel.send (comprobacion_hora);return;}
        
        let comprobacion_gs = comprobar_gs (gs);
        if (comprobacion_gs != 'OK')
            {message.channel.send(' El GearScore tiene que estar entre 0 y 999');return;}
        let parse_gs = parseInt(gs, 10);
        const evento = new Evento (fecha,hora,parse_gs,nombre)       
        eventos.push(evento);        
        textoDatos = JSON.stringify(eventos, null, 1);                
        fs.writeFileSync("./datos/eventos-"+message.guild.id+".json", textoDatos);
        return;
        
        function comprobar_fecha(fecha)
            {
                let d = false;
                let m = false;
                let a = false;
                let mensaje_fecha = 'OK';
                if (fecha.charAt (2) != '/' || fecha.charAt(5) != '/' || fecha.length > 10)
                    {mensaje_fecha = 'El formato de la fecha debe de ser DD/MM/AAAA';}
                else
                    {
                        let dia = fecha.substring(0,2);
                        let mes = fecha.substring(3,5);
                        let año = fecha.substring(6,fecha.length);
                        let hoy = new Date();                        
                        let comparar = new Date(año,mes-1,dia);                        
                        if (comparar < hoy)
                            {mensaje_fecha = 'La fecha introducida pertenece al pasado.'}                    
                        if (dia > 0 && dia <= 31)
                            {d = true;}
                        if (mes > 0 && mes <= 12)
                            {m = true;}
                        if (año >= 2020 && año < 2050)
                            {a = true;}                        
                        if (a != true || m != true || d != true)
                            {mensaje_fecha = 'La fecha intoducida no es correcta.';}
                    }
                return mensaje_fecha;
            }
        function comprobar_hora (hora)
            {
                let h = false;
                let m = false;
                let mensaje_hora = 'OK';
                if (hora.charAt (2) != ':' || hora.length < 5 || hora.length > 5)
                    {mensaje_hora = 'El formato de la hora debe de ser hh:mm';}
                else
                    {                        
                        let horas = hora.substring(0,2);
                        let minutos = hora.substring(3,hora.length);
                        if (horas >= 0 && horas < 24)
                            {h = true;}
                        if (minutos >= 0 && minutos < 60)
                            {m = true;}
                        if (h != true || m != true)
                            {mensaje_hora = 'La hora introducida no es correcta.';}                        
                    }
                return mensaje_hora;
            }
        function comprobar_gs (gs)
            {
                let mensaje_gs = 'OK';
                let parse_gs = parseInt(gs, 10);               
                if ( isNaN(parse_gs) )
                    {
                        mensaje_gs = 'El GearScore debe ser un número entre 0 y 999';
                    }
                else
                    {
                        if (parse_gs < 0 || parse_gs > 999 || parse_gs == 'NaN' || parse_gs == undefined || gs.length > 3)
                            {
                                mensaje_gs = ' El GearScore tiene que estar entre 0 y 999';
                            }
                    }
                return mensaje_gs;
                
            }
    }

exports.listar_eventos = function (message)
    {
        let eventos;     
        try {eventos = require('../datos/eventos-'+message.guild.id+'.json');}
        catch {fs.appendFileSync('./datos/eventos-'+message.guild.id+'.json', '[]' , 'utf8');} 
        eventos = require('../datos/eventos-'+message.guild.id+'.json');
        if (eventos.length == 0)
            {message.channel.send ('Ningún evento creado por el momento.')}
        else
            {
                let mensaje = '';
                for (i in eventos)
                    {
                        mensaje = mensaje+'ID: **'+ i +'** => **'+eventos[i].nombre+'** -> **'+eventos[i].fecha+'** -> **'+eventos[i].hora+'** -> GearScore mínimo: **'+eventos[i].gs+'**\n';
                    }
                message.channel.send (mensaje);
            }
        return;
    }

exports.borrar_evento = function (message, id)
    {        
        let eventos;     
        try {eventos = require('../datos/eventos-'+message.guild.id+'.json');}
        catch {fs.appendFileSync('./datos/eventos-'+message.guild.id+'.json', '[]' , 'utf8');} 
        eventos = require('../datos/eventos-'+message.guild.id+'.json');
        if (id < eventos.length)
            {
                eventos.splice (id,1);
                textoDatos = JSON.stringify(eventos, null, 1);                
                fs.writeFileSync("./datos/eventos-"+message.guild.id+".json", textoDatos);          
                message.channel.send('Evento eliminado.')
            }
        else 
            {message.channel.send('Evento no encontrado, revisa la lista de eventos');}
        return;      
    }

exports.apuntarse = async function(message,evento,puesto,personaje,servidor)
    {
        try {eventos = require('../datos/eventos-'+message.guild.id+'.json');}
        catch {fs.appendFileSync('./datos/eventos-'+message.guild.id+'.json', '[]' , 'utf8');} 
        eventos = require('../datos/eventos-'+message.guild.id+'.json');
        evento = parseInt(evento,10);
        if (isNaN(evento))
            {message.channel.send('Evento no encontrado, revisa la lista de eventos');return;}
        if (!personaje || !servidor || !puesto || !evento)
            {message.channel.send('Se necesita: el id del evento, el puesto a ocupar (dps,tanque o heal), un nombre de personaje y un reino.');return;}    
        if (evento > eventos.length)
            {message.channel.send('Evento no encontrado, revisa la lista de eventos');return;}
        if (puesto.toLowerCase() != 'dps' && puesto.toLowerCase() != 'heal' && puesto.toLowerCase() != 'tanque' )
            {message.channel.send('El puesto a ocupar debe ser dps, heal o tanque, revisa que lo has escrito bien y vuelve a intentarlo.');return;}
        else
            {
                let gs = 0;        
                get_token(function ()
                    {
                        respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/equipment?namespace=profile-eu&locale=es_ES&access_token='+token},(error,resp)=>
                            {
                                if (error)
                                    {console.log ('Nooooooooooooooooooo')}
                                else
                                    {
                                        if (resp.statusCode == 200)
                                            {  
                                                let datos = JSON.parse(resp.body);                                        
                                                for (i=0; i <datos.equipped_items.length; i++)
                                                    { gs = gs + datos.equipped_items[i].level.value }
                                                gs = gs/datos.equipped_items.length
                                                if (gs >= eventos[evento].gs)
                                                    {
                                                        if (puesto == 'tanque')
                                                            {eventos[evento].lista_tanques.push(personaje);}                                                            
                                                        if (puesto == 'heal')
                                                            {eventos[evento].lista_heals.push(personaje);}
                                                        if (puesto == 'dps')                                                        
                                                            {eventos[evento].lista_dps.push(personaje);}                                                        
                                                        let textoDatos = JSON.stringify(eventos, null, 1);                
                                                        fs.writeFileSync("./datos/eventos-"+message.guild.id+".json", textoDatos);
                                                        message.channel.send('¡Apuntado con éxito, suerte en el evento!');
                                                    }
                                                else
                                                    {message.channel.send('No cumples el requisito de GearScore');}
                                                return;
                                            }
                                        else
                                            {
                                                message.channel.send('Ha fallado la búsqueda de personaje y/o reino, comprueba que esté bien escrito y vuelve a intentarlo.'); 
                                                return;
                                            }
                                    }                        
                            })
                    })        
            }
  
    }

exports.ver_evento = function(message,id)
    {
        if (!id)
            {message.channel.send('Introduce el id del evento, por favor');return;}
        id = parseInt(id, 10);
        if (isNaN (id) )
            {message.channel.send('Id no válido, revise los id`s'); return;}
        try {eventos = require('../datos/eventos-'+message.guild.id+'.json');}
        catch {fs.appendFileSync('./datos/eventos-'+message.guild.id+'.json', '[]' , 'utf8');} 
        eventos = require('../datos/eventos-'+message.guild.id+'.json');
        
        if (id<0 || id > eventos.length)
            {message.channel.send('Id no válido, revise los id`s'); return;}
        if (id >= eventos.length)
            {message.channel.send('Evento no encontrado, revise los id`s.');return;}
        let dpss = "";
        let heals = "";
        let tanques = "";
        if (eventos[id].lista_dps.length > 0)
            {
                for (i in eventos[id].lista_dps)
                    {dpss = dpss+eventos[id].lista_dps[i]+' '; }
            }        
        if (eventos[id].lista_heals.length > 0)
            {
                for (i in eventos[id].lista_heals)
                    {heals = heals+eventos[id].lista_heals[i]+' '; }
            }
        if (eventos[id].lista_tanques.length > 0)
            {
                for (i in eventos[id].lista_tanques)
                    {tanques = tanques+eventos[id].lista_tanques[i]+' '; }  
            }
        if (tanques == "")
            {tanques = "Ninguno";} 
        if (heals == "")
            {heals = "Ninguno";} 
        if (dpss == "")
            {dpss = "Ninguno";}
        const mensaje_embed = new Discord.MessageEmbed()
            .setColor('#00CACA')
            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
            .setTitle ('ID: '+id+' => '+eventos[id].nombre)
            .setDescription ('Día: '+eventos[id].fecha+' Hora: '+eventos[id].hora+' GearScore: '+eventos[id].gs)
            .setThumbnail(imagen_url.url_logo_wow)
            .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow)
            .addField ('TANQUES', tanques)
            .addField ('HEALERS', heals)
            .addField ('DPS', dpss);
        message.channel.send(mensaje_embed);
        return;
    }

async function get_token (funcion_parametros)   // FUNCION PARA SOLICITAR EL TOKEN DE LA API DEL BLIZZ
    {   
        if (token == null)
            {
                const opciones = 
                    {
                        method: 'POST',
                        url: 'https://us.battle.net/oauth/token',
                        auth: identificacion,
                        form: 'grant_type=client_credentials'
                    }        
                respuesta(opciones, (error,resp) =>
                    {
                        if (error)
                            { console.log ('esto no funciona')}
                        else
                            {
                                token = resp.body.substring(17,51);                                                                
                                funcion_parametros();
                            }
                    })
            }
        else 
            {funcion_parametros ()}
    }
 