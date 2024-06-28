const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const app = express();
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const { Movie, User } = require('./models');
const auth = require('./auth')(app);

const port = process.env.PORT || 8080;
let allowedOrigins = ['http://localhost:8080', 'http://testsite.com'];
mongoose.connect('mongodb://localhost:27017/movies_app');

app.use(express.json());
app.use(passport.initialize());

app.use(cors({
  origin: (origin, callback) => {
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){ // If a specific origin isn’t found on the list of allowed origins
      let message = 'The CORS policy for this application doesn’t allow access from origin ' + origin;
      return callback(new Error(message ), false);
    }
    return callback(null, true);
  }
}));

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

app.post('/users',

  [
    check('Username', 'Username is required').isLength({min: 5}),
    check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
  ],

  async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

  let hashedPassword = Users.hashPassword(req.body.Password);
  await Users.findOne({ Username: req.body.Username }) 
  // Search to see if a user with the requested username already exists
    .then((user) => {
      if (user) {
      //If the user is found, send a response that it already exists
        return res.status(400).send(req.body.Username + ' already exists');
      } else {
        Users
          .create({
            Username: req.body.Username,
            Password: hashedPassword,
            Email: req.body.Email,
            Birthday: req.body.Birthday
          })
          .then((user) => { res.status(201).json(user) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
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


app.listen(port, '0.0.0.0',() => {
 console.log('Listening on Port ' + port);
});
