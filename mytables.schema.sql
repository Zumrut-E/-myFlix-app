db.movies.insertMany([
  {
    title: "Inception",
    description: "A mind-bending thriller",
    genre: { name: "Thriller", description: "Suspenseful movies" },
    director: { name: "Christopher Nolan", bio: "British-American film director", birth_year: 1970, death_year: null },
    image_url: "url_to_image",
    is_featured: true
  },
  {
    title: "The Dark Knight",
    description: "Batman battles the Joker",
    genre: { name: "Thriller", description: "Suspenseful movies" },
    director: { name: "Christopher Nolan", bio: "British-American film director", birth_year: 1970, death_year: null },
    image_url: "url_to_image",
    is_featured: true
  },
  {
    title: "Pulp Fiction",
    description: "Interwoven tales of crime",
    genre: { name: "Drama", description: "Serious, narrative movies" },
    director: { name: "Quentin Tarantino", bio: "American film director", birth_year: 1963, death_year: null },
    image_url: "url_to_image",
    is_featured: false
  },
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    genre: { name: "Drama", description: "Serious, plot-driven presentations, portraying realistic characters, settings, life situations, and stories involving intense character development and interaction." },
    director: { name: "Frank Darabont", bio: "Frank Darabont is a film director, screenwriter and producer who has been nominated for three Academy Awards and a Golden Globe Award.", birth_year: 1959, death_year: null },
    image_url: "http://image1.url",
    is_featured: true
  },
  {
    title: "The Green Mile",
    description: "The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.",
    genre: { name: "Drama", description: "Serious, plot-driven presentations, portraying realistic characters, settings, life situations, and stories involving intense character development and interaction." },
    director: { name: "Frank Darabont", bio: "Frank Darabont is a film director, screenwriter and producer who has been nominated for three Academy Awards and a Golden Globe Award.", birth_year: 1959, death_year: null },
    image_url: "http://image2.url",
    is_featured: false
  },
  {
    title: "Interstellar",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    genre: { name: "Sci-Fi", description: "Science fiction (or sci-fi) is a film genre that uses speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science." },
    director: { name: "Christopher Nolan", bio: "Christopher Nolan is a British-American film director, producer, and screenwriter. His films have grossed over US$5 billion worldwide, and he has received 34 Oscar nominations and ten wins.", birth_year: 1970, death_year: null },
    image_url: "http://image5.url",
    is_featured: false
  },
  {
    title: "Reservoir Dogs",
    description: "When a simple jewelry heist goes horribly wrong, the surviving criminals begin to suspect that one of them is a police informant.",
    genre: { name: "Crime", description: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre." },
    director: { name: "Quentin Tarantino", bio: "Quentin Jerome Tarantino is an American film director, screenwriter, producer, and actor. His films have been characterized by nonlinear storylines, satirical subject matter, and an aestheticization of violence.", birth_year: 1963, death_year: null },
    image_url: "http://image7.url",
    is_featured: false
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    genre: { name: "Crime", description: "Crime films, in the broadest sense, is a film genre inspired by and analogous to the crime fiction literary genre." },
    director: { name: "Francis Ford Coppola", bio: "Francis Ford Coppola is an American film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.", birth_year: 1939, death_year: null },
    image_url: "http://image8.url",
    is_featured: true
  },
  {
    title: "Spring, Summer, Fall, Winter... and Spring",
    description: "A young boy lives in a small floating temple on a beautiful lake, together with an elderly master who teaches him the ways of the Buddha. Years later the boy, now a young man, experiences his sexual awakening with a girl who has come to the temple to be healed by the master. The youth runs away to the outside world but his lust turns his life into hell, so he returns to the temple to find spiritual enlightenment.",
    genre: { name: "Drama", description: "A genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well." },
    director: { name: "Kim Ki-duk", bio: "Kim Ki-duk was a South Korean film director and screenwriter, noted for his idiosyncratic art-house cinematic works. His films have received many distinctions in the festival circuit, making him one of the most important contemporary Asian film directors.", birth_year: 1960, death_year: 2020 },
    image_url: "http://image9.url",
    is_featured: true
  },
  {
    title: "Winter Sleep",
    description: "Aydin, a former actor, runs a small hotel in central Anatolia with his young wife Nihal with whom he has a stormy relationship and his sister Necla who is suffering from her recent divorce. In winter as the snow begins to fall, the hotel turns into a shelter but also an inescapable place that fuels their animosities...",
    genre: { name: "Drama", description: "A genre that relies on the emotional and relational development of realistic characters. While Drama film relies heavily on this kind of development, dramatic themes play a large role in the plot as well." },
    director: { name: "Nuri Bilge Ceylan", bio: "Nuri Bilge Ceylan is a Turkish film director, photographer, screenwriter and actor. He was the winner of the Palme d'Or, the highest prize at the Cannes Film Festival, in 2014.", birth_year: 1959, death_year: null },
    image_url: "http://image10.url",
    is_featured: false
  }
]);


db.users.insertMany([
  {
    username: "john_doe",
    email: "john.doe@example.com",
    password: "password1",
    birthday: new Date("1985-02-19"),
    favorite_movies: []
  },
  {
    username: "jane_smith",
    email: "jane.smith@example.com",
    password: "password2",
    birthday: new Date("1990-05-15"),
    favorite_movies: []
  },
  {
    username: "mike_jackson",
    email: "mike.jackson@example.com",
    password: "password3",
    birthday: new Date("1988-08-27"),
    favorite_movies: []
  },
  {
    username: "sarah_wilson",
    email: "sarah.wilson@example.com",
    password: "password4",
    birthday: new Date("1995-03-10"),
    favorite_movies: []
  },
  {
    username: "david_thompson",
    email: "david.thompson@example.com",
    password: "password5",
    birthday: new Date("1980-11-14"),
    favorite_movies: []
  }
]);


-- First, write 3 "READ" queries:
-- One to read all the movies from the “movies” collection that match a certain name
db.movies.find({ title: "Inception" }).pretty();
-- One to read all the movies in the “movies” collection that have a certain genre
db.movies.find({ "genre.name": "Thriller" }).pretty();
-- One to read all the documents that contain both a certain genre AND a certain director
db.movies.find({ "genre.name": "Thriller", "director.name": "Christopher Nolan" }).pretty();


-- Next, write 3 "UPDATE" queries:
-- One to update the description of a particular movie
db.movies.updateOne({ title: "Inception" }, { $set: { description: "A mind-bending thriller that explores dreams" } });
-- One to update the bio of a certain director of multiple movies
db.movies.updateMany({ "director.name": "Christopher Nolan" }, { $set: { "director.bio": "British-American film director known for his mind-bending movies" } });
-- One to add a certain movie to a particular user’s list of favorites
db.users.updateOne({ username: "user1" }, { $push: { favorite_movies: "Inception" } });


//Finally, write a "DELETE" query to delete a certain user, by username.
db.users.deleteOne({ username: "user2" });

-- After you run your update and delete queries, make sure you read the entire 
-- collection again to ensure you’ve made the proper modifications to the data.
db.movies.find().pretty();
db.users.find().pretty();