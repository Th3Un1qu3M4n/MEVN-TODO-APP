## MEVN Stack Todo List Application

This is a Todo List application built using the MEVN (MongoDB, Express, Vue.js, Node.js) stack. The application allows users to create, read, update, and delete tasks in a todo list.

![image](https://github.com/Th3Un1qu3M4n/MEVN-TODO-APP/assets/57266167/e5ccaac4-13c5-4ff4-9ae1-3a2d83b79d7f)


The application is dockerized and can be easily run using Docker Compose.

### Prerequisites

Make sure you have the following dependencies installed on your system:

- Docker
- Docker Compose

The following images would be downloaded from docker-hub
- th3un1qu3m4n / todo-backend
- th3un1qu3m4n / vue-app
- mongodb

### Getting Started

To run the application, follow these steps:

1. Clone the repository:

   ```
   git clone https://github.com/Th3Un1qu3M4n/MEVN-TODO-APP
   ```

2. Navigate to the project root directory:

   ```
   cd mevn-todo-list
   ```

3. Build and start the containers using Docker Compose:

   ```
   docker-compose up -d
   ```

   This command will build the Docker images for the backend server, frontend client, and MongoDB database, and start the containers in the background.

4. Wait for the containers to start up. This may take a few moments.

5. Once the containers are up and running, you can access the application in your browser at `http://localhost:8081`.

### Unit Testing

To run unit tests for the server, follow these steps:

1. Navigate to the server folder:

   ```
   cd server
   ```

2. Install the dependencies:

   ```
   npm install
   ```

3. Run the unit tests:

   ```
   npm run test
   ```

   This command will execute the unit tests and display the results in the console.
   Also ensure to change the mongodb url in the server.js to point to your instance of mongodb available
   
   ![image](https://github.com/Th3Un1qu3M4n/MEVN-TODO-APP/assets/57266167/ae0bbba9-2c0f-44e1-8db9-d39e27ad27fc)


### Project Structure

The project has the following structure:

```
mevn-todo-list/
  |- server/
  |   |- controllers/
  |   |- models/
  |   |- routes/
  |   |- tests/
  |   |- server.js
  |   |- Dockerfile
  |   |- package.json
  |   |- ...
  |
  |- vue_app/
  |   |- disk/
  |   |- src/
  |   |- Dockerfile
  |   |- ...
  |
  |- docker-compose.yml
  |- ...
```

- The `server` directory contains the backend server code written in Express.
- The `client` directory contains the frontend client code written in Vue.js.
- The `docker-compose.yml` file defines the Docker services and their configurations.
- Other files and directories are related to the project setup, configuration, and build processes.


### License

This project is licensed under the [MIT License](LICENSE).

Feel free to explore, modify, and use the code as per the license terms.
