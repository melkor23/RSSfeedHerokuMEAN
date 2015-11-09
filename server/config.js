'use strict';


var rss = require("rss");


exports.returnConfig = function () {
    var configActual = {};
    configActual.feedAll = 'http://www.divxatope.com/feeds.xml' //pagina de donde se cogen los Feeds para mostrar
    configActual.urlInicial = 'http://www.divxatope.com/descargar/';
    configActual.urlFinal = 'http://www.divxatope.com/torrent/';


    var cronJobActualizacion = {
        cronTime: '*/900 * * * * *',
        start: true,
        timeZone: "America/Los_Angeles"
    };
    configActual.cronJob = cronJobActualizacion;
    
    
    /*
    *   Configuración de rss 
    */
     configActual.rssFeed = new rss({
        title: 'Melkor Personal RSS feed',
        description: 'Feed megaxupiguay',
        feed_url: 'http://peaceful-ridge-2845.herokuapp.com/api/rssFeeds',
        site_url: 'http://peaceful-ridge-2845.herokuapp.com/',
        image_url: 'http://example.com/icon.png',
        docs: 'http://example.com/rss/docs.html',
        managingEditor: 'Melkor',
        webMaster: 'Melkor',
        copyright: 'Melkor',
        language: 'es',
        categories: [],
        pubDate: new Date()/*'May 25, 2015 04:00:00 GMT'*/,
        ttl: '60',
        custom_namespaces: {},
        items: []
     });
    
    
    //direccion Busqueda  kat
    configActual.direccionBusquedaKat='http://kat.cr/json.php?q=';

    return configActual;
}