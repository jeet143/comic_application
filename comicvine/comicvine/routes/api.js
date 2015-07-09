var async = require('async');
var config = require('../config');
var superagent = require('superagent');

module.exports = function (app) {
  
  app.get('/movies/search', function(req, res) {

    superagent
      .get("http://www.comicvine.com/api/characters/?")
	  .query({format:"json"})
      .query({filter: 'name:' + req.query.title})
      .query({api_key: "187dbf8dd5cd7aae1f784116f740925747199724"})
      .end(function(err, result) {
	
        res.json(JSON.parse(result.text));
      });
  });
  
 app.get('/movies/details', function(req, res) {
	
    superagent
	
		.get("http://www.comicvine.com/api/character/4005-"+req.query.id+"/?api_key=187dbf8dd5cd7aae1f784116f740925747199724&format=json&field_list=name,publisher,id,api_detail_url,powers,image,deck,origin,character_enemies,character_friends")
      .end(function(err, result) {
        
		
		 res.json(JSON.parse(result.text));
		 
        //}
      });
  });
  
  app.get('/movies/versus', function(req, res) {

    async.parallel({
      mainDetail: function(next) {
        _characterDetails(req.query.main, next);
      },
      
      challengerDetail: function(next) {
        _characterDetails(req.query.challenger, next);
      }
    }, function done(err, results) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(results);
		
      }
    });
  });
};

  
  function _characterDetails(id, callback) {
  superagent
  
    
	.get("http://www.comicvine.com/api/character/4005-"+id+"/?api_key=187dbf8dd5cd7aae1f784116f740925747199724&format=json&field_list=name,publisher,id,api_detail_url,powers,image,deck,origin,character_enemies,character_friends,teams")
     
	
    .end(function(err, result) {
      callback(err, JSON.parse(result.text));
  });
  
  
};