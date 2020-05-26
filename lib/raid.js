// FUNCION PARA MONTAR UNA RAID
// ----------------------------
exports.motar_raid = function (message, tipo_raid,tiempo_espera)
    {
        tiempo_espera = parseInt(tiempo_espera,10);
        if (isNaN(tiempo_espera)|| tiempo_espera <= 0|| tiempo_espera > 90)
            {message.channel.send('El tiempo no es correcto.');return;}
        if (tipo_raid == 5 || tipo_raid == 10 || tipo_raid == 25)
            {
                var contador_tanque = 0;
                var contador_dps = 0;
                var contador_heal = 0;
                var dps = [];
                var heal = [];
                var tanque = [];
                var timepo_en_segundos = tiempo_espera * 60000;
                var maximo_mensajes = tipo_raid * 4;

                const filtro = response => 
                    { return (response.content.toLowerCase() == 'dps' || response.content.toLowerCase() == 'heal' || response.content.toLowerCase() == 'tanque')}
                message.channel.send ("@everyone : \n ``` **SE ESTÁ MONTADO UNA RAID DE "+tipo_raid+" JUGADORES TENÉIS "+tiempo_espera+" MINUTOS PARA APUNTAROS**. Podéis apuntaros poniendo vuesta función (dps - tanque - heal)```\n"+
                                      "```Una vez terminado el tiempo o con un máximo de "+maximo_mensajes+" se creará un mensaje con los jugadores apuntados en cada posición por orden de petición.```").then(() =>
                    {
                        message.channel.awaitMessages (filtro ,{ max: maximo_mensajes, time: timepo_en_segundos, errors: ['time']}) 
                            .then (collected =>
                                {              
                                    collected.each (content => 
                                        {
                                            console.log(content.content)
                                            console.log(content.author.username)
                                            if (content.content.toLowerCase() == "dps")
                                                {
                                                    dps[contador_dps] = content.author.nick;
                                                    contador_dps++;
                                                           
                                                }
                                            if (content.content.toLowerCase() == "heal")
                                                {
                                                    heal[contador_heal] = content.author.nick;
                                                    contador_heal++;
                                                }
                                            if (content.content.toLowerCase() == "tanque")
                                                {
                                                    tanque[contador_tanque] = content.author.nick;
                                                    contador_tanque++;
                                                }
                                        }) 
                                    message.channel.send('Fin de la búsqueda, éstos son los jugadores apuntdos a la RAID agrupados por ROL:'+
                                        '``` TANQUES :'+ tanque.join(", ")+' ```'+
                                        '``` HEALERS :'+ heal.join(", ")+' ```'+
                                        '``` DPS :'+ dps.join(", ")+' ```');                                   
                                })
                            .catch (collected =>
                                {
                                    collected.each (content => 
                                        {
                                            if (content.content.toLowerCase() == "dps")
                                                {
                                                    dps[contador_dps] = content.author.username;
                                                    contador_dps++;
                                                           
                                                }
                                            if (content.content.toLowerCase() == "heal")
                                                {
                                                    heal[contador_heal] = content.author.username;
                                                    contador_heal++;
                                                }
                                            if (content.content.toLowerCase() == "tanque")
                                                {
                                                    tanque[contador_tanque] = content.author.username;
                                                    contador_tanque++;
                                                }
                                        })
                                    message.channel.send('Fin de la búsqueda, éstos son los jugadores apuntdos a la RAID agrupados por ROL:'+
                                        '``` TANQUES :'+ tanque.join(", ")+' ```'+
                                        '``` HEALERS :'+ heal.join(", ")+' ```'+
                                        '``` DPS :'+ dps.join(", ")+' ```');
                                })
                            
                    })
            }
        else
            {
                message.channel.send ("El tipo de raid no está bien, recuerda soldado: los tipos válidos son 5, 10, 25 dependiendo de los jugadores necesarios.");
                return;
            }                        
    }
