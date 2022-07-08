import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
//http://kck.dev.app.royalairmaroc.com:8080/auth/
//http://localhost:8086/auth/
const keycloak = Keycloak({
  url: 'http://localhost:8086/auth/',
  realm: 'kpi',
  clientId: 'kpi-front',
  //@ts-ignore
  'ssl-required': 'external',
  'public-client': true,
  'confidential-port': 0,
});    

// realm: "inetum-cem",
// url: "http://localhost:8080/auth",
// "ssl-required": "external",
// clientId: "cem-front",
// "public-client": true,
// "confidential-port": 0,


export default keycloak;