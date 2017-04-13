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
    game.load.video('cloud', 'assets/cloud.mp4');
    
  }
  
  var ball;
  var brick;
  var keys;
  var ball1= true;
  var laser;
  var lives = 5;
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
  var cursors;

  var zombie;
  var car_other1;
  var car_other2;
  var car_other3;
  var next_level= false;
  var animation1;
  var sound;
  var sound2;
  var timer= 0;
  var level;
 

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
    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.arcade.checkCollision.down = false;
    player = game.add.sprite(game.world.centerX, game.world.centerY, 'car');
    game.physics.enable(player, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true;
    createEnemy();
    animation1= game.add.video('cloud');
    
    keys = game.input.keyboard.createCursorKeys();
    sound = game.add.audio('laser');
    sound.play();
    sound2 = game.add.audio('sound');
    game.camera.follow(player);


    
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    text = game.add.text(0,0,'Score: ', style);
    level = game.add.text(400,0,'Level: 1', style);
    game_end = game.add.text(50, 500, 'Game Over Your score is ', style);
    //text.anchor.setTo(0.5, 0.5);
    text.fixedToCamera = true;
    level.fixedToCamera = true;
    lives1 = game.add.text(700, 0, 'lives: 5', style);
    lives1.fixedToCamera = true;
    game_end.visible = false;
    game_end.fixedToCamera = true;
    

  }
  
  function update () {
    lives1.text= 'lives: '+ lives;
    text.text= 'Score: '+ score;
    if(game.time.totalElapsedSeconds()>1){
    timer++;
    if(timer> 800){
    car_other1.body.velocity.setTo(Math.random()*500,(-Math.random()*800)+100);
   car_other2.body.velocity.setTo(Math.random()*900,(-Math.random()*800)+100);
   timer= 18;
   }
    if(score> scoreCounter){
        car_other1.body.velocity.setTo(Math.random()*500,(-Math.random()*800)+100);
   car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   scoreCounter+= 100;
   }
   if(score> 10 && next_level== false){
        createEnemy1();
        level.text= 'Level: 2';
        }
    if(game_over== true){
        player.kill();
        car_other1.kill();
        car_other2.kill();
        if(next_level== true){
        car_other3.kill();
        }
        sound.stop();
        game_end.text= 'Game Over Your score is '+ score;
        game_end.visible = true;
        }
    if(game_over_with_lives== true){
        game_over_with_lives= false;
        }
        player.body.velocity.x = 0;
      player.body.velocity.y = 0;
      //player.angle= 0;
    if (keys.left.isDown)
      {
        player.body.velocity.x = -400;
        player.scale.x = -1;
        //player.angle= 0;
        
      }
      else if (keys.right.isDown)
      {
        player.body.velocity.x = 400;
        player.scale.x = 1;
        //player.angle= 0;
      }
      
      if (keys.up.isDown)
      {
        player.body.velocity.y = -400;
        //player.angle= -90;
      }
      else if (keys.down.isDown)
      {
        player.body.velocity.y = 400;
        //player.angle= 90;
      }
     
     
    game.physics.arcade.collide(player, car_other1, player_and_car_other_1, null, this);
    game.physics.arcade.collide(player, car_other2, player_and_car_other_2, null, this);
    game.physics.arcade.collide(car_other1, car_other2, car_other_1_and_car_other_2, null, this);
    if(next_level== true){
    game.physics.arcade.collide(player, car_other3, player_and_car_other_3, null, this);
    game.physics.arcade.collide(car_other1, car_other3, car_other_1_and_car_other_3, null, this);
    game.physics.arcade.collide(car_other2, car_other3, car_other_2_and_car_other_3, null, this);
    }
    }
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
 function createEnemy1()
 {
   car_other3 = game.add.sprite(game.world.randomX, game.world.randomY, 'car_object');
   game.physics.enable(car_other3, Phaser.Physics.ARCADE);
   car_other3.body.bounce.set(1);
   car_other3.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
   car_other3.body.collideWorldBounds = true;
   next_level= true;
 

 }
 
 
  function player_and_car_other_1 (player, car_other1){
    if(timer>40){
    car_other1.kill();
    animation1.play();
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
    timer= 0;
    }
    
    }
    
    function player_and_car_other_2 (player, car_other2){
    if(timer>40){
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
        timer= 0;
    }
    }
    function player_and_car_other_3 (player, car_other3){
    if(timer>40){
    car_other3.kill();
    animation1.play();
    car_other3.revive();
    car_other3.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    lives--;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
    timer= 0;
    }
   
    }
    function car_other_1_and_car_other_2 (car_other1, car_other2){
    if(timer>15){
    car_other1.kill();
    car_other2.kill();
    car_other1.revive();
    car_other2.revive();
    car_other1.body.velocity.setTo(Math.random()*500,(-Math.random()*800));
   car_other2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    score+= 10;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
        timer= 0;
    }
    }
    function car_other_1_and_car_other_3 (car_other1, car_other3){
    if(timer>30){
    car_other1.kill();
    car_other3.kill();
    car_other1.revive();
    car_other3.revive();
    car_other1.body.velocity.setTo(Math.random()*500,(-Math.random()*800));
   car_other3.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    score+= 10;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
        timer= 0;
    }
    }
    function car_other_2_and_car_other_3 (car_other2, car_other3){
    if(timer>30){
    car_other2.kill();
    car_other3.kill();
    car_other2.revive();
    car_other3.revive();
    car_other2.body.velocity.setTo(Math.random()*500,(-Math.random()*800));
   car_other3.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    sound2.play();
    score+= 10;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
        timer= 0;
    }
    }
  
  
  
};





