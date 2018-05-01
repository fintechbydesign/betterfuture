
function print(severity, messages) {
  let string = '';
  for (let i = 0; i < messages.length; i += 1) {
    string += messages[i] + ' ';
  }
  console.log(new Date().toUTCString().slice(5, 25), severity, string);
}

function debug() {
  print('DEBUG', arguments);
}

function info() {
  print('INFO ', arguments);
}

function warn() {
  print('WARN ', arguments);
}

function error() {
  print('ERROR', arguments);
}

module.exports = { debug, info, warn, error };
