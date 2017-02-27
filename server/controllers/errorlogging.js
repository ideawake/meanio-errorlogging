'use strict';
var mongoose = require('mongoose');
module.exports = function(Errorlogging, app, auth, database, circles) {
  return {
    load:function(req,res) {
      // use static model method
    },
    post:function(req,res) {
      var ErrorModel = mongoose.model('Error');
      var error = new ErrorModel(req.body);
      error.save(function(err, errorObj) {
        if (err) {
          return res.status(500).json({
            error: 'Cannot save the error' + err
          });
        }
        var obj = {
          action: 'error',
          error: errorObj
        }
        if (req.user){
          obj.user = {
            name: req.user.name || '',
            _id: req.user._id || ''
          }
        }

        Errorlogging.events.emit('error', obj);

        res.status(200).json(obj);
      });
    }
  };
};
