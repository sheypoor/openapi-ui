const request = require('request')
const express = require('express')
const process = require('process')
const app = express()
const swaggerUi = require('swagger-ui-express');

const yaml = require('js-yaml');
const fs   = require('fs');
const { response } = require('express');

// Read Yaml config 
var configMode = process.env.CONFIG_MODE
if (configMode == null) {
    configMode = "test"
}
console.log(`Config Stage: ${configMode}`);

let url_configs = {};
try {
    const rawFile = fs.readFileSync('./config/urls.yaml', 'utf8')
    const doc = yaml.load(rawFile);
    for(var i in doc[configMode].urls) {
        var u = doc[configMode].urls[i]
        url_configs[u.name] = u
    }
} catch (e) {
    console.log(e);
}

// register resource
app.get('/resource/:name', function(req, res) {
    if(req.params.name in url_configs) {
        let target = url_configs[req.params.name]
        request.get(target.swagger_url).pipe(res);
    } else {
        res.status(404);
    }   
})

// register swagger setup
class SwaggerItem {
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}

var options = {
    explorer: true,
    swaggerOptions: {
      urls: [ ]
    }
  }

Object.entries(url_configs).forEach(([k,v]) => {
    options.swaggerOptions.urls.push(new SwaggerItem(configMode+": "+v.title, '/resource/'+k))
})
console.log("Registered URLS:");
console.log(options.swaggerOptions.urls);

app.use('/', swaggerUi.serve, swaggerUi.setup(null, options));

// Run the service 
var port = process.env.APP_PORT
if (port == null) {
    port = "8080"
}
console.log(`Starting the service on port: ${port}`);
var server = app.listen(port);
server.setTimeout(30000);