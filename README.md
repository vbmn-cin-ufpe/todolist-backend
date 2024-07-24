
# TodoList Backend project 

Projeto em TypeScript + NodeJs + TypeOrm + MySql + Inversify e Docker para um sistema de criação de Todo List.

Consiste numa API para comunicação com um banco MySql

Para rodar o projeto primeiramente utilize os comandos :
[Primeiramente para instalar os pacotes]

```javascript
npm i  || npm install 
```
[Para criar os containers do projeto que são do app backend e o container do banco Mysql]
```javascript
docker-compose build 
```

[ Para subir os containers ]
```javascript
docker-compose up
```
Verificar se os containers estão ativos :
![image](https://github.com/user-attachments/assets/49f1639f-bacb-4b84-90c8-2f08b06b65e3)

Para esse projeto não consegui fazer funcionar a conexão dos dois container. Eu utilizei o método de rodar o projeto do app backend localmente conectando o container do Mysql que roda na porta :3306

![image](https://github.com/user-attachments/assets/4441dee1-84dd-4e86-91eb-8ad79be5d497)

[Para iniciar o app backend utilize o seguinte commando]
```javascript
npm run dev
```
Para o acesso app backend é necessário fazer uma requisição com o method POST para o endpoint [http://localhost:3010/api/v1/users/register]

POST > http://localhost:3010/api/v1/users/register
Body >
{
    "email": "exemplo@gmail.com",
    "password": "12345678",
    "name": "teste01"
}
Retornando uma string com o id do usuário

![image](https://github.com/user-attachments/assets/3ba62900-f3d2-47ae-861f-81ded1a92271)

Após isso acessar o endpoint [http://localhost:3010/api/v1/login]

POST > http://localhost:3010/api/v1/login
Body > 
{
    "email": "exemplo@gmail.com",
    "password": "12345678",
    "name": "teste01"
}

![image](https://github.com/user-attachments/assets/0dbb374e-5cef-474d-bd31-7b7e7a3c0d26)


Retornando o token e o refresh token para acesso aos endpoints autenticados.

















