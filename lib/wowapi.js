const Discord = require("discord.js");
const api_key = require("../api.json");
const imagen_url = require("../datos/imagen.json");

var token = null;
const respuesta  = require('request-libcurl'); 
const identificacion = api_key.blizzardID+':'+api_key.blizzardSecret
const ITEMS_JSON = require ("../datos/items.json"); 

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
    
exports.get_stats = async function(message,personaje,servidor)  // FUNCIÓN EXPORTABLE PARA MOSTRAR LOS STATS DE UN PJ
    {
        if (!personaje || !servidor)
            {message.channel.send ('Es necesario un nombre de personaje y el servidor');return;}
        servidor.replace (' ', '-');
        get_token(function ()
            {
                respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/statistics?namespace=profile-eu&locale=es_ES&access_token='+token},(error,resp)=>
                {
                    if (error)
                        {console.log ('Nooooooooooooooooooo')}
                    else
                        {
                            if (resp.statusCode == 200)
                                {
                                    let datos = JSON.parse(resp.body);
                                    respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/character-media?namespace=profile-eu&locale=es_ES&access_token='+token},(error2,resp2)=>
                                        {                                            
                                            let datos2 = JSON.parse(resp2.body);
                                            respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'?namespace=profile-eu&locale=es_ES&access_token='+token},(error3,resp3)=>
                                                {
                                                    let faccion = imagen_url.url_logo_wow;
                                                    let datos3 = JSON.parse(resp3.body);
                                                    let descripcion =   "Hola soldado, aquí tienes el informe que has solicitado de "+datos.character.name+":\n"+
                                                                        "Género: **"+datos3.gender.name+"**\n"+
                                                                        "Raza: **"+datos3.race.name+"**\n"+
                                                                        "Clase: **"+datos3.character_class.name+"**\n"+
                                                                        "Rama activa: **"+datos3.active_spec.name+"**";

                                                    if (datos3.faction.type == "ALLIANCE")
                                                        {faccion = imagen_url.url_logo_ali}
                                                    else
                                                        {faccion = imagen_url.url_logo_horda}                                                     
                                                    const mensaje_embed = new Discord.MessageEmbed()
                                                        .setColor('#00CACA')
                                                        .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                        .setTitle ('ESTADISTICAS DE: '+datos.character.name)
                                                        .setDescription (descripcion)
                                                        .setThumbnail(faccion)
                                                        .setImage (datos2.render_url)
                                                        .addField ("General:", '**Salud**: '+datos.health+'\n'+
                                                                            '**'+datos.power_type.name+'**: '+datos.power)
                                                        .addField ("Atributos:", '** Fuerza **->'+ datos.strength.effective+'\n'+
                                                                                '** Agilidad **-> '+ datos.agility.effective+'\n'+
                                                                                '** Intelecto **-> '+ datos.intellect.effective+'\n'+
                                                                                '** Aguante **-> '+ datos.stamina.effective+'\n'+
                                                                                '** Versatilidad **-> '+ datos.versatility+'\n'+
                                                                                '** Maestría **->'+ Math.round(datos.mastery.value)+'\n'+
                                                                                '** Parasitar **->'+datos.lifesteal.value)
                                                        .addField ("Fisico: ",   '** Poder de ataque **-> '+datos.attack_power+'\n'+
                                                                                '** Daño mano principal (min/max) **-> '+Math.round(datos.main_hand_damage_min)+'/'+Math.round(datos.main_hand_damage_max)+'\n'+
                                                                                '** Daño mano secundaria (min/max) **-> '+Math.round(datos.off_hand_damage_min)+'/'+Math.round(datos.off_hand_damage_max)+'\n'+
                                                                                '** D.P.S. mano principal **-> '+Math.round(datos.main_hand_dps)+'\n'+
                                                                                '** D.P.S. mano secundaria **-> '+Math.round(datos.off_hand_dps)+'\n'+
                                                                                '** Crítico rango **-> '+Math.round(datos.ranged_crit.value)+'%\n'+
                                                                                '** Celeridad rango **-> '+Math.round(datos.ranged_haste.value)+'%\n'+
                                                                                '** Velocidad mano principal **-> '+datos.main_hand_speed+'\n'+                                                                 
                                                                                '** Velocidad mano secundaria **-> '+datos.off_hand_speed)
                                                        .addField ("Magicos:",  '** Poder de hechizos **-> '+datos.spell_power+'\n'+
                                                                                '** Penetración **-> '+ datos.spell_penetration+'\n'+
                                                                                '** Celeridad **-> '+ Math.round(datos.spell_haste.value)+'%\n'+
                                                                                '** Crítico **-> '+Math.round(datos.spell_crit.value)+'%\n'+
                                                                                '** Regeneración maná **->' +datos.mana_regen)
                                                        .addField ("Defensas:", '** Armadura **-> '+ datos.armor.effective+'\n'+
                                                                                '** Esquivar **-> '+ Math.round(datos.dodge.value)+'\n'+
                                                                                '** Parada **-> '+ Math.round(datos.parry.value)+'\n'+
                                                                                '** Bloqueo **-> '+ Math.round(datos.block.value))
                                                        .setTimestamp()
                                                        .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);  
                                                    message.channel.send (mensaje_embed);})
                                        })
                                }
                            else
                                {message.channel.send('No hemos encontrado a '+personaje+' en '+servidor+'. ¿Estás seguro de que existe y que está bien escrito?')}
                        }
                })                
            })            
    }
exports.get_equipo = async function(message,personaje,servidor)     // FUNCIÓN EXPORTABLE PARA MOSTRAR LA EQUIPACIÓN DE UN PJ
    {
        if (!personaje || !servidor)
            {message.channel.send ('Es necesario un nombre de personaje y el servidor');return;}
        servidor.replace (' ', '-');
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
                                    respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/character-media?namespace=profile-eu&locale=es_ES&access_token='+token},(error2,resp2)=>
                                        {                                            
                                            let datos2 = JSON.parse(resp2.body);
                                            let gs = 0;
                                            respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'?namespace=profile-eu&locale=es_ES&access_token='+token},(error3,resp3)=>
                                                {
                                                    let faccion = imagen_url.url_logo_wow;
                                                    let datos3 = JSON.parse(resp3.body);
                                                    let descripcion =   "Hola soldado, aquí tienes el informe que has solicitado de "+datos.character.name+":\n"+
                                                                        "Género: **"+datos3.gender.name+"**\n"+
                                                                        "Raza: **"+datos3.race.name+"**\n"+
                                                                        "Clase: **"+datos3.character_class.name+"**\n"+
                                                                        "Rama activa: **"+datos3.active_spec.name+"**";

                                                    if (datos3.faction.type == "ALLIANCE")
                                                        {faccion = imagen_url.url_logo_ali}
                                                    else
                                                        {faccion = imagen_url.url_logo_horda}
                                                    const mensaje_embed = new Discord.MessageEmbed()
                                                        .setColor('#00CACA')
                                                        .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                        .setTitle ('EQUIPACIÓN DE: '+datos.character.name)
                                                        .setDescription (descripcion)
                                                        .setThumbnail(faccion)
                                                        .setImage (datos2.render_url)
                                                        .setTimestamp()
                                                        .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);  
                                                        for (i=0; i <datos.equipped_items.length; i++)
                                                            {                                                        
                                                                mensaje_embed.addField (datos.equipped_items[i].inventory_type.name,'**'+datos.equipped_items[i].name+'** Nivel de Objeto: '+datos.equipped_items[i].level.value);
                                                                gs = gs + datos.equipped_items[i].level.value
                                                            }
                                                        gs = gs/datos.equipped_items.length
                                                        mensaje_embed.addField ("**GearScore:**", '**'+Math.round(gs) +'**')
                                                    message.channel.send (mensaje_embed);})
                                                })
                                        }
                            else
                                {message.channel.send('No hemos encontrado a '+personaje+' en '+servidor+'. ¿Estás seguro de que existe y que está bien escrito?')}
                        }
                })                
            })            
    }

exports.get_talentos_completos = async function(message,personaje,servidor)     //FUNCIÓN EXPORTABLE PARA MOSTRAR LA RAMA DE TALENTOS DE UN PJ
    {        
        if (!personaje || !servidor)
            {message.channel.send ('Es necesario un nombre de personaje y el servidor');return;}       
        get_token(function ()
            {
                respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/specializations?namespace=profile-eu&locale=es_ES&access_token='+token},(error,resp)=>
                {
                    if (error)
                        {console.log ('Nooooooooooooooooooo')}
                    else
                        {
                            if (resp.statusCode == 200)
                                {
                                    let datos = JSON.parse(resp.body);                                    
                                    respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/character-media?namespace=profile-eu&locale=es_ES&access_token='+token},(error2,resp2)=>
                                        {                                            
                                            let datos2 = JSON.parse(resp2.body);                                            
                                            respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'?namespace=profile-eu&locale=es_ES&access_token='+token},(error3,resp3)=>
                                                {
                                                    let faccion = imagen_url.url_logo_wow;
                                                    let datos3 = JSON.parse(resp3.body);
                                                    let descripcion =   "Hola soldado, aquí tienes el informe que has solicitado de "+datos.character.name+":\n"+
                                                                        "Género: **"+datos3.gender.name+"**\n"+
                                                                        "Raza: **"+datos3.race.name+"**\n"+
                                                                        "Clase: **"+datos3.character_class.name+"**\n"+
                                                                        "Rama activa: **"+datos3.active_spec.name+"**";

                                                    if (datos3.faction.type == "ALLIANCE")
                                                        {faccion = imagen_url.url_logo_ali}
                                                    else
                                                        {faccion = imagen_url.url_logo_horda}
                                                    const mensaje_embed = new Discord.MessageEmbed()
                                                        .setColor('#00CACA')
                                                        .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                        .setTitle ('TALENTOS DE: '+datos.character.name)
                                                        .setDescription (descripcion)
                                                        .setThumbnail(faccion)
                                                        .setImage (datos2.render_url)
                                                        .setTimestamp()
                                                        .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);  
                                                        for (i=0; i <datos.specializations.length; i++)
                                                            {                                                                   
                                                                mensaje_embed.addField ('**'+datos.specializations[i].specialization.name+'**','** Talentos en la rama: '+datos.specializations[i].specialization.name+'**');
                                                                if(datos.specializations[i].talents!=undefined){
                                                                    for (z=0; z<datos.specializations[i].talents.length; z++)
                                                                        {mensaje_embed.addField(datos.specializations[i].talents[z].talent.name,datos.specializations[i].talents[z].spell_tooltip.description);}
                                                                }
                                                            }                                                        
                                                    message.channel.send (mensaje_embed);})
                                                })
                                        }
                            else
                                {message.channel.send('No hemos encontrado a '+personaje+' en '+servidor+'. ¿Estás seguro de que existe y que está bien escrito?')}
                        }
                })                
            })            
    }
exports.get_talentos_lite = async function(message,personaje,servidor)     // FUNCIÇON EXPORTABLE PARA TRAER LA RAMA DE TALENTOS VERSION LITE DE UN PJ
    {   
        let talentos_rama;     
        if (!personaje || !servidor)
            {message.channel.send ('Es necesario un nombre de personaje y el servidor');return;}       
        get_token(function ()
            {
                respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/specializations?namespace=profile-eu&locale=es_ES&access_token='+token},(error,resp)=>
                {
                    if (error)
                        {console.log ('Nooooooooooooooooooo')}
                    else
                        {
                            if (resp.statusCode == 200)
                                {
                                    let datos = JSON.parse(resp.body);                                    
                                    respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'/character-media?namespace=profile-eu&locale=es_ES&access_token='+token},(error2,resp2)=>
                                        {                                            
                                            let datos2 = JSON.parse(resp2.body);                                            
                                            respuesta({url: 'https://eu.api.blizzard.com/profile/wow/character/'+servidor.toLowerCase()+'/'+personaje.toLowerCase()+'?namespace=profile-eu&locale=es_ES&access_token='+token},(error3,resp3)=>
                                                {
                                                    let faccion = imagen_url.url_logo_wow;
                                                    let datos3 = JSON.parse(resp3.body);
                                                    let descripcion =   "Hola soldado, aquí tienes el informe que has solicitado de "+datos.character.name+":\n"+
                                                                        "Género: **"+datos3.gender.name+"**\n"+
                                                                        "Raza: **"+datos3.race.name+"**\n"+
                                                                        "Clase: **"+datos3.character_class.name+"**\n"+
                                                                        "Rama activa: **"+datos3.active_spec.name+"**";
                                                    if (datos3.faction.type == "ALLIANCE")
                                                        {faccion = imagen_url.url_logo_ali}
                                                    else
                                                        {faccion = imagen_url.url_logo_horda}
                                                    const mensaje_embed = new Discord.MessageEmbed()
                                                        .setColor('#00CACA')
                                                        .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                        .setTitle ('TALENTOS DE: '+datos.character.name)
                                                        .setDescription (descripcion)
                                                        .setThumbnail(faccion)
                                                        .setImage (datos2.render_url)
                                                        .setTimestamp()
                                                        .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow); 
                                                                  
                                                        for (i=0; i <datos.specializations.length; i++)
                                                            {                                                                   
                                                                if(datos.specializations[i].talents!=undefined)
                                                                {                                              
                                                                for (z=0; z<datos.specializations[i].talents.length; z++)
                                                                    {
                                                                        if (z==0)
                                                                            {talentos_rama = datos.specializations[i].talents[z].talent.name+'\n'}
                                                                        else
                                                                            {talentos_rama = talentos_rama + datos.specializations[i].talents[z].talent.name+'\n';}
                                                                    }
                                                                mensaje_embed.addField ('**'+datos.specializations[i].specialization.name+'**',talentos_rama);  
                                                                }                                                        
                                                            }
                                                    message.channel.send (mensaje_embed);})
                                                })
                                        }
                            else
                                {message.channel.send('No hemos encontrado a '+personaje+' en '+servidor+'. ¿Estás seguro de que existe y que está bien escrito?')}
                        }
                })                
            })            
    }
 exports.buscar_item = async function (message, texto)      // FUNCIÓN PARA BUSCAR UN ITEM DEL WOW
    {
        if (texto.length == 0)
            {
                message.channel.send ("Escribe qué quieres que busque, soldado");
                return;
            }
        let mensaje_items = '** número ** -> descripción -> ítem id\n';  
        let titulo_mensaje;
        let descripcion_mensaje;
        let listaGeneral = cogerLista(texto);

        if (listaGeneral.length == 0)
            {
                message.channel.send("Ítem no encontrado");
                return;
            }
        if (listaGeneral.length > 1)
            {                               
                for (j=0;j<20;j++)                
                    {
                        if (j<listaGeneral.length)
                            {mensaje_items =mensaje_items +'**'+j+'** -> '+  listaGeneral[j].des+' -> '+listaGeneral[j].id +'\n'}
                        else
                            {continue;}
                    }
                mensaje_items = mensaje_items + "**Éstos son los primeros items encontrados, dime cual quieres que te muestre mendiante el número en la línea correspondiente al ítem que buscas.**"
                const filter = response => 
                    {
                        return ((response.content >= 0 && response.content <= listaGeneral.length) && (response.content >= 0 && response.content <= 19));
                    };
                message.channel.send(mensaje_items).then(() => {
                    message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                        .then(searchItem)
                        .catch(collected => {
                                message.channel.send('Cancelando búsqueda, sin respuesta a tiempo.');
                            });
                });   
            }
        else{
            searchItem()
    }
    function searchItem(collected){
        let objetoABuscar;
        let mensaje_embed_mision = null;
        if(collected) objetoABuscar = listaGeneral[collected.first().content];
        else objetoABuscar = listaGeneral[0];       
        get_token(function (){
            respuesta({url: 'https://eu.api.blizzard.com/data/wow/item/'+objetoABuscar.id+'?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>{
                    if (error)
                        {console.log ('Nooooooooooooooooooo')}
                    else
                        {
                            if (resp.statusCode == 200)
                                {
                                    let datos = JSON.parse(resp.body);

                                    if (datos.item_class.id == 0 || datos.item_class.id == 1 || datos.item_class.id == 4 || datos.item_class.id == 7 || datos.item_class.id == 8 || datos.item_class.id == 9 || datos.item_class.id == 12 || datos.item_class.id == 15 || datos.item_class.id == 16 || datos.item_class.id == 18)               // id 0 -> consumibles | id 1 -> recipientes | id 7 -> habilidad comercial | id 8 -> mejora de objetos | id 9 -> recetas/diseños | id 12 -> objeto de misión| id 15 -> miscelanea | id 16 -> glifos | id 18 -> ficha wow
                                        {
                                            titulo_mensaje = datos.name;
                                            descripcion_mensaje =   "**Calidad :** "+datos.quality.name+"\n"+
                                                                    "**Clase:** "+datos.item_class.name+" | **Subclase:** "+datos.item_subclass.name+ " | **Tipo: **"+datos.inventory_type.name+"\n"+
                                                                    "**Requiere lvl:** "+datos.required_level+" | **Nivel objeto:** "+datos.level+"\n";
                                            if (datos.preview_item.spells) 
                                                {
                                                    for (k in datos.preview_item.spells)        
                                                        {descripcion_mensaje = descripcion_mensaje +"**"+ datos.preview_item.spells[k].description + "** ";}
                                                }
                                            if (datos.preview_item.description)
                                                {descripcion_mensaje = descripcion_mensaje+"**"+datos.preview_item.description+"**\n";}
                                            if (datos.preview_item.item_starts_quest)
                                                {descripcion_mensaje=descripcion_mensaje+"**"+datos.preview_item.item_starts_quest.display_string+"** | "+datos.preview_item.item_starts_quest.quest.name+"(id:"+datos.preview_item.item_starts_quest.quest.id+")"}
                                            if ( datos.preview_item.container_slots)
                                                { "**"+datos.preview_item.container_slots.display_string+"**";}
                                            if (datos.preview_item.armor)
                                                {descripcion_mensaje = descripcion_mensaje + "**Armadura:** "+datos.preview_item.armor.display.display_string+"\n"}
                                            if (datos.preview_item.stats)
                                                {
                                                    descripcion_mensaje = descripcion_mensaje+"**Estadísticas:** \n";
                                                    for (k in datos.preview_item.stats)        
                                                        {
                                                            descripcion_mensaje = descripcion_mensaje + datos.preview_item.stats[k].display.display_string + " ";            
                                                        }
                                                }
                                            if (datos.preview_item.requirements)
                                                {
                                                    if (datos.preview_item.requirements.holiday)
                                                        {descripcion_mensaje = descripcion_mensaje+"**"+datos.preview_item.requirements.holiday.display_string+"**\n"}
                                                }
                                        }
                                    if (datos.item_class.id == 2)                // id 2 -> armas
                                        {
                                                titulo_mensaje = datos.name
                                                descripcion_mensaje =   "**Calidad :** "+datos.quality.name+"\n"+
                                                                        "**Clase:** "+datos.item_class.name+" | **Subclase:** "+datos.item_subclass.name+ "| **Tipo: **"+datos.inventory_type.name+"\n"+
                                                                        "**Requiere lvl:** "+datos.required_level+" | **Nivel objeto:** "+datos.level+"\n"+
                                                                        "**Daño:** "+datos.preview_item.weapon.damage.display_string+" | **Velocidad:** "+datos.preview_item.weapon.attack_speed.display_string+" | **DPS:** "+datos.preview_item.weapon.dps.display_string+"\n"+
                                                                        "**Estadísticas:** \n";
                                                for (k in datos.preview_item.stats)        
                                                    {
                                                        descripcion_mensaje = descripcion_mensaje + datos.preview_item.stats[k].display.display_string + " ";            
                                                    }                                            
                                        }
                                    if (datos.item_class.id == 3)               // id 3 -> gemas
                                        {
                                            titulo_mensaje = datos.name
                                            descripcion_mensaje =   "**Calidad :** "+datos.quality.name+"\n"+
                                                                    "**Clase:** "+datos.item_class.name+" | **Subclase:** "+datos.item_subclass.name+ "| **Tipo: **"+datos.inventory_type.name+"\n"+
                                                                    "**Requiere lvl:** "+datos.required_level+" | **Nivel objeto:** "+datos.level+"\n"+
                                                                    "**EFECTO:** "+datos.preview_item.gem_properties.effect+"\n";
                                            if (datos.preview_item.gem_properties.min_item_level.value != 0)
                                                {descripcion_mensaje = descripcion_mensaje + "**" + datos.preview_item.gem_properties.min_item_level.display_string + "**"}
                                        }
                                    respuesta({url: 'https://eu.api.blizzard.com/data/wow/media/item/'+objetoABuscar.id+'?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>
                                        {
                                            let datos2 = JSON.parse(resp.body);
                                            const mensaje_embed = new Discord.MessageEmbed()
                                                    .setColor('#00CACA')
                                                    .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                    .setTitle (titulo_mensaje)
                                                    .setDescription (descripcion_mensaje)
                                                    .setThumbnail(datos2.assets[0].value)
                                                    .setTimestamp()
                                                    .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);
                                            if (datos.preview_item.sell_price)
                                                {mensaje_embed.addField('Precio venta:',datos.preview_item.sell_price.display_strings.gold+" Oros | "+datos.preview_item.sell_price.display_strings.silver+" Platas | "+datos.preview_item.sell_price.display_strings.copper+" Cobres")}
                                            message.channel.send(mensaje_embed);    
                                            if (datos.preview_item.item_starts_quest)
                                                {                                                    
                                                    respuesta({url: 'https://eu.api.blizzard.com/data/wow/quest/'+datos.preview_item.item_starts_quest.quest.id+'?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>
                                                        {
                                                            let datos3 = JSON.parse(resp.body);                                                         
                                                            mensaje_embed_mision = new Discord.MessageEmbed()
                                                                .setColor('#FF5604')
                                                                .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                                                .setTitle (datos3.title)
                                                                .setDescription (datos3.description)
                                                                .setThumbnail(imagen_url.url_logo_wow)
                                                                .addField ("Zona:",datos3.area.name)
                                                                .addField ("Nivel mínimo:",datos3.recommended_minimum_level)
                                                                .addField ("Experiencia:",datos3.rewards.experience)
                                                                .setTimestamp()
                                                                .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);
                                                            message.channel.send (mensaje_embed_mision)
                                                        })
                                                }
                                        })
                                }
                        }
                })
        })

    }
}

function cogerLista(texto){
    let listaGeneral=[];
    for (i in ITEMS_JSON){
            if (ITEMS_JSON[i].es_es.toLowerCase().includes(texto.toLowerCase()) == true){
                    let obj={};
                    obj.id=ITEMS_JSON[i].id;
                    obj.des=ITEMS_JSON[i].es_es;                
                    listaGeneral.push(obj);
                }            
        }    
    return listaGeneral
}

exports.buscar_mision = async function(message,texto)       // FUNCION PARA MOSTRAR LAS MISIONES DE UNA ZONA DEL WOW
    {
        let area_id = 0;
        if (texto.length == 0)
            {message.channel.send ("Necesito que me escribas una zona, soldado"); return;}
        else
            {
                get_token(buscar_area)
            }

        async function buscar_area ()
            {
                respuesta({url:'https://eu.api.blizzard.com/data/wow/quest/area/index?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>
                    {
                        let zonas = JSON.parse(resp.body);
                        let lista_zonas = new Array;                        
                        for (i= 0;i < zonas.areas.length;i++)
                            {
                                if (zonas.areas[i].name.toLowerCase().includes(texto.toLowerCase()) == true)
                                    {   
                                        let objeto = {};
                                        objeto.id = zonas.areas[i].id;
                                        objeto.nombre = zonas.areas[i].name;                                        
                                        lista_zonas.push(objeto);                                    
                                    }
                            }                     
                        if(lista_zonas.length == 0)
                            {message.channel.send ("No hemos encontrado la zona.")}
                        else if (lista_zonas.length == 1)
                            {listar_misones(lista_zonas);}
                        else
                            {
                                let mensaje_items = '** número ** -> Nombre -> zona id\n'; 
                                for (j=0;j<20;j++)                
                                {
                                    if (j<lista_zonas.length)
                                        {mensaje_items =mensaje_items +'**'+j+'** -> '+  lista_zonas[j].nombre+' -> '+lista_zonas[j].id +'\n'}
                                    else
                                        {continue;}
                                }
                            mensaje_items = mensaje_items + "**Éstas son las primeras zonas encontradas, dime cual quieres que te muestre mendiante el número en la línea correspondiente a la zona que buscas.**"
                            const filter = response => 
                                {
                                    return ((response.content >= 0 && response.content <= lista_zonas.length) && (response.content >= 0 && response.content <= 19));
                                };
                            message.channel.send(mensaje_items).then(() => {
                                message.channel.awaitMessages(filter, { max: 1, time: 100000, errors: ['time'] })
                                    .then(collected => {                                        
                                        nuevo_lista_zona = new Array;
                                        let objeto = {};
                                        objeto.id = lista_zonas[collected.first().content].id;
                                        objeto.nombre = lista_zonas[collected.first().content].name;
                                        nuevo_lista_zona.push(objeto);
                                        listar_misones (nuevo_lista_zona);
                                    })
                                    .catch(collected => {                                            
                                            message.channel.send('Cancelando búsqueda, sin respuesta a tiempo.');
                                        });
                                    });
                            }
                        return;
                    })
            }
        
        async function listar_misones (lista_zonas)
            {
                respuesta({url:'https://eu.api.blizzard.com/data/wow/quest/area/'+lista_zonas[0].id+'?namespace=static-eu&locale=es_Es&access_token='+token},(error,resp2)=>
                    {
                        let datos_misiones = JSON.parse(resp2.body);
                        let misiones_array = new Array;
                        for (i = 0; i <datos_misiones.quests.length; i++)
                            {                                
                                let objeto = {};
                                objeto.id = datos_misiones.quests[i].id;
                                objeto.nombre = datos_misiones.quests[i].name;
                                misiones_array.push(objeto);
                            }                        
                        let paginas = Math.trunc(datos_misiones.quests.length/10);                        
                        let contador = 0;
                        for (i=0;i<paginas;i++)
                            {                               
                                let mensaje =   '------------------------------- \n'+
                                                'id misión | nombre de la misión \n'+
                                                '------------------------------- \n';
                                for (j=0;j<10;j++)
                                    {                                        
                                        mensaje = mensaje + misiones_array[contador].id + ' | ' + misiones_array[contador].nombre + '\n';
                                        contador++;
                                    }
                                mensaje_embed_mision = new Discord.MessageEmbed()
                                    .setColor('#FF5604')
                                    .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                    .setTitle ('MISIONES')
                                    .setDescription (mensaje)
                                    .setThumbnail(imagen_url.url_logo_wow)                                    
                                message.channel.send(mensaje_embed_mision);                                
                            }
                        let ultimo_mensaje =    '------------------------------- \n'+
                                                'id misión | nombre de la misión \n'+
                                                '------------------------------- \n';
                        console.log (contador+' '+ misiones_array.length)
                        while (contador < misiones_array.length)
                            {
                                ultimo_mensaje = ultimo_mensaje + misiones_array[contador].id + ' | ' + misiones_array[contador].nombre + '\n';
                                contador++;
                            }  
                        mensaje_embed_mision = new Discord.MessageEmbed()
                            .setColor('#FF5604')
                            .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                            .setTitle ('MISIONES')
                            .setDescription (ultimo_mensaje)
                            .setThumbnail(imagen_url.url_logo_wow)                            
                        message.channel.send(mensaje_embed_mision);
                        message.channel.send("``Si quieres ver alguna de las misiones usa el comando !mision [id_mision]``")
                    })
            }    
            
    }

exports.mostrar_mision = async function(message,id_mision)              // COMPROBADO A PRUEBA DE SLIMCOGNITOS!!!!!!!!!!!!!
    {
        get_token(function ()
            {
                respuesta({url: 'https://eu.api.blizzard.com/data/wow/quest/'+id_mision+'?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>
                    {                        
                                               
                        if (resp.status == 200)
                            {
                                let datos3 = JSON.parse(resp.body);
                                mensaje_embed_mision = new Discord.MessageEmbed()
                                    .setColor('#FF5604')
                                    .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                    .setTitle (datos3.title)
                                    .setDescription (datos3.description)
                                    .setThumbnail(imagen_url.url_logo_wow)
                                    .addField ("Zona:",datos3.area.name)
                                    .addField ("Nivel mínimo:",datos3.recommended_minimum_level)
                                    .addField ("Experiencia:",datos3.rewards.experience)
                                    .setTimestamp()
                                    .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);
                                message.channel.send (mensaje_embed_mision)
                            }
                        else
                            {message.channel.send ('Misión no encontrada')}
                    })
            })    
    }

exports.mostrar_criatura = async function(message,id_criatura)              // COMPROBADO A PRUEBA DE SLIMCOGNITOS!!!!!!!!!!!!!
    {
        get_token(function ()
            {
                respuesta({url: 'https://eu.api.blizzard.com/data/wow/creature/'+id_criatura+'?namespace=static-eu&locale=es_ES&access_token='+token},(error,resp)=>
                    {                        
                                               
                        if (resp.status == 200)
                            {
                                let datos3 = JSON.parse(resp.body);                                
                                mensaje_embed_mision = new Discord.MessageEmbed()
                                    .setColor('#FF5604')
                                    .setAuthor('WoW Bot', imagen_url.url_logo_wow)
                                    .setTitle (datos3.name)
                                    .setImage('https://render-eu.worldofwarcraft.com/npcs/zoom/creature-display-'+datos3.creature_displays[0].id+'.jpg')
                                    .setThumbnail(imagen_url.url_logo_wow)
                                    .addField ("Tipo:",datos3.type.name)
                                    .addField ("Familia:",datos3.family.name)
                                    .addField ("Domesticable:",datos3.is_tameable)
                                    .setTimestamp()
                                    .setFooter ("Gracias por utilizar WoW Bot",imagen_url.url_logo_wow);
                                message.channel.send (mensaje_embed_mision);
                            }
                        else
                            {message.channel.send ('Criatura no encontrada')}
                    })

            })
    }

   