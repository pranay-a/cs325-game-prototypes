window.onload = function() {
  // You might want to start with a template that uses GameStates:
  //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
  
  // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
  // You will need to change the fourth parameter to "new Phaser.Game()" from
  // 'phaser-example' to 'game', which is the id of the HTML element where we
  // want the game to go.
  // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
  // You will need to change the paths you pass to "game.load.image()" or any other
  // loading functions to reflect where you are putting the assets.
  // All loading functions will typically all be found inside "preload()".
  
  "use strict";
  
  var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
  
  function preload() {
    // Load an image and call it 'logo'.
    game.load.image( 'the_5_spades', 'assets/the_5_spades.png' );
    game.load.image( 'the_5_hearts', 'assets/the_5_hearts.png' );
    game.load.image( 'the_king_spades', 'assets/the_king_spades.png' );
    game.load.image( 'the_king_hearts', 'assets/the_king_hearts.png' );
    game.load.image( 'the_queen_spades', 'assets/the_queen_spades.png' );
    game.load.image( 'the_queen_hearts', 'assets/the_queen_hearts.png' );
    game.load.image( 'the_9_spades', 'assets/the_9_spades.png' );
    game.load.image( 'the_9_hearts', 'assets/the_9_hearts.png' );
    game.load.image( 'the_10_spades', 'assets/the_10_spades.png' );
    game.load.image( 'the_10_hearts', 'assets/the_10_hearts.png' );
    game.load.image( 'card_back', 'assets/card_back.jpg' );
    game.load.image( 'background', 'assets/background.jpg' );
    game.load.image( 'good_guy', 'assets/player.jpg' );
  }
  
  var bouncy;
  var the_5_spades;
  var the_5_hearts;
  var the_king_spades;
  var the_king_hearts;
  var the_queen_spades;
  var the_queen_hearts;
  var the_9_spades;
  var the_9_hearts;
  var the_10_spades;
  var the_10_hearts;
  //                5s   qh   ks   10h   qs   9h   9s  5h    10s  kh
  var xLocation = [100, 300, 200, 500, 300, 400, 400, 100, 500, 200];
  var yLocation = [100, 200, 100, 200, 100, 200, 100, 200, 100, 200];
  var clicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  var checker;
  var cardsClicked = 0;
  var image_w = 98;
  var image_h = 98;
  var text;
  var score= 0;
  var points;
  var game_over= false;
  var good_guy;
  var win_text;
  function create() {
    // Create a sprite at the center of the screen using the 'logo' image.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    
    the_5_spades = game.add.sprite(xLocation[0], yLocation[0], 'card_back');
    the_5_hearts = game.add.sprite(xLocation[1], yLocation[1], 'card_back');
    the_king_spades = game.add.sprite(xLocation[2], yLocation[2], 'card_back');
    the_king_hearts = game.add.sprite(xLocation[3], yLocation[3], 'card_back');
    the_queen_spades = game.add.sprite(xLocation[4], yLocation[4], 'card_back');
    the_queen_hearts = game.add.sprite(xLocation[5], yLocation[5], 'card_back');
    the_9_spades = game.add.sprite(xLocation[6], yLocation[6], 'card_back');
    the_9_hearts = game.add.sprite(xLocation[7], yLocation[7], 'card_back');
    the_10_spades = game.add.sprite(xLocation[8], yLocation[8], 'card_back');
    the_10_hearts = game.add.sprite(xLocation[9], yLocation[9], 'card_back');
    
    
    
    good_guy = game.add.sprite(game.world.centerX, 500, 'good_guy');
    good_guy.anchor.setTo(0.5, 0);
    game.physics.enable(good_guy, Phaser.Physics.ARCADE);
    good_guy.body.collideWorldBounds = true;
    good_guy.body.immovable = true;
    
    
    the_5_spades.inputEnabled = true;
    the_5_hearts.inputEnabled = true;
    the_king_spades.inputEnabled = true;
    the_king_hearts.inputEnabled = true;
    the_queen_spades.inputEnabled = true;
    the_queen_hearts.inputEnabled = true;
    the_9_spades.inputEnabled = true;
    the_9_hearts.inputEnabled = true;
    the_10_spades.inputEnabled = true;
    the_10_hearts.inputEnabled = true;
    
    the_5_spades.events.onInputDown.add(clicked_l, this);
    the_5_hearts.events.onInputDown.add(clicked_l, this);
    the_king_spades.events.onInputDown.add(clicked_l, this);
    the_king_hearts.events.onInputDown.add(clicked_l, this);
    the_queen_spades.events.onInputDown.add(clicked_l, this);
    the_queen_hearts.events.onInputDown.add(clicked_l, this);
    the_9_spades.events.onInputDown.add(clicked_l, this);
    the_9_hearts.events.onInputDown.add(clicked_l, this);
    the_10_spades.events.onInputDown.add(clicked_l, this);
    the_10_hearts.events.onInputDown.add(clicked_l, this);
    
    
    
    
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    points = game.add.text(0,0,'Score:', style);
    text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Loose Try To Do It Faster', style);
    text.visible = false;
    win_text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Win', style);
    win_text.visible = false;
  }
  
  
  function clicked_l() {
    // Setting the mouse x and y position
    var clickX = game.input.mousePointer.x;
    var clickY = game.input.mousePointer.y;
    cardsClicked++;
    checkCard(clickX, clickY);
    if(cardsClicked === 2){
      cardsClicked = 0;
      checkMatch();
    }
  }
  
  function checkCard(X, Y) {
    var count;
    // Loop to see which card was clicked
    for(count = 0; count < xLocation.length; count++){
      if(xLocation[count] <= X && X <= xLocation[count]+image_w && yLocation[count] <= Y && Y <= yLocation[count]+image_h){
        checker = count;
        flipCard(checker);
        break;
      }
    }
  }
  
  function checkMatch(){
    // function to see if a match was found when two cards were clicked
    var i;
    for(i = 0; i < clicked.length; i+=2){
      // If a match is found
      if(clicked[i] === 1 && clicked[i+1] === 1){
        // Order of card name in array
        if(i === 0){
          the_5_spades.inputEnabled = false;
          the_5_hearts.inputEnabled = false;
        }else if(i === 2){
          the_king_spades.inputEnabled = false;
          the_king_hearts.inputEnabled = false;
        }else if(i === 4){
          the_queen_spades.inputEnabled = false;
          the_queen_hearts.inputEnabled = false;
        }else if(i === 6){
          the_9_spades.inputEnabled = false;
          the_9_hearts.inputEnabled = false;
        }else if(i === 8){
          the_10_spades.inputEnabled = false;
          the_10_hearts.inputEnabled = false;
        }
      }else{
        // Set the cards back to the cardBack image
        clicked[i] = 0;
        clicked[i+1] = 0;
        game.add.sprite(xLocation[i], yLocation[i], 'card_back');
        game.add.sprite(xLocation[i+1], yLocation[i+1], 'card_back');
      }
    }
  }
  
  function flipCard(checker1) {
    // Change the card from the back of the card to the face of the card.
    if(checker1 === 0){
      the_5_spades = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_5_spades');
    }else if(checker1 === 1){
      the_5_hearts = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_5_hearts');
    }else if(checker1 === 2){
      the_king_spades = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_king_spades');
    }else if(checker1 === 3){
      the_king_hearts = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_king_hearts');
    }else if(checker1 === 4){
      the_queen_spades = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_queen_spades');
    }else if(checker1 === 5){
      the_queen_hearts = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_queen_hearts');
    }else if(checker1 === 6){
      the_9_spades = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_9_spades');
    }else if(checker1 === 7){
      the_9_hearts = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_9_hearts');
    }else if(checker1 === 8){
      the_10_spades = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_10_spades');
    }else if(checker1 === 9){
      the_10_hearts = game.add.sprite(xLocation[checker1], yLocation[checker1], 'the_10_hearts');
    }
    clicked[checker1] = 1;
  }
  
  
  function update() {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    var i=0;
    var all= false;
    for(i=0; i< clicked.length; i++){
      if(clicked[i]== 0){
        break;
      }
      else if(clicked[i]== 1 && i== clicked.length-1){
        all= true;
      }
    }
    if(all== true){
      game_over= true;
    }
    points.text= "Score: "+ score;
    if(game_over== false){
      score+= 1;
    }
    if(game_over== true && score<= 300){
      win_text.visible = true;
    }
    else if(game_over== true && score> 300){
      text.visible = true;
    }
    good_guy.x = game.input.x;
    
    if (good_guy.x < 28)
    {
      good_guy.x = 28;
    }
    else if (good_guy.x > game.width - 28)
    {
      good_guy.x = game.width - 28;
    }
  }
  
  
  
  
};










