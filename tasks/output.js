/*
 * grunt-output
 * https://github.com/lucaslopez/grunt-output
 *
 * Copyright (c) 2015 Lucas Lopez
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');

var chunks = ['before', 'content', 'after'];
var varsGrunt = 
{
	printers : ['log', 'verbose'],
	functions : ['write', 'writeln', 'error', 'errorlns', 'ok', 'oklns', 'subhead', 'writeflags', 'debug']
};
var varsColor = 
{
	colors : ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white', 'gray', 'grey'],
	backgrounds : ['bgBlack', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgWhite'],
	styles : ['reset', 'bold', 'dim', 'italic', 'underline', 'inverse', 'hidden', 'hidden'],
	extras : ['rainbow', 'zebra', 'america', 'trap', 'random']
};


module.exports = function(grunt) {

  grunt.registerMultiTask('output', 'Output messages as grunt.log / grunt.verbose would with multiple options', function(text) {

	var defaultOptions = this.options({
      before: {
		mode: 'log',
		func: 'writeln',
		text: '',
		before: '',
		after: '',
		color: '',
		background: '',
		styles: [],
		extras: []
	  },
	  content: {
		mode: 'log',
		func: 'writeln',
		before: '',
		after: '',
		color: '',
		background: '',
		styles: [],
		extras: []
	  },
      after: {
		mode: 'log',
		func: 'writeln',
		text: '',
		before: '',
		after: '',
		color: '',
		background: '',
		styles: [],
		extras: []
	  }
    });
	
	var options = _.merge(defaultOptions, this.data);
	
	chunks.forEach(function(chunk) {
		var chunkOptions = options[chunk];
		if (varsGrunt.printers.indexOf(chunkOptions.mode) != -1 && varsGrunt.functions.indexOf(chunkOptions.func) != -1 )
		{
			// Create message
			var msg;
			if (chunk == 'content') msg = text; else msg = chunkOptions.text;
			msg = chunkOptions.before + msg + chunkOptions.after;
			// Set color
			if (chunkOptions.color)
			{
				if (varsColor.colors.indexOf(chunkOptions.color) != -1)
					msg = msg[chunkOptions.color];
				else
					grunt.fail.warn("Not valid color '" + chunkOptions.color + "'. Please use one of the following list: " + JSON.stringify(varsColor.colors));
			};
			/*
			// Set background color
			if (chunkOptions.background)
			{
				if (varsColor.backgrounds.indexOf(chunkOptions.background) != -1)
					msg = msg[chunkOptions.background];
				else
					grunt.fail.warn("Not valid background color '" + chunkOptions.background + "'. Please use one of the following list: " + JSON.stringify(varsColor.backgrounds));
			};
			*/
			// Set styles
			if (chunkOptions.styles && chunkOptions.styles instanceof Array)
			{
				chunkOptions.styles.forEach(function(style)	{
					if (varsColor.styles.indexOf(style) != -1)
						msg = msg[style];
					else
						grunt.fail.warn("Not valid style '" + style + "'. Please use one of the following list" + JSON.stringify(varsColor.styles));

				});
			};
			// Set extras
			if (chunkOptions.extras && chunkOptions.extras instanceof Array)
			{
				chunkOptions.extras.forEach(function(extra)	{
					if (varsColor.extras.indexOf(extra) != -1)
						msg = msg[extra];
					else
						grunt.fail.warn("Not valid extra '" + extra + "'. Please use one of the following list: " + JSON.stringify(varsColor.extras));

				});
			};
			// Print the message
			var print = grunt[chunkOptions.mode][chunkOptions.func];
			print(msg);
		}
		else
		{
			grunt.fatal.warn("Not a valid printing object/function '" + chunkOptions.mode + '.' + chunkOptions.func + "(msg)'" + ". Please visit http://gruntjs.com/api/grunt.log for a list of valid printers in Grunt");
		}
	
		
	});
  });

};
