# Social Media API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
CRUD API using mongoDB database and mongoose.js for management of users, thoughts, friends list and reactions.

Walkthrough Video: [https://drive.google.com/file/d/1Z-VFOxkBxUK3AWvy83-U7E-AKXJm_kPV/view?usp=sharing](https://drive.google.com/file/d/1Z-VFOxkBxUK3AWvy83-U7E-AKXJm_kPV/view?usp=sharing)

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contribute](#contributing)
- [Questions](#questions)

## Installation
Must have a local mongoDB server installed and API testing application such as Insomnia. Then clone the github repo and run 'npm install' from an integrated terminal to install the application and dependencies on your local computer.

## Usage
First seed your local database by running "npm run seed", then type "npm start" to open the server on port 3001 (and mondoDB database server 27017).
In your API testing app, use the following end points to run CRUD operations from localhost:3001:
/api/users
/api/users/:id
/api/users/:id/friends
/api/users/:id/friends/:friendId
/api/thoughts
/api/thoughts/:id
/api/thoughts/:id/reactions
/api/thoughts/:id/reactions/:reactionId

## License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing
Fork the repo, make changes and open a pull request for my consideration.

## Questions
To contact me with any questions regarding this project:
1. [GitHub Profile](https://github.com/DaniDrury)
2. Email me at: <danidrury98@gmail.com>