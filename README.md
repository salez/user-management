# Projeto Angular 16

Este é um projeto desenvolvido com o Angular 16, utilizando os componentes standalone e os recursos mais recentes disponíveis na plataforma, além do uso do JSON Server para simular dados e do Angular Material para a interface.

## Objetivo

O objetivo deste projeto é demonstrar o uso avançado do Angular 16, utilizando seus recursos mais recentes e componentes standalone, junto ao JSON Server e ao Angular Material, para criar uma aplicação web robusta e eficiente.

## Funcionalidades

Este projeto inclui diversas funcionalidades avançadas, tais como:

- Uso extensivo dos componentes standalone do Angular;
- Utilização do JSON Server para simular dados;
- Interface desenvolvida com o Angular Material;
- Uso de FormGroup para validação de formulários;
- Filtro reativo com operadores do RXJS;
- Navegação de tabela;
- Notificações ao criar um novo usuário;
- Modal de confirmação para exclusão de usuário;
- Criação de interfaces e enums para melhor organização do código.

## Observações

- Este projeto não possui foco em testes unitários e tratamento de erros, sendo feito apenas o básico para garantir as funcionalidades.
- Os usuários são separados por roles 'admin' e 'user', onde 'admin' pode editar e visualizar e 'user' pode apenas visualizar dados.

## Para realizar o primeiro login

### usuário admin: 

- user: admin@teste.com
- pass: teste

### usuário comum:

- user: usuario@teste.com
- pass: teste

## Instruções de Uso

1. Clone este repositório em sua máquina local.
2. Execute `npm install` para instalar as dependências.
3. Execute `ng serve` para iniciar o servidor de desenvolvimento.
4. Execute `json-server --watch json-server/db.json` para iniciar o JSON Server.
5. Abra o navegador e acesse `http://localhost:4200` para acessar a aplicação.

## Tecnologias Utilizadas

- Angular 16
- Angular Material
- JSON Server
- RXJS
