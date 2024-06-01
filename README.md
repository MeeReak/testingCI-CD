<p align="center"><img src="https://github.com/MeeReak/backend-smakchet/assets/156150555/60021f68-ae1a-4ede-b46e-6d3284054cd2" width="120px"></p>
<h1 align="center">Smakchet</h1>

## Table of Contents
- [About The Project](#about-the-project)
- [Business Model Canvas](#business-model-canvas)
- [Built With](#built-with)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contact](#contact)

## About The Project
In a world where community engagement and social responsibility are more important than ever, 
Smakchet aims to connect volunteers with event hosts efficiently. The platform provides two types of 
users: normal users who can view and apply for events, and hosts who can post events and manage applications.
This project is designed to simplify the process of finding and managing volunteer opportunities,
making it easier for everyone to contribute to their communities.

Our platform leverages advanced technologies to create a seamless and intuitive experience
for both volunteers and hosts. With user-friendly interfaces, robust search functionalities, 
and secure communication tools, we make it easy for volunteers to find events that match their interests and for hosts to find the help they need.

Join us in creating a more engaged and connected community, one volunteer opportunity at a time.
## Business Model Canvas

To explore further details about our project, please click [link](https://docs.google.com/document/d/1VNUB89YcIxfmsaoYeymQYLaif8pki6BO6PQ8GIm3lfM/edit?usp=sharing) to see our business Canvas.

## Built With
This section lists major frameworks and libraries used in the Volunteering Platform project:

- **Figma** (for UX/UI design)
- **Node.js**
- **Next.js**
- **Storybook**
- **Tailwind CSS**
- **TypeScript**
- **Express.js**
- **Jest**
- **MongoDB**
- **Docker**

## Project Structure
```
smakchet-monorepo
|----->apps
        |---->frontend
|----->packages
        |---->api-gateway
        |---->application
        |---->auth
        |---->event
        |---->notification
        |---->user
        |---->volumes
|----->docker-compose.yaml
```

## Getting Started
### With Docker
Follow these steps to set up this project locally using Docker.
#### Prerequisites
Ensure you have the following software installed before proceeding:
<br>
[Docker Desktop](https://www.docker.com/products/docker-desktop/)

#### setup steps
Build and run the Docker containers:
```bash
yarn start:dev
```
After completing these steps, your project will be successfully set up locally!
  ## Usage
Our platform supports two types of users, each with distinct features and functionalities:

### Normal User
- **Explore**: Browse through events and get familiar with the platform.
- **Search**: Find events without registering.

### Volunteer
- **Browse Events**: Use the search feature to find events based on your interests and availability.
- **Apply for Events**: Submit applications for events you're interested in.

### Event Host
- **Create Events**: Post new events and provide details such as time, location, and requirements.
- **Manage Applications**: View applications, and accept or reject candidates.
- **Communicate**: Use the platform’s messaging system to interact with volunteers.
- **Track Attendance**: Monitor which volunteers have been accepted and their attendance status.

## Link UI
figma-Link(https://www.figma.com/design/FRi5rN0B2IiiIOSwgiPLW0/SmakChet?t=UgDDxAnRQFHbTo4Q-0)
## Contact
Team Email( smakchet.team@gmail.com)

# testingCI-CD
