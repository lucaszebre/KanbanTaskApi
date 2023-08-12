# Task Manager RESTFul-API

Kanban Task manager API built using **NODE JS** and **MongoDB**. It follows a **RESTFul** design architecture. The app sends an email notification upon registration and deactivation of the user's account. It's richly built with a simple scientific technique and best practices in the world of **API** design.

## Features

- Sending Emails
- Authentication and Security
- Avatar upload

## API Endpoints

| Methods | Endpoints                          | Access  | Description                              |
| ------- | ---------------------------------- | ------- | ---------------------------------------- |
| POST    | /users                             | Public  | Sign up                                  |
| POST    | /users/login                       | Public  | Login                                    |
| GET     | /users/boards                         | Private | User's Profile                           |
| PATCH   | /users/me                          | Private | Update Profile                           |
| POST    | /users/me/avatar                   | Private | Upload Profile Picture                   |
| GET     | /users/userID/avataar              | Private | View Profile Picture                     |
| DELETE  | /users/me/avatar                   | Private | Delete Profile Picture                   |
| DELETE  | /users/me                          | Private | Delete Account                           |
| POST    | /users/tasks                       | Private | Create a Task                            |
| GET     | /users/tasks/taskID                | Private | View a Task                              |
| GET     | /users/tasks                       | Private | View all Tasks                           |
| PATCH   | /users/tasks/taskID                | Private | Update a Task                            |
| DELETE  | /users/tasks/taskID                | Private | Delete a Task                            |
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