const jsondb = require('node-json-db');
const CONFIG = require('../config.js');
const LOGGER = require('../logger.js');

//vars for easy logging
const e = 'error';
const i = 'info';
const t = 'task';

const DB = 'api/db/' + CONFIG.getDB();
const BDB = 'api/db/' + CONFIG.getBDB();

//helper function storejson:
//updates the databases with new stats
function updateJson(json) {
  // var serverId = authorizeToken(json['id'], json['token']);
  // if (serverId === false) {
  //   return 'Invalid Token, Aborting DB Update';
  // } else { LOGGER.log('Token validated, server ID: ' + serverId, i) }

  LOGGER.log('Performing DB update and backup...',i);

        //The second argument is used to tell the DB to save after each push
        //If you put false, you'll have to call the save() method.
        //The third argument is to ask JsonDB to save the database in an human readable format. (default false)
  var db = new jsondb(DB, true, true);
  var backupdb = new jsondb(BDB, true, true);
  try { var prevjson = db.getData('/') }
  catch(err) { return 'ERROR: Either the DB "'+ DB + '.json" does not exist, or there is no-thing "{}" within it' }
  backupdb.push('/', prevjson);
  LOGGER.log('Updated Backup DB',i);

  //do stuff
  db.push('/messages[]', json);
  LOGGER.log('Updated Main DB',i);
      //https://github.com/Belphemur/node-json-db
      //Deleting data
      //db.delete("/info");
}

//helper function getJson:
//returns the server json currently stored in the main db
function getJson() {
  var fdb = new jsondb(DB, true, true);
  try { var json = fdb.getData('/') }
  catch(err) {
    LOGGER.log('ERROR: Trying to send data to web client, but no data is available.',i);
    LOGGER.log('(Have you started recieving SLmod Stats data yet from any SLSC servers?)',i);
    LOGGER.log('Technical info: Either the DB "'+ DB + '.json" does not exist, or there is no ["server"] index within it',i);
    return false; //return empty object
  }
  return json;
}

module.exports = {
  update: function(json) { return updateJson(json) },
  getJson: function() { return getJson() }
};
