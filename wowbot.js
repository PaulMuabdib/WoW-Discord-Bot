// CONFIGURACION DEL BOT.
//----------------------.
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
const ytdl = require('ytdl-core');
const ayuda = require("./lib/ayuda");
const build = require("./lib/builds");
const audio = require("./lib/audio");
const admin = require("./lib/admin");
const otros_comandos = require("./lib/otros");
const raid = require("./lib/raid");
const blizz = require ('./lib/wowapi');
const eventos = require ("./lib/eventos");
client.login(config.token);

// DECLARACION DE VARIABLES GLOBALES.
//----------------------------------.
let queue = new Map();
let serverQueue;
let prefix = config.prefix;                                                                // Variable para el prefijo de los comandos.
let canalvoz;
let rol;
let roles;

// ACTIVACION DEL BOT.
// ------------------.
client.on("ready", () => {console.log("Listo y preparado para el funcionamiento!"); });     

// CAPRURAMOS EL MENSAJE Y LO DIVIDIMOS EN SENTENCIA Y ARGUMENTOS.
// --------------------------------------------------------------.
client.on("message", async message => 
    {
        const args = message.content.slice(prefix.length).trim().split(/ +/g);        
        const command = args.shift().toLowerCase();                                     // Convertimos el comando en minusculas para evitar errores en las comparaciones.
        let texto = args.join (" ");                                                    // Variable para guardar los argumentos.
        if (!message.content.startsWith(prefix)) return;                                // Si el mensaje no tiene el prefijo lo ignoramos. 
        switch (command)                                                                // COMENZAMOS CON LAS COMPARACIONES PARA ACTIlet LA FUNCIÓN CORRESPONDIENTE.                                                
            {
                case "help": case "ayuda": case "h":                      
                        if (!texto)
                            {             
                                ayuda.mensaje_ayuda_general(prefix, message);                                
                                message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
                                return;
                            }
                        else
                            {
                                let comando_ok = ayuda.comprobar_comandos(texto); 
                                switch (comando_ok)
                                    {
                                    case true:
                                        let necesita_argumentos = ayuda.comandos_con_argumentos(texto);
                                        if (necesita_argumentos == false)
                                            {
                                                message.channel.send("Este comando no necesita argumentos");
                                                return;
                                            }
                                        else if (necesita_argumentos == true)
                                            {
                                                let mensaje = ayuda.mensaje_ayuda_argumentos(texto);
                                                message.author.send (mensaje);
                                                message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
                                                return;
                                            }
                                    case false:
                                        message.channel.send("Lo siento, la ayuda no reconoce ese comando");
                                        return;                                    
                                    }
                            }     
                        
/*      ESTOS COMANDOS DE BUILDS HAN SIDO DESESTIMADOS, QUEDAN PENDIENTES PARA FUTURAS VERSIONES 
        ========================================================================================
                case "sangre": case "profano": case "oso": case "asesinato": case "sombras": case "fuego":
                    let mensaje_embed = build.mensaje_build(command);
                    message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
                    message.author.send (mensaje_embed);                    
                    break;
                case "play" :
                    reproducirytb (message, texto);
                    break;
                case "stop":
                    stop(message);
                    break;
                case "skip":
                    skip(message);
                    break;


*/
                case "leave": case "join":
                    audio.control_E_S(message.member.voice.channel, message.channel, command);
                    break;
                case "preparados": case "murloc": case "chistes":        
                    const archivo = "./sonidos/"+command+".mp3"
                    canalvoz = message.member.voice.channel;
                    if(!canalvoz) {return message.channel.send('Primero debo unirme a un canal de voz.');}
                    else
                        {                            
                            let connection = await canalvoz.join();
                            connection.play(archivo);
                        }
                    break;                
                case "limpiar":
                    admin.limpiar_chat (texto,message);                  
                    break;
                case "poner_rol":
                    rol = args.slice(1, (args.length));
                    roles = rol.join(" ");                    
                    message.channel.send(admin.agregar_rol(message, roles));
                    break;
                case "quitar_rol":
                    rol = args.slice(1, (args.length));
                    roles = rol.join(" ");
                    message.channel.send(admin.quitar_rol(message, roles));
                    break;
                case "crear_roles":
                    admin.crear_roles(message);
                    break;
                case "crear_canales":
                    admin.crear_canales(message);
                    break;
                case "cambiar_nick":
                    let name = args.slice(1, (args.length));
                    let nombre = name.join(" ");
                    admin.cambiar_nick (message, nombre);
                    break;
                case "frase":
                    message.channel.send(otros_comandos.frase_random());
                    break;
                case "trivial":
                    otros_comandos.trivial(message);
                    break;
                case "dame_gif":
                    otros_comandos.gif_wow(message);
                    break;
                case "alianza":
                    message.channel.send(otros_comandos.por_la_alianza());
                    break;
                case "horda":
                    message.channel.send(otros_comandos.por_la_horda());
                    break;                
                case "montar_raid":
                    raid.motar_raid(message, args[0], args[1]);
                    break;
                case "dados":
                    message.channel.send(otros_comandos.dados());
                    break;                
                case "stats": case "estadisticas":
                    let servidor = args.slice(1, (args.length));
                    servidor = servidor.join('-');
                    blizz.get_stats(message, args[0], servidor);                    
                    break;
                case "equipo":
                    let servidor2 = args.slice(1, (args.length));  
                    servidor2 = servidor2.join ('-');          
                    blizz.get_equipo(message,args[0],servidor2);
                    break;
                case "talentos":
                    let servidor3 = args.slice(1, (args.length));
                    servidor3 = servidor3.join('-');
                    blizz.get_talentos_completos(message,args[0],servidor3);
                    break;
                case "talentos_lite":
                    let servidor4 = args.slice(1, (args.length));
                    servidor4 = servidor4.join('-');
                    blizz.get_talentos_lite(message,args[0],servidor4);
                    break;
                case "items": case "item":
                    blizz.buscar_item(message,texto);
                    break;
                case "misiones_en":
                    blizz.buscar_mision(message,texto);
                    break;
                case "mision":
                    blizz.mostrar_mision(message,args[0]);
                    break;
                case "bicho":
                    blizz.mostrar_criatura(message,args[0]);
                    break;
                case "crear_evento":
                    let nombre_evento = args.slice(3, (args.length));
                    nombre_evento = nombre_evento.join (' ');
                    eventos.crear_evento(message,args[0],args[1],args[2],nombre_evento);
                    eventos.listar_eventos(message);
                    break;
                case "lista_eventos":
                    eventos.listar_eventos(message);
                    break;
                case "borrar_evento":
                    eventos.borrar_evento(message, args[0]);
                    eventos.listar_eventos(message);
                    break;
                case "apuntarse":
                    let servidor5 = args.slice(3, (args.length));
                    servidor5 = servidor5.join('-');
                    eventos.apuntarse(message,args[0],args[1],args[2],servidor5);
                    break;
                case "ver_evento":
                    eventos.ver_evento(message,args[0]);
                    break;
                default:
                    message.channel.send("Ese comando no lo reconozco, ¿estas seguro que lo has escrito bien, soldado?.");
            }
    });

//--------------------------------------------------------------------------------------------------------------------------------------------------------
// F U N C I O N E S   P A R A   L A   G E S T I O N   D E   L A   C O L A   D E   M U S I C A
//--------------------------------------------------------------------------------------------------------------------------------------------------------

// FUNCION PARA AÑADIR A LA LISTA DE PREPRODUCCIÓN UNA CANCION.
//------------------------------------------------------------.
async function reproducirytb (message, texto) 
    {
        const queue = new Map();
        const voiceChannel = message.member.voice.channel;                                                          // Guardamos el canal de voz.
        let url_cancion;
        let titulo_cancion;
        let correcto = false;
        if (!voiceChannel)                                                                                          // Comprobamos que este en un canal de voz.
            {return message.channel.send("Tienes que estar en un canal de audio para reproducir música");}
        const permissions = voiceChannel.permissionsFor(message.client.user);                                       // Comprobamos los permisos.
        if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) 
            {return message.channel.send("No tengo permisos para reproducir en este canal!"  );}        
        enlace = texto.startsWith("https://www.youtube.com/watch");                                                 // Comparamos el texto es un enlace de Youtube.
        if (enlace == false )                                                                                       // Si no lo es buscamos por titulo.
            { 
                url_cancion = await audio.buscar_direccion_web (texto);                                             // Guardamos la URL de la búsqueda.
                titulo_cancion = await audio.buscar_titulo(texto);  
            }                                      
        else                                                                                                        // Si es un enlace comprobamos si es válido.
            {
                correcto = await audio.validar_direccion_web (texto);
                if (correcto == false)                                                                              // Si no es valido avisamos.
                    {
                        message.channel.send ("La url no corresponde con ningun video");
                        return;                        
                    }
                else if (correcto == true)                                                                          // Si es valido lo guardamos en url_cancion.
                    { 
                        url_cancion = texto; 
                        titulo_cancion = await audio.buscar_titulo(texto);  
                    }
                else                                                                                                // Control de un error inesperado, no debria actuar nunca
                    {
                        message.channel.send("No tengo ni idea de que ha pasado");
                        return;
                    }
            }        
        const song = 
            {
                title: titulo_cancion,
                url: url_cancion
            };
        if (!this.serverQueue)                                                                                      // Si no existe una lista de reproducción activa la creamos.
            {                
                const queueContruct = 
                    {
                        textChannel: message.channel,
                        voiceChannel: voiceChannel,
                        connection: null,
                        songs: [],
                        volume: 5,
                        playing: true
                    };
                queue.set(message.guild.id, queueContruct);
                this.serverQueue = queue.get(message.guild.id);
                this.serverQueue.songs.push(song);
                try                                                                                                 // Llamamos a la funcion play para iniciar la reprocción.
                    {                        
                        let connection = await voiceChannel.join();
                        queueContruct.connection = connection;
                        play(message.guild, this.serverQueue.songs[0]);
                    } 
                catch (err)                                                                                         // Gestionamos un posible error.
                    {
                        console.log(err);
                        queue.delete(message.guild.id);
                        return message.channel.send(err);
                    }
            } 
        else                                                                                                        // Existe la lista de reproducción y la añadimos.
            {
                this.serverQueue.songs.push(song);
                return message.channel.send(`${song.title} se ha añadido a la lista de reproduccion!`);
            }   
    }
// FUNCION PARA REPRODUCIR CANCIONES.
//----------------------------------.
async function play(guild, song ) 
    {
        if (!song)                                                                                                  // Si no hay tema ignoramos.
            {
              this.serverQueue.voiceChannel.leave();
              queue.delete(guild.id);
              return;
            }
        const dispatcher = this.serverQueue.connection.play(ytdl(song.url)).on('finish', () =>                      // Si hay tema lo hacemos sonar.
            {
                this.serverQueue.songs.shift();
                play(guild, this.serverQueue.songs[0]);
            }).on("error", error => console.error(error));
        dispatcher.setVolumeLogarithmic(this.serverQueue.volume / 5);
        this.serverQueue.textChannel.send(`Sonando: **${song.title}**`);                                            // Mostramos que canciones está sonando.
    }
// FUNCION PARA DETENER LA REPRODUCCION DE CANCIONES.
//--------------------------------------------------.
function stop(message) 
    {
        if (!message.member.voice.channel)                                                                          // Comprobamos que estes en un canal de audio
          return message.channel.send("Tienes que estar en un canal de audio para reproducir música.");
        this.serverQueue.songs = [];                                                                                // Vaciamos la lista de reproduccion.
        this.serverQueue.connection.dispatcher.end();                                                               // Terminamos la reproducción actual.
    }
// FUCION PARA SALTAR UN TEMA DE LA LISTA DE REPRODUCCIÓN.
//--------------------------------------------------------
function skip(message) 
    {
        if (!message.member.voice.channel)                                                                          // Comprobamos que estés en un canal de audio
            return message.channel.send("Tienes que estar en un canal de audio para reproducir música.");
        if (!this.serverQueue)                                                                                      // Si no hay lista avisamos
            return message.channel.send("Se terminó la lista de reproducción.");
        this.serverQueue.connection.dispatcher.end();                                                               // terminamos la reproducción actual.
    }
   