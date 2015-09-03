var daemon = require('./')
var cmd = process.argv[2]

handle()

function handle () {
  if (typeof cmd === 'undefined') return console.log('Please specify a command')
  if (cmd === 'spawn') {
    var child = daemon.spawn(process.argv.slice(3).join(' '))
    console.log(child.pid) 
    return 
  }

  if (cmd === 'status') {
    daemon.status(process.argv[3], function (err, running) {
      if (err) throw err
      if (running) console.log('daemon is running')
      else console.log('daemon is not running')
    })
    return
  }

  if (cmd === 'kill') {
    daemon.kill(process.argv[3], function (err) {
      if (err) throw err
      console.log('daemon has been killed')
    })
    return
  }
  
  console.log(cmd, 'is not a valid command')
}