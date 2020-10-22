const path = require('path')
const fs = require('fs')

module.exports = (app) => {
	app.get('/', (req, res) => {
		res.render('index.html')
	})
	
	let files = [
		'/css/xterm.css',
		'/lib/xterm.js'
	].forEach(f => {
		let base = path.join(__dirname, 'node_modules/xterm')
		let url = '/xterm/' + f.split('/').pop()
		app.get(url, (req, res) => {
			try {
				res.sendFile(path.join(base, f))
			}
			catch(e) {
				console.log(e)
			}
		})
	})

	app.get('/xterm/fit.js', (req, res) => {
		let base = path.join(__dirname, 'node_modules/xterm-addon-fit/lib/xterm-addon-fit.js')
		res.sendFile(base)
	})

	app.use((req, res) => {
		res.status(404).render('error.html')
	})
	app.use((req, res) => {
		res.status(500).render('error.html')
	})
}