var spawn = require('npm-execspawn')
var kill = require('tree-kill')
var isRunning = require('is-running')

var daemon = {
  spawn: function (cmd, opts) {
    if (!opts) opts = {}
    opts.detached = true
    if (typeof opts.stdio === 'undefined') opts.stdio = ['ignore', opts.stdout, opts.stderr]
    var child = spawn(cmd, opts)
    child.unref()
    return child
  },
  status: function (pid, cb) {
    pid = +pid
    isRunning(pid, cb)
  },
  kill: function (pid, cb) {
    kill(pid, 'SIGKILL', cb)
  }
}

module.exports = daemon
