# grunt-output

> Output messages with grunt.log() / grunt.verbose(). Having a task to output messages has some advantages over grunt.log function: on the one hand it will queue messages so they will be actually printed before or after another task; on the other it will allow you to have predefined templates to output headers, separators, etc with colors and styling.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-output --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-output');
```

Another great way to automatically load NPM tasks is to use the [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) plugin.

## The "output" task

### Overview
In your project's Gruntfile, add a section named `output` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  output: {
    your_style: {
      before :
      {
        mode : 'log',
        func : 'writeln',
        before : '',
        text : '************************************************************************************',
        color : 'magenta',
        styles: ['bold']
      },
      content :
      {
        mode : 'log',
        func : 'writeln',
        before : '>> ',
        after : ' <<',
        color: 'white',
        styles: ['bold']
      },
      after :
      {
        mode : 'log',
        func : 'writeln',
        text : '************************************************************************************',
        color : 'magenta',
        styles: ['bold']
      }
    }
  }
});
```

Another great way to automatically configure tasks is to use the [load-grunt-config](https://github.com/firstandthird/load-grunt-config) plugin.

After that you can log messages calling the output task:
```js
grunt.task.run('output:h1:This is the begining of my build script!');
```
Which will log the following text when the task is executed (asterisks will be in magenta color and text in white):
```shell
************************************************************************************
>> This is the begining of my build script! <<
************************************************************************************
```


### Options
You can set three options in your targets: 'before', 'content' and 'after'. Options 'before' and 'after' define the text lines that will be logged before and after the message you want to output. The 'content' option defines the line with your message. Each of these options accept the same suboptions, represented here:

#### options.mode
Type: `String`
Default value: `'log'`

Which grunt object use to log (either 'log' or 'verbose'). More information about them can be found in http://gruntjs.com/api/grunt.log

#### options.func
Type: `String`
Default value: `'writeln'`

Which of the grunt object's functions use to log. More information about them can be found in http://gruntjs.com/api/grunt.log

#### options.before
Type: `String`
Default value: `''`

String to add before the text line.

#### options.after
Type: `String`
Default value: `''`

String to add after the text line.

#### options.text
Type: `String`
Default value: `''`

String in the middle of the line.

#### options.color
Type: `String`
Default value: `''`

Text color of the line to be printed. You can use any color available in the [npm colors package](https://www.npmjs.com/package/colors).

#### options.styles
Type: `Array`
Default value: `[]`

Array of styles to apply to the line of text. You can use any style available in the [npm colors package](https://www.npmjs.com/package/colors).

#### options.extras
Type: `Array`
Default value: `[]`

Array of extras to apply to the line of text. You can use any extra available in the [npm colors package](https://www.npmjs.com/package/colors).


### Usage Examples

#### Header 1 style
In this example, we are defining a colorful style for a heading:

```js
grunt.initConfig({
  output: {
    h1 : {
        before :
        {
            text : '************************************************************************************\n',
            after : '************************************************************************************',
            styles: ['bold'],
            extras: ['rainbow']
        },
        content :
        {
            before : '>> ',
            after : ' <<',
            color: 'cyan',
            styles: ['underline', 'bold']
        },
        after :
        {
            text : '************************************************************************************\n',
            after : '************************************************************************************',
            color : 'magenta',
            styles: ['cyan'],
            extras: ['rainbow']
        }
    }
});
```

Which can be called with:

```js
grunt.task.run('output:h1:The beginning of the end');
```

#### Header 4 style
This is a not so visible header style that will be only showed in verbose mode (grunt -v ...).

```js
grunt.initConfig({
  output: {
    h4 : {
        content :
        {
            before : '>> ',
            after : ' <<',
            color: 'yellow',
            styles: ['bold']
        }
    }
});
```


Which can be called with:

```js
grunt.task.run('output:h1:The beginning of the end');
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
