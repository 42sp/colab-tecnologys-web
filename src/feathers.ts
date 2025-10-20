import { feathers } from '@feathersjs/feathers';
import rest from '@feathersjs/rest-client';
import auth from '@feathersjs/authentication-client';
import type { Service } from '@feathersjs/feathers';

import type { Construction } from './types/construction.types';
import type { Employee } from './types/employee.types';
import type { User } from './types/user.types';

interface ServiceTypes {
  constructions: Service<Construction>;
  profile: Service<Employee>;
  users: Service<User>;
  employees: Service<Employee>;
  authentication: any;
}

// 🔹 Criação do cliente principal
const client = feathers<ServiceTypes>();

// 🔹 Configuração da conexão REST
const restClient = rest('http://localhost:3030');
client.configure(restClient.fetch((...args) => window.fetch(...args)));

// 🔹 Autenticação com armazenamento local (para “lembrar de mim”)
client.configure(
  auth({
    storage: window.localStorage,
  })
);

// 🧠 Reautenticação automática ao carregar o app
(async () => {
  try {
    await client.reAuthenticate();
    console.info('[Feathers] Reautenticado com sucesso ✅');
  } catch (error: any) {
    console.warn('[Feathers] Token inválido ou expirado. Limpando sessão.');
    window.localStorage.removeItem('feathers-jwt');
  }
})();

export default client;
