//catch the rookie mistake
try {
  const express = require('express');
} catch(e) {
  console.error('');
  console.error('Slow down there, Slick! You most likely still need to run the command "npm update"');
  console.error('( or execute the "Update_Thankfully.bat" file in the project root folder )');
  console.error('');
  console.error('Otherwise, the real issue is that I cannot successfully "require(\'express\')" at the top of server.js');
  console.error('');
  return;
}

//regularly scheduled programming
express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const API = require(path.join(__dirname, 'api/db_api.js'));
const CONFIG = require(path.join(__dirname, 'config.js'));
const LOGGER = require(path.join(__dirname, 'logger.js'));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit:CONFIG.getPostJsonSizeLimit()}));
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/css', express.static(path.join(__dirname, 'views/css')));
app.use('/json_viewer', express.static(__dirname + '/node_modules/jquery.json-viewer/json-viewer/'));
app.use('/mentions', express.static(__dirname + '/node_modules/jquery-mentions-input/'));
app.use('/underscore', express.static(__dirname + '/node_modules/underscore/'));
app.use('/assets', express.static(path.join(__dirname, 'views/assets')));
app.set('view engine', 'ejs');

//vars for easy logging
const e = 'error';
const i = 'info';
const t = 'task';

//serve index page
app.get('/', (req, res) => {
    res.render('html/index', {
        title: CONFIG.getName(),
        name: CONFIG.getName(),
        logo: CONFIG.getLogo(),
        treeView: CONFIG.getTreeView()
    });
});

//serve about page
app.get('/about', (req, res) => {
  res.render('html/about', {
    title: 'About ' + CONFIG.getName(),
    name: CONFIG.getName()
  });
});

//API for WEB View
app.post('/api/get/thanks', (req, res) => {
  LOGGER.log('WEB Server Data Requested: Sending the JSON object', i);
  res.json(API.getJson()); //send them the data they need
});

//update the database with new info
app.post('/api/give/thanks', (req, res) => {
  //LOGGER.log('DCS Server Stats Received: "' + req.body.name + '", ID ' + req.body.id, i);
  console.log(req.body)
  var err = API.update(req.body); //send it the stats and server info
  if (err) {
    LOGGER.log(err, e);
    res.end('fail');
  } else { res.end('pass') }

});

//serve app
app.listen(CONFIG.getPort() || 4000, function() {
  LOGGER.log(CONFIG.getName() + ' Server listening on port ' + CONFIG.getPort(), t);
});
