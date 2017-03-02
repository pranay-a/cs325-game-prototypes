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
    
    game.load.image('building', 'assets/building.png');
    game.load.image('background', 'assets/background.jpg');
    game.load.image('brick', 'assets/brick.jpg');
    game.load.image('ball', 'assets/ball.png');
    game.load.image('tree', 'assets/tree.gif');
    game.load.audio('laser', 'assets/punch.mp3');
    
  }
  
  var ball;
  var brick;
  var keys;
  var buildings;
  var trees;
  var space;
  var ball1= true;
  var laser;
  var lives = 3;
  var score = 0;
  var text;
  var win_text;
  
  var points;
  var lives1;
  var start;
  var game1= false;
  var game2= false;
  
  var background;
  
  function create() {
    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.down = false;
    
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    game.world.enableBody = true;
    brick = game.add.sprite(game.world.centerX, 580,  'brick');
    brick.anchor.setTo(0.5, 0.5);
    brick.body.immovable = true;
    brick.body.collideWorldBounds = true;
    keys = game.input.keyboard.createCursorKeys();
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    
    
    buildings = game.add.group();
    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 6; j++) {
        var building = game.add.sprite(150+i*50, 100+j*40, 'building');
        building.body.immovable = true;
        buildings.add(building);
      }
    }
    
    
    
    ball = game.add.sprite(game.world.centerX, 550, 'ball'); 
    ball.anchor.set(0.5);
    ball.checkWorldBounds = true;
    
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1);
    
    ball.events.onOutOfBounds.add(ball_out, this);
    
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    points = game.add.text(0,0,'Score:', style);
    text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Loose', style);
    text.visible = false;
    win_text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over You Win And Saved The Trees', style);
    win_text.visible = false;
    lives1 = game.add.text(700, 0, 'lives: 3', style);
    start = game.add.text(game.world.centerX, 400, 'Press the spacebar to start', style);
    start.anchor.setTo(0.5, 0.5);
    laser = game.add.audio('laser');
    
  }
  
  function update () {
    if (space.isDown && game1== false && game2== false)
    {
      ball_go();
      
      
    }
    if(ball.y>610){
      ball_out();
    }
    points.text= "Score: "+ score;
    if (keys.left.isDown){
      brick.body.velocity.x = -300;
    }
    else if(keys.right.isDown){
      brick.body.velocity.x = 300;
    }
    else{
      brick.body.velocity.x = 0;
    }
    if(ball1== true){
      ball.body.x = brick.x;
    }
    if(score== 600){
      game_win();
    }
    game.physics.arcade.collide(brick, ball);
    game.physics.arcade.collide(ball, buildings, ball_and_building, null, this);
    
    
    
  }
  
  
  
  
  function ball_and_building (ball, building){
    score+= 10;
    laser.play();
    building.kill();
    var tree = game.add.sprite(building.x, building.y, 'tree');
  }
  
  function ball_out(){
    lives--;
    lives1.text = 'lives: ' + lives;
    
    if (lives=== 0){
      gameOver();
    }
    else
    {
      ball1= true;
      ball.body.x = brick.x;
      game2= false;
      ball.reset(brick.body.x + 16, brick.y - 16);
      
    }
    
  }
  function gameOver(){
    
    ball.body.velocity.setTo(0, 0);
    
    start.text = text.text;
    start.visible = true;
    lives1.visible= false;
    game1= true;
    
  }
  function game_win(){
    
    ball.body.velocity.setTo(0, 0);
    
    start.text = win_text.text;
    start.visible = true;
    lives1.visible= false;
    game1= true;
    ball.visible= false;
    
  }
  function ball_go(){
    ball1= false;
    ball.body.velocity.y = -290;
    ball.body.velocity.x = -90;
    game2= true;
    start.visible = false;
    
    
  }
  
  
};





