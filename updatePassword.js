// updatePassword.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User, Movie } = require('./models');

mongoose.connect('mongodb://localhost:27017/movies-app');

async function updatePassword() {
  try {
    const user = await User.findOne({ username: 'user1' });
    if (user) {
      // Update the password to be hashed
      user.password = await bcrypt.hash('password1', 10);

      // Find the ObjectId for the movie 'Inception'
      const movie = await Movie.findOne({ title: 'Inception' });
      if (movie) {
        user.favorite_movies = [movie._id]; // Set the favorite_movies to the ObjectId
      } else {
        console.error('Movie "Inception" not found');
      }

      await user.save();
      console.log('Password and favorite_movies updated successfully');
    } else {
      console.log('User not found');
    }
  } catch (error) {
    console.error('Error updating password:', error);
  } finally {
    mongoose.disconnect();
  }
}

updatePassword();
