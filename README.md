# MongoDB Guide for user registration & user login

An all-encompassing guide on MongoDB user registration & login, tailored for someone who's just starting with MongoDB and JavaScript.

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
    1. [Installing Node.js](#installing-nodejs)
    2. [Installing MongoDB](#installing-mongodb)
3. [Setting Up MongoDB Account](#setting-up-mongodb-account)
4. [MongoDB Compass](#mongodb-compass)
5. [Database and Collections](#database-and-collections)
6. [Project Files](#project-files)
7. [How to Implement the Code](#how-to-implement-the-code)
8. [Installing Dependencies](#installing-dependencies)
9. [Running the Application](#running-the-application)

## Introduction

This guide walks you through setting up a MongoDB database, and connecting it to a JavaScript project for user registration and login. No prior knowledge of MongoDB or JavaScript is needed.

## Prerequisites

Before proceeding, make sure to install the following software:

### Installing Node.js

- Download Node.js from the [official website](https://nodejs.org/).
- Follow the installation instructions specific to your OS.

### Installing MongoDB

- Visit the [MongoDB download page](https://www.mongodb.com/try/download/community).
- Download and install MongoDB following the guide for your specific OS.

## Setting Up MongoDB Account

1. Visit the [MongoDB login page](https://account.mongodb.com/account/login).
2. Create a new account or log in if you already have one.
3. Create a new database and design your cluster as per your requirements.

## MongoDB Compass

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass).
2. On launching, you'll be prompted for a connection URI.
3. Find this URI in your MongoDB dashboard by navigating to "Database" > "Connect" > "Drivers".
4. Copy and paste this URI into MongoDB Compass to establish a connection.

## Database and Collections

Once connected, proceed to create a new database and collection:

1. Click the "+" sign next to "Databases" in MongoDB Compass.
2. Name the database `userStorage` and the collection `userInfo`.

## Project Files

This project contains four main files:

1. `server.js` - The main server file.
2. `login.js` - Handles user login.
3. `register.js` - Manages user registration.
4. `database.js` - Database interactions.

## How to Implement the Code

1. Download the template folder from the repository.
2. Replace the corresponding files in the template folder with code samples from the guide.
3. For instance, if you see `login.js` in the guide, it should replace `login.js` in your template folder.

## Installing Dependencies

1. Open your terminal and navigate to your project folder.
2. Run the command `npm install` to install all required packages.

## Running the Application

1. In your terminal, run `node server.js` to start the server.
2. Open your web browser and go to `http://localhost:3000` to view the app.

