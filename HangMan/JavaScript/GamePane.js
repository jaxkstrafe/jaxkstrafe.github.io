const { Pane, ImageView, Image, Color, Rectangle, Label, BorderPane, Alert, AlertType, ButtonType } = require('javafx');
const LetterButton = require('./LetterButton'); // Assuming you have a LetterButton class/module
const WordList = require('./WordList'); // Assuming you have a WordList module

class GamePane extends Pane {
    static genre = "";
    words = [];
    wordToGuess = "";
    wordToGuessWhiteBackground;
    wordToGuessX = 500;
    wordToGuessY = 200;
    letterButton;
    paneLetterButtons;
    spacing;
    letterButtonsOfWordToGuess = [];
    letterButtonsOfAlphabet = [];
    incorrectGuessCount = 0;
    correctGuessCount = 0;
    hangmanImage;
    gallowsImage;
    backgroundImage;
    incorrectGuessLabel;

    constructor() {
        super();
        if (GamePane.genre === "SFA") this.words = WordList.sfa;
        else if (GamePane.genre === "Computer Science") this.words = WordList.compSci;
        else if (GamePane.genre === "Animals") this.words = WordList.animals;
        else if (GamePane.genre === "Miscellaneous") this.words = WordList.misc;
        else this.words = WordList.all;
        this.spacing = 1.05;
        this.wordToGuess = this.getRandomWord(this.words);
        this.letterButtonsOfWordToGuess = [];
        this.letterButtonsOfAlphabet = [];
        this.initializeBackgroundImages();
        this.initializeGallowsImage();
        this.initializeHangmanImage();
        this.intializeIncorrectCounter();
        
        this.drawLetterButtons();
        this.incorrectGuessCount = 0;

        this.createWordToGuess();
    }

    createWordToGuess() {
        for (let i = 0; i < this.wordToGuess.length; i++) {
            let letterButton = new LetterButton(0, this.wordToGuessY, '');
            letterButton.setTranslateX(i * (LetterButton.getWidthOfObject() * this.spacing) + this.wordToGuessX);
            letterButton.setTranslateY(this.wordToGuessY);
            letterButton.setDisable(true);
            letterButton.setStyle("-fx-background-color: transparent; -fx-border-color: black; -fx-font-size: 15px; -fx-font-weight: bold; -fx-underline: true;");

            this.getChildren().add(letterButton);
            this.letterButtonsOfWordToGuess.push(letterButton);
        }
    }

    drawLetterButtons() {
        this.paneLetterButtons = new Pane();
        for (let c = 'A'; c <= 'Z'; c++) {
            this.letterButton = new LetterButton((c.charCodeAt(0) - 'A'.charCodeAt(0)) * (LetterButton.getWidthOfObject() * this.spacing), 500, c);
            let currentCharacter = c;
            this.letterButton.setOnMouseClicked(e => this.guessLetter(currentCharacter));
            this.getChildren().add(this.letterButton);
            this.letterButtonsOfAlphabet.push(this.letterButton);
        }
    }

    getRandomWord(stringArray) {
        let word = stringArray[Math.floor(Math.random() * stringArray.length)];
        console.log("The word: " + word);
        return word;
    }

    initializeHangmanImage() {
        this.hangmanImage = new ImageView(); 
        this.hangmanImage.setFitWidth(350);
        this.hangmanImage.setFitHeight(350);
        this.hangmanImage.setTranslateX(60);
        this.hangmanImage.setTranslateY(180);
        this.hangmanImage.setScaleX(0.85);
        this.hangmanImage.setScaleY(0.85);
        this.updateHangmanImage(); 
        this.getChildren().add(this.hangmanImage); 
    }

    initializeGallowsImage() {
        this.gallowsImage = new ImageView();
        this.gallowsImage.setTranslateX(-200);
        this.gallowsImage.setTranslateY(100);
        this.gallowsImage.setScaleX(1.5);
        this.gallowsImage.setScaleY(1.5);
        this.updateGallowsImage();
        this.getChildren().add(this.gallowsImage); 
    }

    initializeBackgroundImages() {
        this.backgroundImage = new ImageView();
        let img = new Image("images/background.jpg");
        this.backgroundImage.setImage(img);
        this.backgroundImage.setTranslateX(-400);
        this.backgroundImage.setTranslateY(-300);
        this.backgroundImage.setScaleX(0.75);
        this.backgroundImage.setScaleY(0.75);
        
        this.wordToGuessWhiteBackground = new Rectangle(this.wordToGuessX, this.wordToGuessY, this.wordToGuess.length * (LetterButton.getWidthOfObject() * this.spacing), 50);
        this.updateBackgroundImage();
        this.wordToGuessWhiteBackground.setFill(Color.WHITE);
        this.getChildren().addAll(this.backgroundImage, this.wordToGuessWhiteBackground); 
    }

    intializeIncorrectCounter() {
        this.incorrectGuessLabel = new Label("Total Incorrect Guesses: " + this.incorrectGuessCount);
        this.incorrectGuessLabel.setTextFill(Color.WHITE);
        let bPane = new BorderPane(this.incorrectGuessLabel);
        this.getChildren().add(bPane);
        bPane.setViewOrder(-2);
    }

    updateHangmanImage() {
        let image;
        if (this.incorrectGuessCount <= 6)
            image = new Image("images/shrek-" + this.incorrectGuessCount + ".png");
        else
            image = new Image("images/shrek-6.png");
        this.hangmanImage.setImage(image);
    }

    updateGallowsImage() {
        let image;
        if (this.incorrectGuessCount <= 5)
            image = new Image("images/gallows-closed.png");
        else
            image = new Image("images/gallows-open.png");
        this.gallowsImage.setImage(image);
    }

    updateBackgroundImage() {
        this.wordToGuessWhiteBackground.setWidth(this.wordToGuess.length * (LetterButton.getWidthOfObject() * this.spacing));
    }

    guessLetter(letter) {
        let guess = false;
        for (let i = 0; i < this.letterButtonsOfWordToGuess.length; i++) {
            if (this.wordToGuess.charAt(i).toLowerCase() === letter.toLowerCase()) {
                this.letterButtonsOfWordToGuess[i].setLetter(letter);
                guess = true;
            }
        }
        if (guess) {
            this.handleCorrectGuess(letter);
        } else {
            this.handleWrongGuess();
        }
    }

    handleCorrectGuess(guessedLetter) {
        let occurrences = this.countOccurrences(guessedLetter);
        this.correctGuessCount += occurrences;

        if (this.correctGuessCount === this.wordToGuess.length) {
            this.showEndGamePopup("Congratulations! You win! The word was: " + this.wordToGuess);
        }
    }

    handleWrongGuess() {
        this.incorrectGuessCount++;
        this.updateIncorrectGuessLabel();
        this.updateGallowsImage();
        this.updateHangmanImage();

        if (this.incorrectGuessCount >= 6) {
            this.showEndGamePopup("You Lose! The word was " + this.wordToGuess);
        }
    }

    countOccurrences(guessedLetter) {
        let count = 0;
        for (let i = 0; i < this.wordToGuess.length; i++) {
            if (this.wordToGuess.charAt(i).toLowerCase() === guessedLetter.toLowerCase()) {
                count++;
            }
        }
        return count;
    }

    restartGame() {
        this.wordToGuess = this.getRandomWord(this.words);
        this.incorrectGuessCount = 0;
        this.correctGuessCount = 0;
        this.updateHangmanImage();
        this.updateDisplayedWord();
        this.updateBackgroundImage();
        this.createWordToGuess();
        this.updateIncorrectGuessLabel();

        for (let letterButton of this.letterButtonsOfAlphabet) {
            letterButton.setDisable(false);
        }
    }

    updateDisplayedWord() {
        this.getChildren().removeAll(this.letterButtonsOfWordToGuess);

        this.letterButtonsOfWordToGuess = [];
        let startX = this.wordToGuessX;

        for (let i = 0; i < this.wordToGuess.length; i++) {
            let letterButton = new LetterButton(0, this.wordToGuessY, '');
            letterButton.setTranslateX(i * (LetterButton.getWidthOfObject() * this.spacing) + startX);
            letterButton.setTranslateY(this.wordToGuessY);
            letterButton.setDisable(true);
            letterButton.setStyle("-fx-background-color: transparent; -fx-border-color: black; -fx-font-size: 15px; -fx-font-weight: bold; -fx-underline: true;");

            this.getChildren().add(letterButton);
            this.letterButtonsOfWordToGuess.push(letterButton);
        }
    }

    updateIncorrectGuessLabel() {
        this.incorrectGuessLabel.setText("Total Incorrect Guesses: " + this.incorrectGuessCount);
    }

    showEndGamePopup(message) {
        let alert = new Alert(AlertType.CONFIRMATION);
        alert.setTitle("Game Over");
        alert.setHeaderText(message);
        alert.setContentText("What would you like to do");
        let restartButton = new ButtonType("Restart");
        let quitButton = new ButtonType("Quit");
        alert.getButtonTypes().setAll(restartButton, quitButton);

        alert.showAndWait().then(result => {
            if (result === restartButton) {
                this.restartGame();
            } else if (result === quitButton) {
                let stage = this.getScene().getWindow();
                stage.close();
            }
        });
    }
}
    
// Export the GamePane class for use in other modules if necessary
module.exports = GamePane;
               