import * as jwt from 'jsonwebtoken';
import { resourcesFixture } from './fixtures/resources';
import { userFixture } from '../fixtures/user';
const server = require('socket.io')(8080);

const sockets = {};

server.on('connection', socket => handleConnection(socket));

function handleConnection(socket) {
  const { query } = socket.handshake;
  if (!query.access_token) {
    socket.disconnect();
  }
  try {
    const decoded = jwt.verify(query.access_token, 'secret');
    sockets[socket] = (decoded as any).id;
    socket.on('disconnect', () => delete sockets[socket]);
  } catch (err) {
    socket.disconnect();
  }
}

function sendRandomResource() {
  const index = Math.floor(Math.random() * resourcesFixture.length);
  const resource = resourcesFixture[index];

  const userResource = userFixture.resources.find((item) => item.id === resource.id);
  const value = getRandomValue(resource.id);
  userResource.amount += value;

  return server.emit('resource', { ...resource, value });
}

function getRandomValue(index: number) {
  if (index === 0) {
    // gold
    return Math.floor(Math.random() * 900) + 100;
  }
  return Math.floor(Math.random() * 2) + 1;
}

setInterval(sendRandomResource, 10000);
