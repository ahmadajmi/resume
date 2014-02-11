module.exports = function(grunt){

	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        htmlhint: {
		    build: {
		        options: {
		            'tag-pair': true,
		            'tagname-lowercase': true,
		            'attr-lowercase': true,
		            'attr-value-double-quotes': true,
		            'doctype-first': true,
		            'spec-char-escape': true,
		            'id-unique': true,
		            'head-script-disabled': true,
		            'style-disabled': true
		        },
		        src: ['index.html']
		    }
		}
		,
		watch: {
		    html: {
		        files: ['index.html'],
		        tasks: ['htmlhint']
		    }
		    ,
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
		},
		imagemin: {
			options: {
        progressive: true
      },
			dynamic: {
				files: [{
					expand: true,
					cwd: 'img/',
					src: ['**/*.{png,jpg}'],
					dest: 'img/'
				}]
			}
		}
    });

    grunt.registerTask('default', []);
    grunt.registerTask('buildcss',  ['sass', 'cssmin']);

};