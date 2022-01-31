//callback function

function greeting(name) {
  console.log('Hello ' + name);
}
function goodbye(name) {
  console.log('Bye ' + name);
}
function processUserInput(callback) {
  var name = "Johny1";
  callback(name);
}

processUserInput(greeting); // will output Hello Johny1
processUserInput(goodbye); // will output Bye Johny1