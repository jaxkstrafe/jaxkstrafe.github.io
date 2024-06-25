const { FXCollections, ObservableList } = require('javafx/collections');
const { Pos } = require('javafx/geometry');
const { Scene } = require('javafx/scene');
const { Button, ComboBox, Label } = require('javafx/scene/control');
const { BorderPane, HBox, Pane } = require('javafx/scene/layout');
const { Color } = require('javafx/scene/paint');
const { Rectangle } = require('javafx/scene/shape');
const { Font } = require('javafx/scene/text');

class WelcomeScreen {
    static screenWidth = 1200;
    static screenHeight = WelcomeScreen.screenWidth / 2;

    static createWelcomeScene(primaryStage) {
        const options = FXCollections.observableArrayList(
            "SFA",
            "Computer Science",
            "Animals",
            "Miscellaneous",
            "All"
        );
        const comboBox = new ComboBox(options);
        const genreLabel = new Label("Select a genre:");
        const hBox = new HBox(genreLabel, comboBox);
        comboBox.setOnAction(e => GamePane.genre = comboBox.getValue());
        const background = new Rectangle(0, 0, WelcomeScreen.screenWidth, WelcomeScreen.screenHeight);
        background.setFill(Color.BEIGE);
        const welcomeScreen = new Pane();
        const welcomeScene = new Scene(welcomeScreen, WelcomeScreen.screenWidth, WelcomeScreen.screenHeight);
        const bPane = new BorderPane();
        bPane.setTop(hBox);
        BorderPane.setAlignment(hBox, Pos.TOP_LEFT);
        const lblTitle = new Label();
        lblTitle.setText("Hangman");
        lblTitle.setFont(Font.font(50));
        lblTitle.setTranslateX(500);
        lblTitle.setTranslateY(100);
        const lblCredits = new Label();
        lblCredits.setText("By Jack Dalton, Gage Kolojaco, and Giovanni Smith");
        lblCredits.setFont(Font.font(25));
        lblCredits.setTranslateX(325);
        lblCredits.setTranslateY(200);
        const startButton = new Button("Start");
        startButton.setOnAction(e => WelcomeScreen.startGame(primaryStage));
        const buttonWidth = 100;
        const buttonHeight = 50;
        startButton.setLayoutX((welcomeScene.getWidth() - buttonWidth) / 2);
        startButton.setLayoutY((welcomeScene.getHeight() - buttonHeight) / 2);
        startButton.setPrefSize(buttonWidth, buttonHeight);
        welcomeScreen.getChildren().addAll(background, startButton, lblTitle, lblCredits, bPane);
        return welcomeScene;
    }

    static startGame(primaryStage) {
        const gamePane = new GamePane();
        const gameScene = new Scene(gamePane, WelcomeScreen.screenWidth, WelcomeScreen.screenHeight);
        primaryStage.setScene(gameScene);
        primaryStage.setTitle("Hangman Game");
        primaryStage.show();
    }
}

module.exports = WelcomeScreen;
