module.exports = (grunt) ->

	# Configure tasks
	grunt.initConfig

		# Compile CoffeeScript
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

		# Watch for file changes
		watch:
			html:
				files: ['**/*.html']
			coffee:
				files: '<%= coffee.compile.src %>'
				tasks: ['coffee']
			options:
				livereload: true


	# load plugins
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'

	# Tasks
	grunt.registerTask 'default', ['coffee', 'watch']
