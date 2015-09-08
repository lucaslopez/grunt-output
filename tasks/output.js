var _ = require('lodash');

/*
 * grunt-output
 * https://github.com/lucaslopez/grunt-output
 *
 * Copyright (c) 2015 Lucas Lopez
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('output', 'Output messages as grunt.log / grunt.verbose would with multiple options', function(text) {
    // Merge task-specific and/or target-specific options with these defaults.
    
	var defaultOptions = this.options({
      before: {
		mode: 'log',
		func: 'writeln',
		color: 'white',
		bold: true,
		text: '',
		before: '',
		after: ''
	  },
	  content: {
		mode: 'log',
		func: 'writeln',
		color: 'white',
		bold: true,
		before: '',
		after: ''
	  },
      after: {
		mode: 'log',
		func: 'writeln',
		color: 'white',
		bold: true,
		text: '',
		before: '',
		after: ''
	  }
    });
	
	var options = _.merge(defaultOptions, this.data);
	
	var chunks = ['before', 'content', 'after'];
	var validPrinters = ['log', 'verbose'];
	var validFunctions = ['write', 'writeln', 'error', 'errorlns', 'ok', 'oklns', 'subhead', 'writeflags', 'debug'];
	var validColors = ['white', 'black', 'grey', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow', 'rainbow'];
	
	chunks.forEach(function(chunk) {
		var chunkOptions = options[chunk];
		if (validPrinters.indexOf(chunkOptions.mode) != -1 && validFunctions.indexOf(chunkOptions.func) != -1 )
		{
			if (validColors.indexOf(chunkOptions['color']) != 1)
			{
				var msg;
				var print = grunt[chunkOptions.mode][chunkOptions.func];
				if (chunk == 'content') msg = text; else msg = chunkOptions.text;
				msg = chunkOptions.before + msg + chunkOptions.after;
				msg = msg[chunkOptions.color];
				if (chunkOptions.bold) msg = msg.bold;
				print(msg);
			}
			else
			{
				grunt.fatal.warn('Not valid color ' + chunk.color + "'. Please use one of the following list: ['white', 'black', 'grey', 'blue', 'cyan', 'green', 'magenta', 'red', 'yellow', 'rainbow']");
			}
		}
		else
		{
			grunt.fatal.warn("Not a valid printing object/function '" + chunkOptions.mode + '.' + chunkOptions.func + "(msg)'" + ". Please visit http://gruntjs.com/api/grunt.log for a list of valid printers in Grunt");
		}
	
		
	});
  });

};
