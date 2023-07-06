# Simple Microservice Using Node.js and Docker

## App Set up using docker
Clone this repository, navigate to the repository root and run the following commands.
- Note: You need to have docker installed for the setup to work. To install docker, follow this link https://docs.docker.com/engine/install/

#### Docker
1. Start up docker containers
```bash
    sudo docker-compose up --build
```
#### Base URL
[http://localhost:8090](http://localhost:8090) <br />
You can change the port number by changing the ``port`` variable in ``docker-compose.yml`` file

#### API Doc
The api documentation can be found here <br />
[http://localhost:8090/api-docs](http://localhost:8090/api-docs)

#### Mail Server
[http://localhost:8025](http://localhost:8025)
---

## App Setup via NPM commands
1. Install dependencies
```bash
    cd api-service && npm install
```
```bash
    cd stock-service && npm install
```

**Setup database connection** <br />
update the ``.env.local`` to configure your database connection

**Setup email connection** <br />
update the ``.env.local`` to configure your email settings

Build and start services
```bash
    cd api-service && npm run build && npm start
```

```bash
    cd stock-service && npm run build && npm start
```

#### Base URL for API Service
[http://localhost:8090](http://localhost:3000) <br />
You can change the port number by changing the ``APP_POST`` variable in ``.env.local`` file

#### Base URL for Stock Service
[http://localhost:3002](http://localhost:3002) <br />
You can change the port number by changing the ``APP_POST`` variable in ``.env.local`` file

#### API Doc
The api documentation can be found here <br />
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)


## Tests
Integration test
```bash
    npm run test:integration
```

Unit test
```bash
    npm run test:unit
```