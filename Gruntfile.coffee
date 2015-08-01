module.exports = (grunt) ->

	# Configure tasks
	grunt.initConfig

		# Get the project package file
		pkg: grunt.file.readJSON 'package.json'

		# Compile CoffeeScript
		coffee:
			compile:
				expand: true
				cwd: 'lib/coffee'
				src: ['**/*.coffee']
				dest: 'lib/js'
				ext: '.coffee.js'
				options:
					bare: true
					preserve_dirs: true

		# Concatinate compiled JS files
		concat:
			options:
				separator: ';'
				sourceMap: true
			dist:
				src: ['lib/js/*.coffee.js']
				dest: 'lib/js/build.js'

		# Compress (uglify) the bundled JS
		uglify:
			options:
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
				sourceMap: true
			dist:
				files: 'lib/js/build.min.js': ['<%= concat.dist.dest %>']

		# Watch for file changes
		watch:
			coffee:
				files: '<%= coffee.compile.src %>'
				tasks: ['coffee', 'concat', 'uglify']


	# load plugins
	grunt.loadNpmTasks 'grunt-contrib-coffee'
	grunt.loadNpmTasks 'grunt-contrib-watch'
	grunt.loadNpmTasks 'grunt-contrib-concat'
	grunt.loadNpmTasks 'grunt-contrib-uglify'

	# Tasks
	grunt.registerTask 'default', ['coffee', 'concat', 'uglify', 'watch']
