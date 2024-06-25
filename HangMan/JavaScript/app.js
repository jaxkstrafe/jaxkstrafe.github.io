// Import necessary modules or define necessary dependencies
const { Application, Scene, Stage } = require('javafx');
const WelcomeScreen = require('./WelcomeScreen'); // Assuming you have a WelcomeScreen module

// Define your App class extending from Application
class App extends Application {
  // Implement the start method required by Application
  start(primaryStage) {
    // Create the welcome scene using a method from WelcomeScreen
    const welcomeScene = WelcomeScreen.createWelcomeScene(primaryStage);

    // Set the scene, title, and show the primary stage
    primaryStage.setScene(welcomeScene);
    primaryStage.setTitle('Hangman Game - Welcome');
    primaryStage.show();
  }

  // Define a static main method to launch the application
  static main(args) {
    // Call launch method provided by Application
    this.launch(args);
  }
}

// Export the App class for use in other modules if necessary
module.exports = App;
