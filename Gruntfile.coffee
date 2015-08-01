module.exports = (grunt) ->

	# Configure tasks
	grunt.initConfig

		coffee:
			compile:
				expand: true
				cwd: 'lib/coffee'
				src: ['**/*.coffee']
				dest: 'lib/js'
				ext: '.js'
				options:
					bare: true
					preserve_dirs: true



	# load plugins
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	# grunt.loadNpmTasks 'grunt-contrib-watch'
