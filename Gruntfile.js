module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			css: {
				files: ['css/**/*.scss'],
				tasks: ['buildcss']
			}
		}
		,
		cssmin: {
			build: {
				src: 'css/main.css',
				dest: 'css/main.min.css'
			}
		}
		,
		sass: {
			build: {
				files: {
					'css/main.css': 'css/main.scss'
				}
			}
		}
	});

	grunt.registerTask('default', []);
	grunt.registerTask('buildcss',  ['sass', 'cssmin']);

};