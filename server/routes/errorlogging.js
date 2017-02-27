(function() {
    'use strict';

    /* jshint -W098 */
    // The Package is past automatically as first parameter
    module.exports = function(Errorlogging, app, auth, database, circles) {

        var requiresAdmin = circles.controller.hasCircle('admin');
        var requiresLogin = circles.controller.hasCircle('authenticated');
        var errorCtrl = require('../controllers/errorlogging')(Errorlogging, app, auth, database, circles);
        app.route('/api/errorlogging')
          .get(requiresAdmin)
          .post(errorCtrl.post);

        // app.get('/api/errorlogging/example/anyone', function(req, res) {
        //     res.send('Anyone can access this');
        // });

        // app.get('/api/errorlogging/example/auth', requiresLogin, function(req, res) {
        //     res.send('Only authenticated users can access this');
        // });

        // app.get('/api/errorlogging/example/admin', requiresAdmin, function(req, res) {
        //     res.send('Only users with Admin role can access this');
        // });

        // app.get('/api/errorlogging/example/render', function(req, res) {
        //     Errorlogging.render('index', {
        //         package: 'errorlogging'
        //     }, function(err, html) {
        //         //Rendering a view from the Package server/views
        //         res.send(html);
        //     });
        // });
    };
})();
