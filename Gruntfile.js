module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        banner: '/**\n' +
                ' * <%= pkg.name %> <%= pkg.version %>\n' +
                ' **/',

        // Unit tests.
        jshint: {
            all: ['Gruntfile.js', 'src/*.js'],
            options: {
                jshintrc: '.jshintrc',
            }
        },

        uglify: {
            options: {
                report: 'min',
                banner: '<%= banner %>\n\n',
                mangle: true,
                compress: {
                    drop_console: true
            }
            },
            deploy: {
                files: {
                    // destination: source
                    'dist/jquery.story.share.min.js': 'src/jquery.story.share.js'
                }
            }
        },

        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['jshint', 'uglify'],
                options: {
                    spawn: false
                }
            }
        },

        connect: {
            options: {
                directory: 'tests',
                keepalive: true
            },
            tests: {
                options: {
                    open: 'http://localhost:8000/tests/'
                }
            }
        },

    });

    // Load all grunt tasks
    require('load-grunt-tasks')(grunt);

    grunt.registerTask(
        'default',
        [
            'jshint',
            'uglify',
            'connect',
        ]
    );

};
