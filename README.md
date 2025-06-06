# DroneHub

## Project Overview

This project is a backend system designed for managing drone operations across multiple sites. Users can manage drones, sites, and missions, facilitating efficient drone-based surveying and mapping. This system allows for CRUD operations on user accounts, drones, missions, and sites, with additional features for categorizing and filtering missions.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Core Functionalities](#core-functionalities)
4. [Technologies Used](#technologies-used)
5. [Installation](#installation)
6. [Configuration](#configuration)
7. [Usage](#usage)
8. [Contributors](#contributors)



## Introduction

This backend project enables users to manage multiple drones, sites, and missions, ensuring effective and automated surveying and mapping. The project incorporates authentication, data management, and advanced filtering functionalities to support user operations.

## Features

- User authentication using JWT
- CRUD operations for users, sites, drones, and missions
- Assigning drones to specific sites
- Filtering missions by categories (path, grid/survey, corridor)
- Data validation and error handling
- Bonus: Custom categories for missions

## Core Functionalities

### User Management

- *User Registration*: Allows users to create an account with a username and password.
- *User Login*: Users can log in to the system using their credentials and receive a JWT for authentication.
- *User Information Retrieval*: Fetch user details based on user ID.

### Site Management

- *Add Site*: Create a new site with a name and location.
- *Update Site*: Modify existing site details.
- *Delete Site*: Remove a site from the user's account.
- *Retrieve Sites*: Fetch details of all sites associated with a user.

### Drone Management

- *Add Drone*: Register a new drone under a specific site.
- *Update Drone*: Modify existing drone details and reassign it to a different site.
- *Delete Drone*: Remove a drone from the user's account.
- *Retrieve Drones by Site*: Fetch all drones associated with a specific site.

### Mission Management

- *Add Mission*: Create a new mission with specific coordinates and type, and assign it to a site.
- *Update Mission*: Modify existing mission details.
- *Delete Mission*: Remove a mission from the user's account.
- *Retrieve Missions by Site*: Fetch all missions associated with a specific site.
- *Retrieve Missions by Category*: Fetch all missions associated with a specific category.

### Category Management (Bonus)

- *Add Category*: Create a custom category for missions.
- *Update Category*: Modify existing category details.
- *Retrieve Drones by Category*: Fetch all drones associated with a specific category.

## Technologies Used

- *Node.js*: Runtime environment
- *Express*: Backend framework
- *Postman*: API testing tool
- *MongoDB*: Database
- *JWT*: Authentication

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (>=6.x) or yarn
- MongoDB

### Steps

1. *Clone the repository*
    sh
    git clone https://github.com/your-repository.git
    cd your-repository
    

2. *Install dependencies*
    sh
    npm install
    # or
    yarn install
    

3. *Start MongoDB server*
    sh
    mongod

4. *Modify variables in .env file*
     

5. *Run the application*
    sh
    npm run start:dev
    # or
    yarn start:dev
    

## Configuration

### Environment Variables

Create a .env file in the root directory with the following variables:

plaintext
PORT=3000
MONGO_URI=mongodb://localhost:27017/flytbase
JWT_SECRET=your_jwt_secret


## Usage

### Authentication

- Obtain a JWT token using the /auth/login endpoint.
- Use the token to access other API endpoints.

### CRUD Operations

- Manage users, sites, drones, and missions using the relevant endpoints.
- Assign and filter missions by category.




## Contributors

- [Dhyey Vora](https://github.com/DhyeyVora-1706)
