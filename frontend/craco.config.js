const path = require('path')
const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
	webpack: {
		alias: {
			'@components': resolvePath('./src/components'),
			'@pages': resolvePath('./src/pages'),
			'@services': resolvePath('./src/services'),
			'@hooks': resolvePath('./src/hooks'),
			'@configs': resolvePath('./src/configs'),
			'@lib': resolvePath('./src/lib'),
			'@types': resolvePath('./src/types'),
			'@ui': resolvePath('./src/components/ui'),
		},
	},
}
