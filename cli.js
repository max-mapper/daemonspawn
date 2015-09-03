#!/usr/bin/env node

var fs = require('fs')
var daemon = require('./')
var args = require('minimist')(process.argv.slice(2))

handle(args._, args)

function handle (cmds, opts) {
  var cmd = cmds[0]
  if (typeof cmd === 'undefined') return console.log('Usage: daemonspawn <spawn,status,kill> [args..]')
  if (cmd === 'spawn') {
    // convert filenames to file descriptors
    if (opts.stdout) opts.stdout = fs.openSync(opts.stdout, 'a')
    if (opts.stderr) opts.stderr = fs.openSync(opts.stderr, 'a')
    var child = daemon.spawn(cmds.slice(1).join(' '), opts)
    console.log(child.pid) 
    return 
  }

  if (cmd === 'status') {
    daemon.status(cmds[1], function (err, running) {
      if (err) throw err
      if (running) console.log('daemon is running')
      else console.log('daemon is not running')
    })
    return
  }

  if (cmd === 'kill') {
    daemon.kill(cmds[1], function (err) {
      if (err) throw err
      console.log('daemon has been killed')
    })
    return
  }
  
  console.log(cmd, 'is not a valid command')
}