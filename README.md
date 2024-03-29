# Nest chat orchestrator

Nest app to orchestrate messages with chatbots and creating chat rooms with users

## Kubernetes

- kind create cluster --name "kluster"
- kubectl apply -f bases/mysql/
- kubectl run -it --rm --image=mysql:5.6 --restart=Never mysql-client -- mysql -h mysql -ppassword
- create database db;
- kind load docker-image backend --name "kluster"
- kubectl apply -f bases/nestjs/
- kubectl logs backend-7468769f76-8jzzf
- kubectl port-forward services/backend 3000:80

## ToDo

- Database with TypeOrm
  - ~~chats~~
  - ~~messages~~
  - rooms
- Container
  - database
  - backend
  - frontend
- ~~backend~~
  - ~~WebSocket~~
  - ~~Chat~~
    - Routes
      - /chat: list all the chats
      - /chat/:{chat_id}: get details of the chat
    - Services
      - ~~new chat (based on websocket)~~
      - ~~update chat (based on websocket)~~
      - archive chat
    - Controller
      - ~~list messages from a chat~~
      - ~~list all chats~~
  - ~~Room~~
    - Routes
      - /room: create a new room using websocket with more than one user
      - /room/:{room_id}: access an existing room
  - ~~Services~~
  - ~~Controller~~

~~Move entities to a single place~~

```js
//currently on
//messages.module.ts
//rooms.module.ts
//chat.module.ts

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "db",
      entities: [Messages, Chat, Rooms, ConnectedUsers],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Messages, Chat]),
  ],
  providers: [MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
```

- Frontend
- Terraform
  - App Service backend
  - Application Gateway
  - MySql DB
- Pipeline
  - Deploying backend to App Service

## Notes

- ~~Linux App Service doesn't support WebSockets, but it seems that Application Gateways does~~
- [Web Sockets](https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#web-sockets)

## Issues

- When reloading the same page we got `sqlMessage: "Duplicate entry 'Fo-SvjSftYkYx8O7AAAH' for key 'PRIMARY'",`

## Documentation

[Overview of WebSocket support in Application Gateway](https://learn.microsoft.com/en-us/azure/application-gateway/application-gateway-websocket)

[Import a WebSocket API](https://learn.microsoft.com/en-us/azure/api-management/websocket-api?tabs=portal)

[NestJS + Serverless + Lambda + AWS — In shortest steps](https://nishabe.medium.com/nestjs-serverless-lambda-aws-in-shortest-steps-e914300faed5)

[Deploy a NestJS API to AWS Lambda with Serverless Framework](https://dev.to/aws-builders/deploy-a-nestjs-api-to-aws-lambda-with-serverless-framework-4poo)

[How to Deploy a NestJS Application with AWS Elastic Beanstalk and CodePipeline](https://blog.bitsrc.io/how-to-deploy-a-nestjs-application-with-aws-elastic-beanstalk-and-codepipeline-82aa98dcc48)

[Websockets, Elastic Beanstalk, and Application Load Balancers - 2020 edition](https://solitaired.com/websockets-elastic-beanstalk)

[Deploying a Node app to AWS Elastic Beanstalk using GitHub Actions](https://levelup.gitconnected.com/deploying-a-node-app-to-aws-elastic-beanstalk-using-github-actions-d64c7e486701)

[Deploying a Node.js application to AWS Elastic Beanstalk using Github actions](https://dev.to/thesameeric/deploying-a-nodejs-application-to-aws-elastic-beanstalk-using-github-actions-26n2)

[How to write Terraform Code for AWS Elastic Beanstalk Infrastructure](https://www.youtube.com/watch?v=m2XqEprF0Js&t=1s)
