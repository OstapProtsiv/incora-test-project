require('dotenv').config();
const cookieParser = require('cookie-parser');
const express = require('express');
const httpServer = require('http');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const errorMiddleware = require('./middleware/error.middleware');
const router = require('./router');
const SocketService = require('./socket.service');
const docs = require('./docs');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/', router);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use(errorMiddleware);

const http = httpServer.Server(app);
const PORT = process.env.PORT || 5000;
app.set('socketService', new SocketService(http));
http.listen(PORT, () => {
  console.log(`server started on ${PORT}`);
});
