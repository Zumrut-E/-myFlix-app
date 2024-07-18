const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const { Movie, User } = require('./models');
const auth = require('./auth');
require("dotenv").config();
const app = express();
const port = process.env.PORT || 8081;

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/movies_app');
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });


// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());

// Enable CORS
app.use(cors());

// Use authentication routes
auth(app);

// Protected routes
app.get('/movies', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/movies/:title', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movie = await Movie.findOne({ title: req.params.title });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).json({ message: 'Movie not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/genres/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find({ 'genre.name': req.params.name });
    if (movies.length > 0) {
      res.status(200).json(movies.map(movie => movie.genre));
    } else {
      res.status(404).json({ message: 'Genre not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/directors/:name', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const movies = await Movie.find({ 'director.name': req.params.name });
    if (movies.length > 0) {
      res.status(200).json(movies.map(movie => movie.director));
    } else {
      res.status(404).json({ message: 'Director not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/users', [
  check('username', 'Username is required').isLength({ min: 5 }),
  check('username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('password', 'Password is required').not().isEmpty(),
  check('email', 'Email does not appear to be valid').isEmail()
], async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = User.hashPassword(req.body.password);

    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).send(`${req.body.username} already exists`);
    }

    const newUser = await User.create({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
      birthday: req.body.birthday
    });

    return res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    return res.status(500).send(`Error: ${error}`);
  }
});

app.put('/users/:username', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate({ username: req.params.username }, req.body, { new: true });
    if (updatedUser) {
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.post('/users/:username/favorites', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      const movie = await Movie.findOne({ title: req.body.title });
      if (movie && !user.favorite_movies.includes(movie._id)) {
        user.favorite_movies.push(movie._id);
        await user.save();
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'Movie not found or already in favorites' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/users/:username/favorites/:movieId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (user) {
      user.favorite_movies.pull(req.params.movieId);
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log('Listening on Port ' + port);
});




