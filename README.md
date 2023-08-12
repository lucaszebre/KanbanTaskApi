# Task Manager RESTFul-API

Kanban Task manager API built using **NODE JS** and **MongoDB**. It follows a **RESTFul** design architecture. The app sends an email notification upon registration and deactivation of the user's account. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features

- Sending Emails
- Authentication and Security
- Avatar upload

## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| POST    | /auth/register               | Public  | Register                                 |
| POST    | /auth/login                       | Public  | Login                                    |
| GET     | /users/boards                         | Private | User's Boards                         |
| PUT   | /users/boards                          | Private | Update Boards                           |
| POST    | /users/boards                   | Private |  Create Boards                   |
| DELETE    | /users/boards              | Private | Delete all the boards                      |
| GET | /users/boards/[boardsId]                   | Private | get the board 
| PUT | /users/boards/[boardsId]                   | Private | update the board 
| DELETE | /users/boards/[boardsId]                   | Private | delete the board 
| DELETE  | /users/boards/[boardId]/task/[taskId]                          | Private | Delete the task                            |
| POST    |/users/boards/[boardId]/task/[taskId]                 | Private | Create a Task                            |
| GET     | /users/boards/[boardId]/task/[taskId]               | Private | View a Task                              |
| GET     | /users/boards/[boardId]/tasks                       | Private | View all Tasks                           |
| PUT   | /users/boards/[boardId]/task/[taskId]               | Private | Update a Task                            |
                          |
| POST    | /users/logout                      | Private | Logout an account                        |
| POST    | /users/logoutall                   | Private | Logout all accounts                      |

## Hosted Domain Link

[Kanban Task Manager API](https://kater-task-manager-api.herokuapp.com/)

## Postman Collection Link

[Kanban Task Manager API Shared Collection]

## Contributing

You can fork the repository and send pull request or reach out easily to me via twitter => [lucas zebre](https://twitter.com/ZebreLucas)

## Security Vulnerabilities

If you discover a security vulnerability within the project, please create an issue. All security vulnerabilities will be promptly addressed and appreciated.