const SSHClient = require('ssh2').Client

module.exports = (server) => {
	const io = require('socket.io')(server)

	io.on('connection', (socket) => {
		const conn = new SSHClient()
		conn.on('ready', () => {
			socket.emit('data', 'SSH connection established.\r\n')
			conn.shell((err, stream) => {
				if (err){
					return socket.emit('data', 'Error: ' + err.message + '\r\n')
				}
				socket.on('data', (data) => {
					stream.write(data)
				})
				stream.on('data', (d) => {
					socket.emit('data', d.toString('binary'))
				}).on('close', () => {
					conn.end()
				})
			})
		}).on('close', () => {
			socket.emit('data', 'SSH connection closed.\r\n')
		}).on('error', (err) => {
			socket.emit('data', 'SSH error ' + err.message + '\r\n')
		}).connect({
			host: '172.18.0.29',
			username: 'root',
			password: ''
		})
	})
}