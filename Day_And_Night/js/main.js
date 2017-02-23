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
    game.load.image( 'card_back', 'assets/card_back.png' );
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
  
  
  var xLocation = [230, 100, 70, 150, 180, 200, 220, 250, 170, 300, 140, 100, 200, 150, 300, 200, 180, 250, 120, 300];
    var yLocation = [270, 600, 320, 600, 190, 600, 10, 600, 260, 600, 340, 650, 380, 650, 400, 650, 480, 650, 550, 650];
    var clicked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; 
  
  
  
  
  
  
  
  
  
  
  
  var text;
  var score= 0;
  var points;
  var game_over= false;
  var good_guy;
  var other_guy;
  var background;
  var keys;
  var space;
  var tool;
  var other_tool;
  var bullets;
  var bullet;
  var bullet_time= 0;
  var win_text;
  var laser;
  function create() {
    // Create a sprite at the center of the screen using the 'logo' image.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    
    heart = game.add.sprite(xLocation[0], yLocation[0], 'cardBack');
    
    
    
    
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    points = game.add.text(0,0,'Score:', style);
    text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Loose', style);
    text.visible = false;
    win_text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Win', style);
    win_text.visible = false;
  }
  
  
  function update() {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    points.text= "Score: "+ score;
    if(game_over== false){
      score+= 1;
      if(Math.random()>.9){
        other_tool.fire();
      }
      
      good_guy.body.velocity.x = 0;
      good_guy.body.velocity.y = 0;
      
      other_guy.body.velocity.x = 0;
      other_guy.body.velocity.y = 0;
      if(Math.random()>.5){
        other_guy.body.velocity.y = Math.random()*1000;
      }
      else{
        other_guy.body.velocity.y = -(Math.random()*1000);
      }
      if (keys.left.isDown)
      {
        good_guy.body.velocity.x = -200;
        good_guy.scale.x = -1;
      }
      else if (keys.right.isDown)
      {
        good_guy.body.velocity.x = 200;
        good_guy.scale.x = 1;
      }
      
      if (keys.up.isDown)
      {
        good_guy.body.velocity.y = -200;
      }
      else if (keys.down.isDown)
      {
        good_guy.body.velocity.y = 200;
      }
      if (space.isDown)
      {
        tool.fire();
        laser.play();
      }
      
      game.physics.arcade.overlap(tool.bullets, other_guy, bullet_enemy, null, this);
      game.physics.arcade.overlap(other_tool.bullets, good_guy, bullet_guy, null, this);
      
    }
  }
  function bullet_enemy(){
    other_guy.kill();
    win_text.visible = true;
    game_over= true;
    tool.bullets.visible= false;
    other_tool.bullets.visible= false;
  }
  function bullet_guy(){
    good_guy.kill();
    text.visible = true;
    game_over= true;
    tool.bullets.visible= false;
    other_tool.bullets.visible= false;
  }
  
  
  
  
};










