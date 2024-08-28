function MyMethod(call, callback) {
  const reply = { message: `Hello, ${call.request.name}!` };
  callback(null, reply);
}

module.exports = { MyMethod };
