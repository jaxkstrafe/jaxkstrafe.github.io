const { Button, Color } = require('javafx');

class LetterButton extends Button {
    static width = 42;
    static height = 50;
    letter;
    guessed = false;

    constructor(x, y, letter) {
        super();
        this.setTranslateX(this.getTranslateX() + x);
        this.setTranslateY(this.getTranslateY() + y);
        this.setPrefWidth(LetterButton.width);
        this.setPrefHeight(LetterButton.height);
        this.setText(letter.toString());
        this.setStyle("-fx-font-weight: bold");

        this.setOnAction((e) => {
            this.setDisable(true);
            if (!this.guessed) {
                this.guessed = true;
            }
        });
        this.setTextFill(Color.BLACK);
        this.letter = letter;
    }

    static getWidthOfObject() {
        return LetterButton.width;
    }

    getLetter() {
        return this.letter;
    }

    setLetter(letter) {
        this.setText(letter.toString());
    }
}

// Export the LetterButton class for use in other modules if necessary
module.exports = LetterButton;
