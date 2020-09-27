<h1 align="center">Foresta</h1>
<h5 align="center">A simple real-time multiplayer game</h5>

<p align="center">
  <a>
     <img src="https://goreportcard.com/badge/github.com/ramantehlan/pulse" align="center">
   </a>
   <a>
     <img src="https://img.shields.io/badge/godoc-reference-green" align="center">
   </a>
   <a>
     <img src="https://img.shields.io/badge/license-MIT-blue" align="center">
   </a>

</p>
Foresto is a real-time multiplayer game. The aim is to run through a forest and collect fruits on your way. You get 10 points for one fruit, and there are multiple fruits on every tree. To score more points, cover the maximum area on fruits. More points you have, higher you will be on the scoreboard.


> This game was created as part of a challenge, and I have no intention to maintain it or continue developing it. It should only be used as an example.
<p align="center">
<img src="https://user-images.githubusercontent.com/29037312/94356685-bbccc200-00ae-11eb-9848-29d057e7f3e7.png" />
  </p>

# Index

- [About](#about)
- [Usage](#usage)
  - [Pre-Requisites](#pre-requisites)
  - [File Structure](#file-structure)
  - [Development Environment](#development-environment)
  - [Build](#build)
- [Contribution](#contribution)
- [FAQ](#faq)
- [Acknowledgment](#acknowledgment)
- [License](#license)

# About

This game is to demonstrate how a read-time application works and how to scale it. Since it's a very simple game, we will use minimum tech stack to scale it to millions of users. 

The design goals are:
- Minimum latency
- Horizontally Scalable
- Microservice Architecture

## forestic-web
This is the frontend of the application. It is created using Next.js, which is a React framework. For state management, we are using Redux, which works well with React. We are using socket.io for fetching and sending the realtime data between the server and the client.  

The reason for picking Nextjs is because it gives the best developer experience and provides all the features required like server rendering, TypeScript support, route pre-fetching etc. 

## forestic-API
This is the server for the application. It is written in Golang and connects with the client using WebSockets. Over the sockets, the client sends the score, which is then sent to Redis and Kafka. 

WebSockets can be scaled horizontally; however, there is some extra configuration required for that. Like we can use a load balancer with sticky sessions to handle multiple instances and use Redis, Nats or other similar tools to manage the same state across instances. You can read more about it [here](https://tsh.io/blog/how-to-scale-websocket/). For this game, we will not use a load balancer, but we will use Redis to manage state. 

We subscribe to Redis and fetch the leaderboard from it, which is then broadcasted to players over the WebSocket. 

## Redis
Redis is an in-memory data structure project implementing a distributed, in-memory key-value database with optional durability. It is really fast, and support [leaderboard by design](https://redislabs.com/solutions/use-cases/leaderboards/#challenges), which keeps the latency minimum even for a massive amount of data. 

## Kafka
Apache Kafka is an open-source distributed stream-processing software. It is horizontally scalable with high-throughput and low-latency. We can use it to stream score from multiple instances to the processor server.

<p align="center">
<img src="https://user-images.githubusercontent.com/29037312/94356381-7ce93d00-00ab-11eb-9cd1-929da3b77a96.jpg" width="900"/>
</p>

# Usage

## Pre-Requisites

This pre-requisites are not necessarily for running the project, but if you plan to use or contribute to this project or play with the source code, knowledge of following things is recommended.

- Golang
- ReactJS/NextJS
- Socket.io
- Kafka
- Redis
- MySQL
- Docker

## File Structure

The file structure of this project follows the [conventional standard](https://github.com/golang-standards/project-layout), so it should be reasonably easy to understand. A description is given below:

 Folder/File Name | Description
------------------|------------
/cmd | Main applications for this project. `foresta-api` lives here.
/web | Web application. `foresta-web`

## Development Environment

To develop or build this project, make sure you have the following environment setup:

- Install, and setup Go environment.
- Install NodeJS and yarn.
- Install Make.
- Clone this project in your workspace.

Once you have set up the above environment, you can start developing this project.

## Build

To build this project, you can use the make tool. After cloning this project, go to the root of the project. Use following commands to build the application.

1. Build docker images. `make build`
2. Start docker container. `make start`
3. Now you can go to `localhost:3000` to use the application.
4. To stop the docker container. `make stop`

If you need to see all the comands, you can use `make help`.

# Contribution

 Your contributions are always welcome and appreciated. Following are the things you can do to contribute to this project.

 1. Report a bug.
 2. Request a feature.
 3. Create a pull request.

**:sparkles: It takes time and efforts to think, design and develops open-source projects, so If you like this project, do star it so contributors can know you appreciate their efforts. :)**

 > If you are new to open-source, make sure to check read more about it [here](https://www.digitalocean.com/community/tutorial_series/an-introduction-to-open-source) and learn more about creating a pull request [here](https://www.digitalocean.com/community/tutorials/how-to-create-a-pull-request-on-github).

# License

MIT License

Copyright (c) 2020 Raman Tehlan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
