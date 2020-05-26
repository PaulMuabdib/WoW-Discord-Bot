// FUNCION PARA LIMPIAR EL CHAT.
//-----------------------------.
exports.limpiar_chat =  function (argumento, mensaje)
    {
        let permiso = mensaje.member.hasPermission("MANAGE_CHANNELS");        
        if(!permiso) 
            { mensaje.channel.send('No tienes los permisos para borrar mensajes.'); } 
        else
            {
                let cantidad = parseInt(argumento);
                if (isNaN(cantidad) || cantidad > 100 || cantidad <= 0)
                    {mensaje.channel.send ("No has introducido una cantidad correcta.")}
                else
                    {
                        mensaje.channel.bulkDelete(cantidad);
                        mensaje.channel.send('Se han borrado `'+cantidad+'`mensajes.');                  
                    }                
            }
    }

// FUNCION PARA AGREGAR UN ROL A UN USUARIO.
//-----------------------------------------.
    exports.agregar_rol = function (mensaje, rol)
    {
        let permiso = mensaje.member.hasPermission("MANAGE_ROLES");
        let mensaje_respuesta;
        if (!rol) return mensaje_respuesta = ("Soldado, necesito el nombre del rol al que quieres agregarlo");
        let miembro = mensaje.mentions.members.first();
        let nombre_rol;
        let existe_rol;
        console.log (rol.substring(0,1));
        console.log(rol)
        
        if (rol.substring(0,3)=='<@&')
            {                
                let id_rol = rol.substring(3, rol.length - 1);                
                existe_rol = mensaje.guild.roles.cache.find(r => r.id === id_rol);
                nombre_rol = existe_rol.name               
            }
        else 
            {
                nombre_rol = rol;
                existe_rol = mensaje.guild.roles.cache.find(r => r.name === nombre_rol);                
            }
        if (!permiso) return mensaje_respuesta = ("No tienes los permisos necesarios para gestionar roles, soldado");
        if (!miembro) return mensaje_respuesta = ("Soldado debes mencionar al miembro al que quieres asignar el rol");        
        if (!existe_rol) return mensaje_respuesta = ("Lo siento soldado, no he encontrado ese rol en este servidor");
        miembro.roles.add(existe_rol).catch(console.error)
        return mensaje_respuesta = ('Hola soldado, **'+miembro.user.username+'** ha sido asignado como **'+nombre_rol+'**');
    }

// FUNCION PARA QUITAR UN ROL A UN USUARIO.
//----------------------------------------.
exports.quitar_rol = function (mensaje, rol)
    {
        if (!rol) return mensaje_respuesta = ("Soldado, necesito el nombre del rol al que quieres agregarlo");
        let miembro = mensaje.mentions.members.first();
        let permiso = mensaje.member.hasPermission("MANAGE_ROLES");
        if (!permiso) return mensaje_respuesta = ("No tienes los permisos necesarios para gestionar roles, soldado");
        let nombre_rol;
        let existe_rol;
        
        let mensaje_respuesta;

        if (rol.substring(0,3)=='<@&')
            {                
                let id_rol = rol.substring(3, rol.length - 1);                
                existe_rol = mensaje.guild.roles.cache.find(r => r.id === id_rol);
                nombre_rol = existe_rol.name
            }
        else 
            {
                nombre_rol = rol;
                existe_rol = mensaje.guild.roles.cache.find(r => r.name === nombre_rol);
            }

        
        if (!miembro) return mensaje_respuesta = ("Soldado debes mencionar al miembro al que quieres asignar el rol");        
        if (!existe_rol) return mensaje_respuesta = ("Lo siento soldado, no he encontrado ese rol en este servidor");

        miembro.roles.remove(existe_rol).catch(console.error)
        return mensaje_respuesta = ('Hola soldado, a **'+miembro.user.username+'** no tiene el rol **'+nombre_rol+'**');
    }
// FUNCION PARA CAMBIAR EL NICK A UN USUARIO.
//----------------------------------------.
exports.cambiar_nick = function (mensaje, nick)
        {
            if (nick.substring(0,2)=='<@')
                {
                    mensaje.channel.send ("No se aceptan menciones como Nick.");
                    return;
                }
            if (nick.substring(0,2)=='<#')
                {
                    mensaje.channel.send ("No se aceptan menciones como Nick.");
                    return;
                }
            let miembro = mensaje.mentions.members.first();
            let permiso = mensaje.member.hasPermission("MANAGE_NICKNAMES");
            let mensaje_respuesta;
    
            if (!permiso)
                {
                    mensaje.channel.send ("No tienes los permisos necesarios para gestionar el cambio de apodo, soldado");
                    return;
                }
            if (!miembro) 
                { 
                    mensaje.channel.send ("Soldado debes mencionar al miembro al que quieres cambiar el apodo");
                    return;
                }
            if (!nick) 
                {
                    mensaje.channel.send ("Soldado, necesito el nuevo apodo del "+miembro.user.username);
                    return;
                }    
            miembro.setNickname(nick)
                .then( function () {
                    mensaje_respuesta = 'Hola soldado, **'+miembro.user.username+'** ha sido rebautizado como **'+nick+'**'
                    mensaje.channel.send(mensaje_respuesta);
                    },
                    function() {mensaje.channel.send ('No puedes hacer esto');})
                .catch(console.error);
            return;
        }
// FUNCION PARA CREAR UNA ESTRUCTURA DE ROLES BÁSICA PARA WoW.
// ----------------------------------------------------------.
exports.crear_roles = function (message)
        {
            let permiso = message.member.hasPermission("MANAGE_ROLES");
            if (permiso == true)
                {
                    let existe_heal = message.guild.roles.cache.find(r => r.name === "heal");
                    if (!existe_heal) 
                        {
                            message.guild.roles.create({ data: { name: 'heal', color: '00CC00'} })
                                .then (message.channel.send ('Creado rol "heal"'))
                                .catch(console.error);
                        }                        
                    let existe_tanque = message.guild.roles.cache.find(r => r.name === "tanque");
                    if (!existe_tanque) 
                        {
                            message.guild.roles.create({ data: { name: 'tanque', color: '00CC00'} })
                                .then( message.channel.send('Creado el rol "tanque"'))
                                .catch(console.error);
                        }
                    let existe_dps = message.guild.roles.cache.find(r => r.name === "dps");
                    if (!existe_dps) 
                        {
                            message.guild.roles.create({ data: { name: 'dps', color: '00CC00'} })
                                .then (message.channel.send('Creado el rol "dps"'))
                                .catch(console.error);
                        }
                    let existe_minero = message.guild.roles.cache.find(r => r.name === "minero");
                    if (!existe_minero) 
                        {
                            message.guild.roles.create({ data: { name: 'minero', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "minero"'))
                                .catch(console.error);
                        }
                    let existe_herrero = message.guild.roles.cache.find(r => r.name === "herrero");
                    if (!existe_herrero) 
                        {
                            message.guild.roles.create({ data: { name: 'herrero', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "herrero"'))
                                .catch(console.error);
                        }
                    let existe_joyero = message.guild.roles.cache.find(r => r.name === "joyero");
                    if (!existe_joyero) 
                        {
                            message.guild.roles.create({ data: { name: 'joyero', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "joyero"'))
                                .catch(console.error);
                        }
                    
                    let existe_ingeniero = message.guild.roles.cache.find(r => r.name === "ingeniero");
                    if (!existe_ingeniero) 
                        {
                            message.guild.roles.create({ data: { name: 'ingeniero', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "ingeniero"'))
                                .catch(console.error);
                        }
                    let existe_desollador = message.guild.roles.cache.find(r => r.name === "desollador");
                    if (!existe_desollador) 
                        {
                            message.guild.roles.create({ data: { name: 'desollador', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "desollador"'))
                                .catch(console.error);
                        }                                    
                    let existe_peletero = message.guild.roles.cache.find(r => r.name === "peletero");
                    if (!existe_peletero) 
                        {
                            message.guild.roles.create({ data: { name: 'peletero', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "peletero"'))
                                .catch(console.error);
                        }
                    let existe_herborista = message.guild.roles.cache.find(r => r.name === "herborista");
                    if (!existe_herborista) 
                        {
                            message.guild.roles.create({ data: { name: 'herborista', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "herborista"'))
                                .catch(console.error);
                        }
                    let existe_alquimista = message.guild.roles.cache.find(r => r.name === "alquimista");
                    if (!existe_alquimista) 
                        {
                            message.guild.roles.create({ data: { name: 'alquimista', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "alquimista"'))
                                .catch(console.error);
                        }
                    let existe_inscriptor = message.guild.roles.cache.find(r => r.name === "inscriptor");
                    if (!existe_inscriptor) 
                        {
                            message.guild.roles.create({ data: { name: 'inscriptor', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "inscriptor"'))
                                .catch(console.error);
                        }
                    let existe_sastre = message.guild.roles.cache.find(r => r.name === "sastre");
                    if (!existe_sastre) 
                        {
                            message.guild.roles.create({ data: { name: 'sastre', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "sastre"'))
                                .catch(console.error);
                        }
                    let existe_encatador = message.guild.roles.cache.find(r => r.name === "encantador");
                    if (!existe_encatador) 
                        {
                            message.guild.roles.create({ data: { name: 'encantador', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "encantador"'))
                                .catch(console.error);
                        }
                    let existe_arqueologo = message.guild.roles.cache.find(r => r.name === "arqueologo");
                    if (!existe_arqueologo) 
                        {
                            message.guild.roles.create({ data: { name: 'arqueologo', color: '00CACA'} })
                                .then (message.channel.send('Creado el rol "arqueologo"'))
                                .catch(console.error);
                        }
                    let existe_guildmaster = message.guild.roles.cache.find(r => r.name === "guildmaster");
                    if (!existe_guildmaster) 
                        {
                            message.guild.roles.create({ data: { name: 'guildmaster', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "guildmaster"'))
                                .catch(console.error);
                        }
                    let existe_altocargo = message.guild.roles.cache.find(r => r.name === "altocargo");
                    if (!existe_altocargo) 
                        {
                            message.guild.roles.create({ data: { name: 'altocargo', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "altocargo"'))
                                .catch(console.error);
                        }
                    let existe_oficial = message.guild.roles.cache.find(r => r.name === "oficial");
                    if (!existe_oficial) 
                        {
                            message.guild.roles.create({ data: { name: 'oficial', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "oficial"'))
                                .catch(console.error);
                        }
                    let existe_veterano = message.guild.roles.cache.find(r => r.name === "veterano");
                    if (!existe_veterano) 
                        {
                            message.guild.roles.create({ data: { name: 'veterano', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "veterano"'))
                                .catch(console.error);
                        }
                    let existe_soldado = message.guild.roles.cache.find(r => r.name === "soldado");
                    if (!existe_soldado) 
                        {
                            message.guild.roles.create({ data: { name: 'soldado', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "soldado"'))
                                .catch(console.error);
                        }
                   let existe_recluta = message.guild.roles.cache.find(r => r.name === "recluta");
                    if (!existe_recluta) 
                        {
                            message.guild.roles.create({ data: { name: 'recluta', color: 'FF0000'} })
                                .then (message.channel.send('Creado el rol "recluta"'))
                                .catch(console.error);
                        }
                    message.channel.send('Roles ya creados.')

                    
                }
            else {message.channel.send('No tienes permiso para usar este comando soldado.')}
            
        }
// FUNCION PARA CREAR UNA ESTRUCTURA BÁSICA DE CANALES DE TEXTO Y VOZ.
// ------------------------------------------------------------------.
exports.crear_canales = async function (message)
    {
        var categoria;
        let permiso = message.member.hasPermission("MANAGE_CHANNELS");
        if (permiso == true)
            {
                categoria = message.guild.channels.cache.find(r => r.name === "World of Warcraft")
                if (!categoria)
                    {
                        message.guild.channels.create('World of Warcraft',{type: 'category'});
                        message.channel.send('Categoria World of Warcraft no encontrada.\nCreada la categoria World of Warcraft.\n```Reiniciando el comando para creación de los canales.```');
                        message.channel.send("!crear_canales");
                        return;
                    }
                else
                    {
                        let existe ;
                        if (!message.guild.channels.cache.find(r => r.name === "general-wow"))
                            {message.guild.channels.create('general-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "normas-wow"))
                            {message.guild.channels.create('normas-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "anuncios-wow"))
                            {message.guild.channels.create('anuncios-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "comandosbot-wow"))
                            {message.guild.channels.create('comandosbot-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "comercio-wow"))
                            {message.guild.channels.create('comercio-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "multimedia-wow"))
                             {message.guild.channels.create('multimedia-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "transfiguraciones-wow"))
                            {message.guild.channels.create('transfiguraciones-wow',{type: 'text',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "lore-wow"))
                            {message.guild.channels.create('lore-wow',{type: 'text',parent:categoria});}
                        message.channel.send ('```Canales de texto creados```\nCreando canales de voz ...');
                        if (!message.guild.channels.cache.find(r => r.name === "LEVEO 1"))
                            {message.guild.channels.create('LEVEO 1',{type: 'voice',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "LEVEO 2"))
                            {message.guild.channels.create('LEVEO 2',{type: 'voice',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "LEVEO 3"))
                            {message.guild.channels.create('LEVEO 3',{type: 'voice',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "MAZMORRAS 1"))
                            {message.guild.channels.create('MAZMORRAS 1',{type: 'voice',parent:categoria,userLimit:5});}
                        if (!message.guild.channels.cache.find(r => r.name === "MAZMORRAS 2"))
                            {message.guild.channels.create('MAZMORRAS 2',{type: 'voice',parent:categoria,userLimit:5});}
                        if (!message.guild.channels.cache.find(r => r.name === "MAZMORRAS 3"))
                            {message.guild.channels.create('MAZMORRAS 3',{type: 'voice',parent:categoria,userLimit:5});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(10) 1"))
                            {message.guild.channels.create('RAIDS(10) 1',{type: 'voice',parent:categoria,userLimit:10});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(10) 2"))
                            {message.guild.channels.create('RAIDS(10) 2',{type: 'voice',parent:categoria,userLimit:10});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(10) 3"))
                            {message.guild.channels.create('RAIDS(10) 3',{type: 'voice',parent:categoria,userLimit:10});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(25) 1"))
                            {message.guild.channels.create('RAIDS(25) 1',{type: 'voice',parent:categoria,userLimit:25});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(25) 2"))
                            {message.guild.channels.create('RAIDS(25) 2',{type: 'voice',parent:categoria,userLimit:25});}
                        if (!message.guild.channels.cache.find(r => r.name === "RAIDS(25) 3"))
                            {message.guild.channels.create('RAIDS(25) 3',{type: 'voice',parent:categoria,userLimit:25});}
                        if (!message.guild.channels.cache.find(r => r.name === "P.V.P. 1"))
                            {message.guild.channels.create('P.V.P. 1',{type: 'voice',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "P.V.P. 2"))
                            {message.guild.channels.create('P.V.P. 2',{type: 'voice',parent:categoria});}
                        if (!message.guild.channels.cache.find(r => r.name === "P.V.P. 3"))
                            {message.guild.channels.create('P.V.P. 3',{type: 'voice',parent:categoria});}
                        message.channel.send ('Canales de texto y voz correctamente configurados.\n```Recuerde configurar los permisos según sus preferencias.```')
                    }
            }
    }