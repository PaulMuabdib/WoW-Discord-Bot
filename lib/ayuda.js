// FUNCIÓN QUE COMBROBARÁ QUE EL ARGUMENTO DE !HELP ES UN COMANDO VALIDO.
//----------------------------------------------------------------------.
exports.comprobar_comandos = function(argumento)
    {
        switch (argumento)
            {
                /* case "sangre": case "profano": case "oso": case "asesinato": case "sombras": case "fuego": case "play": case "stop":case "skip": */
                case "help": case "crear_roles":             
                case "leave": case "join": case "preparados": case "murloc": case "chistes:": 
                 case "limpiar": case "poner_rol": case"quitar_rol": case "cambiar_nick": case "frase": case "trivial":
                case "alianza": case "horda": case"dame_gif": case "montar_raid": case "dados": case "stats": case "equipo":
                case "talentos": case "talentos_lite": case "items": case "item": case "misiones_en": case "mision": case "bicho":
                case "crear_evento": case "lista_eventos": case "borrar_evento": case "apuntarse": case "ver_evento": case "crear_canales":
                    comando_existe = true;
                    break;                    
                default:
                    comando_existe = false;
                    break;
            }
        return comando_existe;
    }

// FUNCIÓN PARA COMPROBAR SI EL COMANDO NECESITA ARGUMENTOS.
//---------------------------------------------------------.
exports.comandos_con_argumentos = function(argumento)
    {
        switch (argumento)
            {
                /* case "sangre": case "profano": case "oso": case "asesinato": case "play": case "sombras": case "stop": case "skip": case "fuego": */
                case "help": case "crear_roles":                   
                case "leave": case "join": case "preparados": case "murloc": case "chistes:": 
                case "frase": case "trivial": case "alianza": case "horda": case "dados": case "lista_eventos": case "crear_canales":
                
                    con_argumentos = false;
                    break;
                 case "limpiar": case "poner_rol": case"quitar_rol": case "cambiar_nick": case "montar_raid":
                case "stats": case "equipo": case "talentos": case "talentos_lite": case "items": case "item": case "misiones_en":
                case "mision": case "bicho":
                case "crear_evento":  case "borrar_evento": case "apuntarse": case "ver_evento":
                    con_argumentos= true;
                    break;
                default:
                    con_argumentos = false;
                    break;
            }
        return con_argumentos;
    }

// FUNCION PARA QUE MANDE UN MENSAJE PRIVADO AL USUARIO CON LOS COMANDOS DEL BOT.
//------------------------------------------------------------------------------.
exports.mensaje_ayuda_general= function (prefix, message)
    {
    message.author.send    ('**COMANDOS DE WoW Bot**');

/*      ESTOS COMANDOS DE BUILDS HAN SIDO DESESTIMADOS, QUEDAN PENDIENTES PARA FUTURAS VERSIONES 
        ========================================================================================

        message.author.send    ('```COMANDOS DE BUILDS \n'+
                            '-> '+prefix+'sangre :: Muestra una guía rápida para buildearse un DK Tanke (Sangre).\n'+
                            '-> '+prefix+'profano :: Muestra los talentos para un DK DPS arma de 2 manos (Profano).\n'+                            
                            '-> '+prefix+'oso :: Muestra una guía rápida para buildearse un Dudu Feral Tanque (FORMA DE OSO).\n'+
                            '-> '+prefix+'asesinato :: Muestra los talentos para un Picaro Asesinato (PVE).\n'+
                            '-> '+prefix+'sombras :: Muestra los talentos para un Sacer Sombras (PVE).\n'+
                            '-> '+prefix+'fuego :: Muestra los talentos para un Mago Fuego (PVE).\n```');

                            '-> '+prefix+'play :: reproduce audio de un video de youtube, "!help play" para más ayuda.\n'+
                            '-> '+prefix+'stop :: detiene la reproduccion de la lista.\n     


*/
                           
    message.author.send    ('```COMANDOS ADMINISTRACIÓN \n'+
                            '-> '+prefix+'crear_canales :: Crea una estructura de canales básica para W.o.W .\n'+  
                            '-> '+prefix+'limpiar + arg :: borra el número de mensajes de arg (desde 1 a 100).\n'+
                            '-> '+prefix+'poner_rol + arg :: Pone a un miembro un rol, !help poner_rol para más ayuda.\n'+
                            '-> '+prefix+'quitar_rol + arg :: quita a un miembro un rol, !help quitar_rol para más ayuda.\n'+
                            '-> '+prefix+'crear_roles :: Crea una estructura de roles (rol, profesiones, rangos).\n'+
                            '-> '+prefix+'cambiar_nick + arg :: cambia el apodo de un miembro, !help cambiar_nick para más ayuda.\n```');

    message.author.send    ('```COMANDOS DE EVENTOS \n'+
                            '-> '+prefix+'crear_evento + arg :: Crea un nuevo evento, !help crear_evento para más ayuda.\n'+
                            '-> '+prefix+'borrar_evento + arg :: Borra el evento por id y lista de nuevo los eventos activos, !help borrar_evento para más ayuda.\n'+
                            '-> '+prefix+'apuntarse + arg :: apunta a un pj si cumple requisitos de GearScore, !help apuntarse para más ayuda.\n'+
                            '-> '+prefix+'ver_evento + arg :: lista los datos del evento y los personajes apuntados en cada rol, !help ver_evento para más ayuda.\n'+
                            '-> '+prefix+'lista_eventos :: lista los eventos guardados.\n```');
                            
    message.author.send    ('```COMANDOS DE SONIDOS \n'+
                            '-> '+prefix+'join :: Me uno a tu canal de voz.\n'+
                            '-> '+prefix+'leave :: Dejo el canal de voz.\n'+
                            '-> '+prefix+'preparados :: No estáis preparados.\n'+
                            '-> '+prefix+'murloc :: A saber lo que dice.\n'+
                            '-> '+prefix+'chistes :: Todos los chistes de las razas Alis, hasta Pandarian.\n```');
                       
                            
    message.author.send    ('```COMANDOS WORLD OF WARCRAFT \n'+
                            '-> '+prefix+'stats + arg :: Muestra las estadiscas de un jugador en un reino, !help stats para más ayuda.\n'+
                            '-> '+prefix+'equipo + arg :: Muestra la equipación de un jugador en un reino, !help equipo para más ayuda.\n'+  
                            '-> '+prefix+'talentos + arg :: Muestra los talentos de un jugador en un reino, !help talentos para más ayuda.\n'+
                            '-> '+prefix+'talentos_lite + arg :: lo mismo que talentos pero sin la descripción de cada talento, !help talentos para más ayuda.\n'+
                            '-> '+prefix+'item + arg :: Muestra datos de items, !help item para más ayuda.\n'+
                            '-> '+prefix+'misiones_en :: Muestra el listado de misiones de una zona, !help misiones_en para más ayuda.\n'+
                            '-> '+prefix+'mision + arg :: Muestra los datos de la misión de la que le proporcionemos el ID, !help mision para más ayuda.\n'+
                            '-> '+prefix+'bicho + arg :: Muestra los datos de una criatura de la que le proporcionemos el ID, !help bicho para más ayuda.\n'+
                            '-> '+prefix+'montar_raid + arg :: Permite apuntarse para una RAID/MAZMORRA, !help montar_raid para más ayuda.\n```');
                            
    message.author.send    ('```OTROS COMANDOS \n'+
                            '-> '+prefix+'trivial :: juego de preguntas y respuestas con temática WoW.\n'+
                            '-> '+prefix+'alianza :: ¡ÁNIMO SOLDADOS DE LA ALIANZA! Que este gif os de la fuerza necesaria.\n'+
                            '-> '+prefix+'horda :: ¡ÁNIMO SOLDADOS DE LA HORDA! Que este gif os de la fuerza necesaria.\n'+
                            '-> '+prefix+'dame_gif :: Te muestra un gif relacionado con World of Warcraft.\n'+
                            '-> '+prefix+'dados :: Realiza una tirada de dados entre 1 y 100.\n'+
                            '-> '+prefix+'frase :: Te devuelve una frase de WoW al azar.\n```');
                            
    }
// FUNCION QUE DEVUELVE EL MENSAJE DE AYUDA DE LOS COMANDOS QUE TIENEN ARGUMENTOS.
//-------------------------------------------------------------------------------.
exports.mensaje_ayuda_argumentos = function (comando)
    {
        switch (comando)
            {
                case "play":
                    {
                        var mensaje =   '** COMANDO !PLAY **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'El comando !play reproduce videos de Youtube, si le pasas el link lo validará y sonará, también puedes buscar por título de la canción\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !play [Link de youtube]\n'+
                                        '2-> !play [Titulo de canción]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!play https://www.youtube.com/watch?v=pAgnJDJN4VA&list=PLSKiP8AuSHiiVL-L7Cs6MhpXGeJykaWWj\n'+
                                        '!play Black In Black ```\n';
                        break;
                    }
                case "limpiar":
                    {
                        var mensaje =   '** COMANDO !LIMPIAR **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'El comando !limpiar es para uso de los administradores y borra entre 1 y 100 mensajes \n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !limpiar [Nº de 1 al 100]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!limpiar 10 \n'+
                                        '!limpiar 100 ```\n';   
                        break;         
                    }
                case "poner_rol":
                    {
                        var mensaje =   '** COMANDO !PONER_ROL **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando asignará el rol especificado al usuario mencionado. \n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !poner_rol @miembro [nombre del rol]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!poner_rol @pepito tanque \n'+
                                        '!poner_rol @juanito dps ```\n';   
                        break;         
                    }
                case "quitar_rol":
                    {
                        var mensaje =   '** COMANDO !QUITAR_ROL **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando quitará el rol especificado al usuario mencionado. \n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !quitar_rol @miembro [nombre del rol]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!quitar_rol @pepito tanque \n'+
                                        '!quitar_rol @juanito dps ```\n';   
                        break;         
                    }
                case "cambiar_nick":
                    {
                        var mensaje =   '** COMANDO !CAMBIAR_NICK **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando cambiará el apodo del usuario mencionado.\nPara que funcione los nombres que especifiquemos no deben contener espacios, el apodo se mostrará con la primera letra en mayúsculas y las siguientes en minúsculas independientemente de como las escribamos. \n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !cambiar_nick @miembro [nuevo_nombre]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!cambiar_nick @pepito moonshadow \n'+
                                        '!cambiar_nick @juanito barbaalegre ```\n';   
                        break;         
                    }
                case "montar_raid":
                    {
                        var mensaje =   '** COMANDO !MONTAR_RAID **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando permite crear una lista donde los mienbros pueden apuntarse según su rol. Se pueden configurar raids de 5, 10 y 25 jugadores. Una vez iniciado el comando, el bot mostrará un mensaje y a partir de ahí los miembros se pueden apuntar tan sólo indicando su rol (tanque,dps,heal) el bot dejará de capturar mensajes cuando se supere el limite de (20,40 ó 100) mensajes recibidos o cuando se supere el tiempo. A partir de ahí el bot configurará una tabla con las personas que se apunten en orden de solicitud y su rol para que el RaidLeader pueda ver si cumplen los requisitos para ir a la raid y lo mostrará en mensaje. Este comando está pensado para montar en poco tiempo. Para montar eventos a más largo recorrido es mejor usar los comandos de eventos. \n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !montar_raid  [tipo de raid (5,10,25)] [tiempo de espera en minutos]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!montar_raid 25 60 --> monta una raid de 25 y espera 1 hora recibiendo las peticiones \n'+
                                        '!montar_raid 5 10 --> monta una mazmorra y espera 10 minutos recibiendo las petiociones ```\n';   
                        break;         
                    }
                case "stats":
                    {
                        var mensaje =   '** COMANDO !STATS **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra las estadísticas de un personaje de World of Warcraft retail de los reinos de EU. También se puede utilizar con el alias "estadisticas".\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !stats  [nombre_de_personaje] [reino]\n'+
                                        '2-> !estadisticas  [nombre_de_personaje] [reino]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!stats barbaalegre tyrande --> te trae las estadísticas del personaje barbaalegre del reino Tyrande \n'+
                                        '!estadisticas moonshadow uldum --> te trae las estadísticas del personaje moonshadow de reino Uldum ```\n';   
                        break;         
                    }
                case "equipo":
                    {
                        var mensaje =   '** COMANDO !EQUIPO **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra la equipación de un personaje de World of Warcraft retail de los reinos de EU.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !equipo  [nombre_de_personaje] [reino]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!equipo barbaalegre tyrande --> te trae la equipación del personaje barbaalegre del reino Tyrande \n'+
                                        '!equipo moonshadow uldum --> te trae la equipación del personaje moonshadow de reino Uldum ```\n';   
                            break;         
                    }    
                case "talentos": case "talentos_lite":
                    {
                        var mensaje =   '** COMANDO !TALENTOS **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra las ramas de talentos, con la descripción de cada talento, de un personaje de World of Warcraft retail de los reinos de EU. Si sólo quieres ver la rama de talentos sin la descripción puedes usar el comando !talentos_lite\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !talentos  [nombre_de_personaje] [reino]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!talentos barbaalegre tyrande --> te trae las ramas de talentos del personaje barbaalegre del reino Tyrande \n'+
                                        '!talentos moonshadow uldum --> te trae las ramas de taletos del personaje moonshadow de reino Uldum ```\n';   
                            break;         
                    }
                case "item": case "items":
                    {
                        var mensaje =   '** COMANDO !ITEM **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra una lista de hasta 20 objetos que contengan el texto introducido y te devuelve los datos del objeto elegido. Si el objeto elegido iniciase una misión también te devuelve los datos de la misión. También se puede utilizar con el alias "items"\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !item  [texto a buscar]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!item riendas --> muestra una lista de 20 objetos que contiene "riendas" para que puedas elejir 1 y mostrarlo\n'+
                                        '!item nota del almirante --> muestra los datos del objeto Nota del Almirante y los de la misión que inicia ```\n';   
                            break;         
                    } 
                case "misiones_en":
                    {
                        var mensaje =   '** COMANDO !MISIONES_EN **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra una lista de hasta 20 zonas que contengan el texto introducido y te devuelve la lista de misiones de la zona elegida.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !misiones_en  [texto a buscar]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!misiones_en Dun --> muestra una lista de 2 zonas (Dun Morogh y Vol`Dum) para que elijamos 1 y nos devuelva el listado de misiones de esa zona.\n'+
                                        '!misiones_en Dum m --> nos muestra la lista de misiones de Dun Morogh ```\n';   
                            break;         
                    }
                case "mision":
                    {
                        var mensaje =   '** COMANDO !MISION **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra la misión con el ID que le pasemos.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !mision  [ID_MISION]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!mision 26078 --> muestra la misión Extinguir las llamas\n'+
                                        '!mision 53370 --> muestra la misión La hora de la verdad ```\n';   
                            break;         
                    }  
                case "bicho":
                    {
                        var mensaje =   '** COMANDO !BICHO **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Este comando muestra una criatura con el ID que le pasemos.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !bicho  [ID_CRIATURA]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!bicho 13136 --> muestra Zángano Colmen`Ashi\n'+
                                        '!bicho 42722 --> muestra Mastin joven ```\n';   
                            break;         
                    }  
                case "crear_evento":
                    {
                        var mensaje =   '** COMANDO !CREAR_EVENTO **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Con este comando podemos crear eventos para una fecha y hora determinada, además estos eventos comprobarán el GearScore del personaje que quiere apuntarse.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !crear_evento [DD/MM/AAAA] [HH:MM] [GearScore(0-999)] [nombre del evento]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!crear_evento 29/07/2020 20:00 115 raideo de mazzmorras ```\n';
                            break;         
                    }  
                case "borrar_evento":
                    {
                        var mensaje =   '** COMANDO !BORRAR_EVENTO **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'Con !borrar_evento y el id del evento lo borramos de la lista y vuelve a listar los eventos con los nuevos id`s.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !borrar_evento [id (0-9)]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!borrar_evento 2 --> borraría el tercer evento de la lista que tiene el id = 2 ```\n';
                            break;         
                    }  
                case "apuntarse":
                    {
                        var mensaje =   '** COMANDO !APUNTARSE **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        'El comando !apuntarse perimte apuntar un personaje de un reino a un evento controlando que cumpla el requisito de GearScore.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !apuntarse [id del evento (0-9)] [Rol a ocupar (dps-heal-tanque)] [nombre_de_personaje] [reino]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!apuntarse 2 dps ekym tyrande --> apuntaría a Ekym al evento 2 si cumple con el GearScore. ```\n';
                            break;         
                    }                  
                case "ver_evento":
                    {
                        var mensaje =   '** COMANDO !VER_EVENTO **\n ```\n'+
                                        'DESCRIPCIÓN: \n'+
                                        '-------------\n'+
                                        '!ver_evento y el id del evento nos mostrará el evento y las listas de jugadores que se han apuntado a él.\n\n'+
                                        'FORMATO: \n'+
                                        '---------\n'+
                                        '1-> !ver_evento [id (0-9)]\n\n'+
                                        'EJEMPLOS: \n'+
                                        '----------\n'+
                                        '!ver_evento 2 --> Muestra el evento 2 y su lista de DPS, HEAL y TANQUES. ```\n';
                            break;         
                    }  


            }
        return mensaje;
    }
