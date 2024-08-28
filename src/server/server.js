const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { MyMethod } = require('./services/myService');

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
  const server = new grpc.Server();
  server.addService(myProto.MyService.service, { MyMethod });

  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Server binding failed: ${error.message}`);
      return;
    }
    console.log(`gRPC server running on 127.0.0.1:${port}`);
    // No need to call server.start(), the server starts automatically
  });
}

main();
