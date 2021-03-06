'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;
var Errorlogging = new Module('errorlogging');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Errorlogging.register(function(app, auth, database, circles) {

  // We enable routing. By default the Package Object is passed to the routes
  Errorlogging.routes(app, auth, database, circles);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Errorlogging.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Errorlogging.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Errorlogging.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Errorlogging;
});
