/* filename: complexCode.js */

// This code is a complex example showcasing the implementation of a chatbot using natural language processing

// Importing required libraries
const natural = require('natural');
const readline = require('readline');

// Creating a tokenizer
const tokenizer = new natural.WordTokenizer();

// Creating a stemmer
const stemmer = natural.PorterStemmer;

// Creating a classifier
const classifier = new natural.BayesClassifier();

// Creating a chatbot object
const chatbot = {
  greetings: ['hi', 'hello', 'hey', 'greetings', 'hi there'],
  farewells: ['bye', 'goodbye', 'see you', 'farewell'],
  intentions: ['tell me a joke', 'recommend a movie', 'weather forecast'],
};

// Training the classifier with sample intents
classifier.addDocument('Tell me a joke', 'joke');
classifier.addDocument('Would you recommend a movie?', 'recommendation');
classifier.addDocument('What will be the weather like tomorrow?', 'weather');

// Training the classifier with greetings and farewells
chatbot.greetings.forEach((greeting) => {
  classifier.addDocument(greeting, 'greeting');
});

chatbot.farewells.forEach((farewell) => {
  classifier.addDocument(farewell, 'farewell');
});

// Performing necessary training and persisting the classifier
classifier.train();
classifier.save('trained_classifier.json', (err, classifier) => {
  if (err) {
    console.error('Error occurred while saving classifier:', err);
  } else {
    console.log('Classifier successfully trained and saved!');
  }
});

// Creating a function to respond to user input
function respondToUserInput(input) {
  input = input.toLowerCase();

  if (classifier.classify(input) === 'greeting') {
    return 'Hello! How can I assist you today?';
  }

  if (classifier.classify(input) === 'farewell') {
    return 'Goodbye! Have a great day!';
  }

  if (classifier.classify(input) === 'joke') {
    const jokes = [
      'Why don\'t scientists trust atoms? Because they make up everything!',
      'What did one wall say to the other? I\'ll meet you at the corner!',
      'Why did the scarecrow win an award? Because he was outstanding in his field!',
    ];
    const randomIndex = Math.floor(Math.random() * jokes.length);

    return jokes[randomIndex];
  }

  if (classifier.classify(input) === 'recommendation') {
    const movies = [
      'The Shawshank Redemption',
      'The Godfather',
      'Pulp Fiction',
      'Fight Club',
      'The Matrix',
      'Inception',
    ];
    const randomIndex = Math.floor(Math.random() * movies.length);
    
    return `How about watching "${movies[randomIndex]}"?`;
  }

  if (classifier.classify(input) === 'weather') {
    // Perform weather API call and return the forecast
    return 'The weather forecast for tomorrow is 25°C with partly cloudy skies.';
  }

  return 'I\'m sorry, but I don\'t understand. Could you please rephrase your query?';
}

// Creating a command line user interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt('User: ');
rl.prompt();

rl.on('line', (input) => {
  console.log('Chatbot:', respondToUserInput(input));
  rl.prompt();
}).on('close', () => {
  console.log('Chat session ended!');
  process.exit(0);
});

// End of complexCode.js