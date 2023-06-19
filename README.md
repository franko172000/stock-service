# Node.js Challenge

## App Set up
Clone this repository, navigate to the repository root and run the following commands.
- Note: You need to have docker installed for the setup to work. To install docker, follow this link https://docs.docker.com/engine/install/

## Docker
1. Start up docker containers
```bash
    sudo docker-compose up --build
```
## Base URL
[http://localhost:8090](http://localhost:8090)
You can change the port number by changing the ``port`` variable in ``docker-compose.yml`` file

## API Doc
The api documentation can be found here
[http://localhost:8090/api-docs](http://localhost:8090/api-docs)


## NPM Setup
1. Install dependencies
```bash
    cd api-service && npm install
```
```bash
    cd stock-service && npm install
```

Setup database connection

Build and start services
```bash
    cd api-service && npm run build && npm start
```

```bash
    cd stock-service && npm run build && npm start
```

## Base URL
[http://localhost:8090](http://localhost:3000)
You can change the port number by changing the ``port`` variable in ``docker-compose.yml`` file

## API Doc
The api documentation can be found here
[http://localhost:8090/api-docs](http://localhost:8090/api-docs)


## Tests
Integration test
```bash
    npm run test:integration
```

Unit test
```bash
    npm run test:unit
```