const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts, getRandomArrItem, getRandomReactions } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtsCheck.length) {
    await connection.dropCollection('thoughts');
  }

  // Create empty array to hold the thoughts
  const thoughtsArr = [];

  // Loop 50 times -- add thoughts to the thoughts array
  for (let i = 0; i < 50; i++) {
    // Get a random thought using a helper function that we imported from ./data
    const thoughtText = getRandomArrItem(thoughts);

    const username = getRandomArrItem(users);

    // get a random number between 0 and 3
    const x = Math.floor(Math.random() * 4);

    // get "x" random Reactions
    const reactions = getRandomReactions(x);

    thoughtsArr.push({
      thoughtText,
      username,
      reactions
    });
  }

  // Add users to the collection and await the results
  const thoughtData = await Thought.create(thoughtsArr);

  // map users array into users objects array
  const usersObject = users.map((user) => {
    const username = user;
    const email = `${user}@email.com`;

    // find thoughts with associated username and push the thought _id to array
    const thoughtsArray = [];
    
    thoughtData.forEach(el => {
      // console.log(el.username, el._id);
      if (el.username === username) {
        thoughtsArray.push(el._id);
      }
    });

    // console.log(thoughtsArray);

    return { username, email, thoughts: thoughtsArray };
  });

  const userData = await User.create(usersObject);



  // Log out the seed data to indicate what should appear in the database
  // console.table(userData);
  // console.table(thoughtData);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});