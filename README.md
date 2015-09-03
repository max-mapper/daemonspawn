# daemonspawn

spawn daemon processes, check their status, and kill them

## js usage

```js
var daemon = require('daemonspawn')
```

### `var proc = daemon.spawn(cmd, opts)`

spawns a daemonized process by spawning `cmd` with `opts` using [npm-execspawn](http://npmjs.org/npm-execspawn), which has the same interface as `child_process.spawn`

returns `proc`, the child process. you need to remember `proc.pid` in order to use the other methods, usually people save it to a file, but any method will work.

### `daemon.status(pid, cb)`

checks if `pid` is running, calls cb with `(error, running)` where `running` is a boolean

### `daemon.kill(pid, cb)`

`SIGKILL`s the `pid`, calls `cb` with `(err)`

## cli usage

```sh
$ npm i daemonspawn -g

$ daemonspawn
Usage:    daemonspawn <spawn,status,kill> [args..]

spawn     spawns a daemon, prints pid to stdout
status    given a pid of a daemon, checks if daemon is running or not
kill      given a pid of a daemon, kills the daemon with SIGKILL

$ daemonspawn spawn node server.js
3762

$ daemonspawn status 3762
daemon is running

$ daemonspawn kill 3762
daemon has been killed

$ daemonspawn status 3762
daemon is not running
```
