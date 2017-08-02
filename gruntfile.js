module.exports = function(grunt) {

    grunt.initConfig({
        copy: {
            assets: {
                files: [
                    // JSs
                    {
                        expand: true,
                        flatten: true,
                        cwd: './node_modules/',
                        src: [
                            'bootstrap/dist/js/**/*.js', //
                            'jquery/dist/*.js', //
                            'tether/dist/js/*.js', //
                        ],
                        dest: '_/js'
                    },
                    // CSSs
                    {
                        expand: true,
                        flatten: true,
                        cwd: './node_modules/',
                        src: [
                            'tether/dist/css/*.css',
                        ],
                        dest: '_/css'
                    },
                    // FONT-AWSOME FONTs
                    {
                        expand: true,
                        flatten: true,
                        cwd: './node_modules/',
                        src: [
                            'font-awesome/fonts/**/*.{ttf,woff,woff2,eof,svg}',
                        ],
                        dest: './fonts'
                    },
                ]
            },
            sass: {
                files: [
                    // BOOTSTRAP 4 SASSs
                    {
                     expand: true,
                     cwd: './node_modules/bootstrap/scss/',
                     src: [
                     '**',
                     ],
                     dest: './scss/bootstrap4'
                     },
                    // FONT-AWSOME SASSs
                    {
                        expand: true,
                        cwd: './node_modules/font-awesome/scss/',
                        src: [
                            '*.scss',
                        ],
                        dest: './scss/fontawesome'
                    },
                ],
            },
        },
        uglify: {
            dev: {
                options: {
                    sourceMap: true,
                    compress: false,
                    beautify: true,
                    sourceMapName: './js/scripts.min.js.map'
                },
                files: {
                    './js/scripts.min.js': [
                        '_/js/tether.js', // TETHER
                        '_/js/bootstrap.js', // BOOTSTRAP
                        '_/js/skip-link-focus-fix.js', // UNDERSCORES DEPS
                        //'_/js/customizer.js', // UNDERSCORES DEPS
                        //'_/js/navigation.js', // UNDERSCORES DEPS
                    ]
                }
            },
            prod: {
                options: {
                    sourceMap: false,
                    compress: true,
                    beautify: false,
                },
                files: {
                    './js/script.min.js': ['_/js/**/*.js']
                }
            },
        },
        concat_sourcemap: {
            options: {
                // Task-specific options go here.
            },
            dev: {
                files: {
                    './css/style.min.css': ['_/css/*.css']
                }
            }
        },
        compass: {
            dev: {
                options: {
                    sassDir: '_/sass',
                    cssDir: '_/css',
                    outputStyle: 'expanded',
                    sourcemap: true,
                    require: ['susy']
                }
            },
            prod: {
                options: {
                    sassDir: '_/sass',
                    cssDir: '_/css',
                    outputStyle: 'compressed',
                    require: ['susy']
                }
            },
        },
        clean: {
            js: ['./js/scripts.min.js', './js/scripts.min.js.map'],
            css: ['_/css/style.css', '_/css/style.css.map', './css/style.min.css', './css/style.min.css.map']
        },
        watch: {
            js: {
                files: ['_/js/*.js'],
                tasks: ['clean:js', 'uglify:dev'],
            },
            sass: {
                files: ['_/sass/**/*.scss'],
                tasks: ['clean:css', 'compass:dev', 'concat_sourcemap'],
            },
            php: {
                files: ['./**/*.php'],
            }
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src : [
                        './css/*.css',
                        './js/*.js',
                        './**/*.php'
                    ]
                },
                options: {
                    watchTask: true,
                    open: 'external',
                    proxy: 'localhost/wp-php-theme',
                    port: 8080,
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-concat-sourcemap');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('install_theme', ['clean', 'uglify:dev', 'compass:dev', 'concat_sourcemap']);

    grunt.registerTask('default', ['browserSync', 'watch']);
};