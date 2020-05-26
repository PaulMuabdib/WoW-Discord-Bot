const { getInfo } = require('ytdl-getinfo');                                                // Declaramos ytdl-getinfo para poder hacer las busquedas de las canciones

//  BUSCAR LA CANCION POR TITULO.
//------------------------------.
exports.buscar_direccion_web =  async function (titulo)
    {        
        var URL;
        var URL3 = await getInfo(titulo).then(info => {URL = info.items[0].webpage_url;});
        return URL;
    }
 
//  COMPROBAR URL VALIDA YOUTUBE.
//------------------------------.
exports.validar_direccion_web = async function (direccion)
    {
        var existe = false;
        var URL3 = await getInfo(direccion)
            .then(info => {existe = true;})
            .catch (info =>{existe = false});
        return existe;
    }

//  BUSCAR TITULO DE LA CANCION.
//-----------------------------.
exports.buscar_titulo =  async function (direccion)
    {        
        var titulo;
        var URL3 = await getInfo(direccion).then(info => {titulo = info.items[0].track;});
        return titulo;
    }

// FUNCION PARA CONTROLAR LA ENTRADA/SALIDA DEL BOT AL CANAL DE AUDIO.
//-------------------------------------------------------------------.
exports.control_E_S = function (canal_voz,canal_texto, comando)
        {
            if (!canal_voz)
                {
                    canal_texto.send('No estas conectado a un canal de voz. Debes estar conectado a un canal de voz para poder introducir llamadas de entrada/salida');
                }
            else if (comando == "join")
                {
                    canal_texto.send('Conectando...').then(m => 
                        {
                            canal_voz.join().then( conexion => 
                                {
                                    m.edit('Conectado exitosamente.').catch(error => console.log(error));
        
                                }).catch(error => console.log(error));
        
                        }).catch(error => console.log(error));
                }
            else if (comando == "leave")
                {
                    canal_texto.send('Dejando el canal de voz.').then(() => 
                        {
                            canal_voz.leave();
    
                        }).catch(error => console.log(error));
                }
            else 
                {
                    canal_texto.send ("esto no esta controlado");
                }
        }

