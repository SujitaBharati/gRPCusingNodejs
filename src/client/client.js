const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.join(__dirname, '../proto/service.proto');

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const myProto = grpc.loadPackageDefinition(packageDefinition).mypackage;

function main() {
  const client = new myProto.MyService('127.0.0.1:50051', grpc.credentials.createInsecure());

  client.MyMethod({ name: 'Jimin' },(error, response) => {
    if (!error) {
      console.log('Greeting:', response.message);
    } else {
      console.error('Error:', error.message);
    }
  });
}

main();
