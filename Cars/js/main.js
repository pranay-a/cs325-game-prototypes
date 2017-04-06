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
    
    game.load.image('car', 'assets/car.png');
    game.load.image('car_object', 'assets/car_object.png');
    game.load.image('background', 'assets/background_1.jpg');
    game.load.audio('laser', 'assets/sound.mp3');
    game.load.audio('sound', 'assets/sound2.mp3');
    
  }
  
  var ball;
  var brick;
  var keys;
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

  var player;
  //var playerSpeed;
  var cursors;

  var zombie;
  var car_other1;
  var car_other2;
  var sound;
  var sound2;
 

  var itemCounter = 0;
  var ememy_number= 2;
  var game_over= false;
  var game_over_with_lives= false;
  var game_end;
  var scoreCounter = 100;
  var zombieCounter = 0;
  var playerHealth = 5;
  var spawnCounter = 0;

  
  var playerText;
  
  function create() {
    
    background = game.add.tileSprite(0, 0, 1600, 600, 'background');
    game.world.setBounds(0, 0, 1600, 600);
    //game.physics.startSystem(Phaser.Physics.P2JS);
    //game.physics.p2.restitution = 0.9;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.checkCollision.down = false;
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'car');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    createEnemy();

    keys = game.input.keyboard.createCursorKeys();
    sound = game.add.audio('laser');
    sound.play();
    sound2 = game.add.audio('sound');
    game.camera.follow(player);


    
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    text = game.add.text(0,0,'Score: ', style);
    game_end = game.add.text(500, 500, 'Game Over', style);
    //text.anchor.setTo(0.5, 0.5);
    text.fixedToCamera = true;
    lives1 = game.add.text(700, 0, 'lives: 3', style);
    lives1.fixedToCamera = true;
    game_end.visible = false;
    game_end.fixedToCamera = true;
    

   
    
    
  }
  
  function update () {
    lives1.text= 'lives: '+ lives;
    text.text= 'Score: '+ score;
    if(score> scoreCounter){
        car_other1.body.velocity.setTo(Math.random()*500,(-Math.random()*800)+100);
   car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   scoreCounter+= 100;
   }
    if(game_over== true){
        player.kill();
        car_other1.kill();
        car_other2.kill();
        sound.stop();
        game_end.visible = true;
        }
    if(game_over_with_lives== true){
        game_over_with_lives= false;
        }
        player.body.velocity.x = 0;
      player.body.velocity.y = 0;
    if (keys.left.isDown)
      {
        player.body.velocity.x = -300;
        
      }
      else if (keys.right.isDown)
      {
        player.body.velocity.x = 300;
      }
      
      if (keys.up.isDown)
      {
        player.body.velocity.y = -300;
      }
      else if (keys.down.isDown)
      {
        player.body.velocity.y = 200;
      }
     
    game.physics.arcade.collide(player, car_other1, player_and_car_other_1, null, this);
    game.physics.arcade.collide(player, car_other2, player_and_car_other_2, null, this);
    game.physics.arcade.collide(car_other1, car_other2, car_other_1_and_car_other_2, null, this);
    
  }
   
  function createEnemy()
 {
   car_other1 = game.add.sprite(game.world.randomX, game.world.randomY, 'car_object');
   car_other2 = game.add.sprite(game.world.randomX, game.world.randomY, 'car_object');
   game.physics.enable(car_other1, Phaser.Physics.ARCADE);
   game.physics.enable(car_other2, Phaser.Physics.ARCADE);
   car_other1.body.bounce.set(1);
   car_other2.body.bounce.set(1);
   car_other1.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   car_other1.body.collideWorldBounds = true;
   car_other2.body.collideWorldBounds = true;

 }
 
 
  function player_and_car_other_1 (player, car_other1){
    //player.kill();
    car_other1.kill();
    car_other1.revive();
    car_other1.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    lives--;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
    
    }
    
    function player_and_car_other_2 (player, car_other2){
    //player.kill();
    car_other2.kill();
    car_other2.revive();
    car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    lives--;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
   
    }
    function car_other_1_and_car_other_2 (car_other1, car_other2){
    //player.kill();
    car_other1.kill();
    car_other2.kill();
    car_other1.revive();
    car_other2.revive();
    car_other1.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    
    score+= 10;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
  
    }
  
  
  
};





