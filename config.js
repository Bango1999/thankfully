// what do you want to call your Web Server?
const name = 'ThankFully'; // default: 'Thanksgiving Box'



// do you need to run the server on a specific port?
const port = 4000; // default: 4000



// what is the name of the image you have stored in views/assets
//  that will be displayed in the page header?
const logo = 'logo.png'; // default: 'logo.png'



/*
  EDIT TOKENS BELOW ACCORDING TO YOUR NEEDS
    i.e. if you have 2 game servers posting to this app
    then give them each a token. You will need to share
    the id and token manually to its respective game server
    default:
      "0": "token_for_server_0",
      "1": "token_for_server_1"
*/
const tokens = {
  "0": "token_for_server_0",
  "1": "token_for_server_1"
};



// What do you want to search to try to find a default player name?
// This code will find '229) ' in (A/229) Huckleberry, and set that as their default player name.
// Otherwise, it will be the last name in their list of names
const handleTag = '%#^$(*HHHJKV*())'; // note, if you dont want to use it, just make it something really obscure like '%#^$(*HHHJKV*())'

// Do you want to enable the button to show the stats in Tree View?
// NOTE: This is resource intensive, and freezes some browsers while the tree is generated
const treeView = true; // default: true


// what do you want to call your database?
const databaseName = 'db'; // default: 'db'

// what do you want to call your backup database?
const backupDatabaseName = 'db_backup'; // default: 'db_backup'


// This needs to be sufficiently large to fit a growing dataset
const postJsonSizeLimit = '20mb'; // default: '20mb'


//----------------------------------------------
//DO NOT EDIT PAST THIS LINE





module.exports = {
  getName: function() { return name },
  getLogo: function() { return logo },
  getPort: function() { return port },
  getTokens: function() { return tokens },
  getDB: function() { return databaseName },
  getHandleTag: function() { return handleTag },
  getTreeView: function() { return treeView },
  getBDB: function() { return backupDatabaseName },
  getPostJsonSizeLimit: function() { return postJsonSizeLimit }
}
