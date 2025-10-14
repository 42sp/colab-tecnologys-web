import { feathers } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client'; 

import type { Construction } from './types/construction.types'; 

interface ServiceTypes {
  constructions: Construction;
  // Adicione outros serviços aqui
  authentication: any; // O serviço de autenticação
}

const client = feathers<ServiceTypes>();
const restClient = rest('http://localhost:3030'); 

client.configure(restClient.fetch((...args) => window.fetch(...args)));

// 🎯 NOVO: Configura o cliente de autenticação
// O armazenamento (storage) padrão é o localStorage, o que atende ao "Lembrar de mim"
client.configure(auth({
    storage: window.localStorage, // Define onde o token será armazenado
}));

export default client;