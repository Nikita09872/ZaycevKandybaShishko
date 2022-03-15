module.exports = function (grunt) {
    const zavod_translatorDirPath = './police_translator/';

    const scWebDirPath = '../../../ostis-web-platform/sc-web';
    const clientJsDirPath = scWebDirPath + '/client/static/components/js/';
    const clientCssDirPath = scWebDirPath + '/client/static/components/css/';
    const clientHtmlDirPath = scWebDirPath + '/client/static/components/html/';
    const clientImgDirPath = scWebDirPath + '/client/static/components/images/';

    grunt.initConfig({
        concat: {
            police_translator: {
                src: [zavod_translatorDirPath + 'src/*.js'],
                dest: zavod_translatorDirPath + 'static/js/police_translator.js'
            },
        },
        copy: {
            police_translatorJs: {
                cwd: zavod_translatorDirPath + 'static/js/',
                src: 'police_translator.js',
                dest: clientJsDirPath + 'police_translator/',
                expand: true,
                flatten: true
            },
            police_translatorCss: {
                cwd: zavod_translatorDirPath + 'static/css/',
                src: '*.css',
                dest: clientCssDirPath,
                expand: true,
                flatten: true
            },
            police_translatorHtml: {
                cwd: zavod_translatorDirPath + 'static/html/',
                src: ['*.html'],
                dest: clientHtmlDirPath,
                expand: true,
                flatten: true
            },
            police_translatorImg: {
                cwd: zavod_translatorDirPath + 'static/images/',
                src: '*.png',
                dest: clientImgDirPath + 'police_translator/',
                expand: true,
                flatten: true
            }
        },
        watch: {
            police_translatorJs: {
                files: zavod_translatorDirPath + 'src/**',
                tasks: ['concat:police_translator', 'copy:police_translatorJs'],
            },
            police_translatorCss: {
                files: zavod_translatorDirPath + 'static/css/**',
                tasks: ['copy:police_translatorCss'],
            },
            police_translatorHtml: {
                files: [zavod_translatorDirPath + 'static/html/**'],
                tasks: ['copy:police_translatorHtml'],
            },
            police_translatorImg: {
                files: [zavod_translatorDirPath + 'static/images/**'],
                tasks: ['copy:police_translatorImg'],
            },
        },
        exec: {
            updateCssAndJs: 'sh scripts/update_css_and_js.sh'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-exec');

    grunt.registerTask('default', ['concat', 'copy', 'exec:updateCssAndJs', 'watch']);
    grunt.registerTask('build', ['concat', 'copy', 'exec:updateCssAndJs']);

};