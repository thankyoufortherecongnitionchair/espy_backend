
# Espy-Backend

<img src="https://github.com/thankyoufortherecongnitionchair/espy_backend/assets/77891681/72ba3f82-2434-4fa8-9297-64a697b6a2e5"  height="150" width="150">



It's a daily mailing list that sends users reviews scraped from across the internet, including popular websites like Pitchfork, Consequence of Sound, Guardian, etc. 
The Mail also contains albums suggested based on user moods, all arranged and compiled by Google's PaLM API and then parsed and converted to readable text using RegEx. 
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)

## Introduction

Welcome to the Espy project! This Node.js server serves as the backend for Espy, a mailing list.
This Repo Contains the logic for the mailing system used for Espy.
It's a daily mailing list that sends users reviews scraped from across the internet, including popular websites like Pitchfork, Consequence of Sound, Guardian, etc. 
The Mail also contains albums suggested based on user moods, all arranged and compiled by Google's PaLM API and then parsed and converted to readable text using RegEx. Palm API was also 
trained by me to make the outputs relevant and spread across the web, while also making the outputs as precise as possible to be the same every time a new answer is generated. This was extremely challenging and tuning the 
AI Model to answer with the same format but different contents was incredibly tough. 

## Features

- **Feature 1:** Scrping the internet for review content using the very popular Puppeteer Node Package,
- **Feature 2:** LLM generated mood-based album recommendation, sent to users daily,
- **Feature 3:** secure mailing using serverless Firebase database, which removes the need to manage a complicated server. Instant mails are sent out almost effortlessly through the help of (backend as a service).
- **Feature 4:** Regular expressions used to parse LLM outputs into HTML templates. an incredibly large amount of tuning done to the LLM model.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have the following software installed on your machine:

- [Node.js]
- [npm]
- An editor such as VSCODE or any other
- a valid mailing id, authorized by the SMTP provider such as Gmail
- LLM credentials from PALM (google free LLM)

### Installation

1. Clone the repository

### Configuration

1. run npm i to install the several dependencies
2. generate Palm API credentials and replace them with your .env file
3. create a Firebase document named subscribers and attach it to your frontend of choice, just make sure emails can be read into arrays in this code
4. once all has been setup, execute node index.js in cmd to enter the entry point. observe outputs in terminals and user mails respecively.
