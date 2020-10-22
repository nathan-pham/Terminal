let terminal = document.getElementById('terminal')

let term = new Terminal({ cursorBlink: true })
term.open(terminal)

const fit = new FitAddon.FitAddon()
term.loadAddon(fit)

fit.fit()

let socket = io()

const write = (v) => {
	term.write(v + '\r\n')
}

socket.on('connect', () => {
	write('Initializing connection...')

	term.onData((data) => {
		socket.emit('data', data)
	})

	socket.on('data', (data) => {
		term.write(data)
		// write(data)
	})


	socket.on('disconnect', () => {
		write('Disconnected.')
	})
})