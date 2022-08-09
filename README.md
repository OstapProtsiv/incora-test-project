.env configs
PORT=5000
DB_NAME=incora-test-project
DB_PASSWORD=your password
DB_USER=postgres
DB_PORT=5432
SECRET_KEY=your secret key

To test express API you can use Postman
To test socket.io open Postman and listen to socket port http://localhost:5000/ and meanwhile send post request with another tab by postman on port http://localhost:5000/users?id=... after updating a user you will see that client-side will see emited event by server named "pushNotification"