#!/usr/bin/env node

var fs = require('fs')
var daemon = require('./')
var args = require('minimist')(process.argv.slice(2))

handle(args._, args)

function handle (cmds, opts) {
  var cmd = cmds[0]
  if (typeof cmd === 'undefined') {
    return console.log(
      'Usage:    daemonspawn <spawn,status,kill> [args..]\n' +
      '\n' +
      'spawn     spawns a daemon, prints pid to stdout\n' +
      'status    given a pid of a daemon, checks if daemon is running or not\n' +
      'kill      given a pid of a daemon, kills the daemon with SIGKILL'
    )
  }
  if (cmd === 'spawn') {
    var spawnCmd = cmds.slice(1).join(' ')
    if (!spawnCmd) return console.log('Usage: daemonspawn spawn [commands to spawn]')
    // convert filenames to file descriptors
    if (opts.stdout) opts.stdout = fs.openSync(opts.stdout, 'a')
    if (opts.stderr) opts.stderr = fs.openSync(opts.stderr, 'a')
    var child = daemon.spawn(spawnCmd, opts)
    console.log(child.pid) 
    return 
  }

  if (cmd === 'status') {
    var pid = cmds[1]
    if (!pid) return console.log('Usage: daemonspawn kill <pid>')
    daemon.status(pid, function (err, running) {
      if (err) throw err
      if (running) console.log('daemon is running')
      else console.log('daemon is not running')
    })
    return
  }

  if (cmd === 'kill') {
    var pid = cmds[1]
    if (!pid) return console.log('Usage: daemonspawn kill <pid>')
    daemon.kill(pid, function (err) {
      if (err) throw err
      console.log('daemon has been killed')
    })
    return
  }
  
  console.log(cmd, 'is not a valid command')
}