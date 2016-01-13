module.exports = function(grunt){
	grunt.initConfig({
		less: {
			development: {
				files: {
					"v2ex.css": "v2ex.less"
				}
			},
			production: {
				options: {
					compress: true
				},
				files: {
					"v2ex.min.css": "v2ex.less"
				}
			}
		},

		qiniu: {
			options: {
				accessKey: '',//七牛密钥
				secretKey: '',
				bucket: '',
				domain: '',//七牛域名
				resources: {
					pattern: [
						'icon/*',
						'img/*',
						'font/*',
						'v2ex.min.css'
					]
				},
				keyGen: function(cwd, file){
					return file.replace('icon/','v2ex-material-theme2/icon/')
						.replace('img/','v2ex-material-theme2/img/')
						.replace('font/','v2ex-material-theme2/font/')
						.replace('v2ex.min.css','v2ex-material-theme2/v2ex.min.css');
				},
				ignoreDup: false
			},
			your_target: {
				// Target-specific file lists and/or options go here.
			}
		},

		//监视器
		watch: {
			css: {
				files: ['v2ex.less'],
				tasks: ['less']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-qiniu-deploy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	//测试环境
	grunt.registerTask('default', ['less']);

	//上传
	grunt.registerTask('build', ['less','qiniu']);
};