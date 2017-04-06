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
    game.load.image('background', 'assets/background.jpg');
    //game.load.audio('laser', 'assets/punch.mp3');
    
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

  var player;
  //var playerSpeed;
  var cursors;

  var zombie;

 

  var itemCounter = 0;
  var ememy_number= 2;
  var game_over= false;
  var game_over_with_lives= false;
  var game_end;
  var scoreCounter = 0;
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
    createEnemy();
    createEnemy();

    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);


    
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    text = game.add.text(0,0,'Score:', style);
    game_end = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', style);
    //text.anchor.setTo(0.5, 0.5);
    text.fixedToCamera = true;
    lives1 = game.add.text(700, 0, 'lives: 3', style);
    lives1.fixedToCamera = true;
    game_end.visible = false;
    

   
    
  }
  
  function update () {
    lives1.text= 'lives '+ lives;
    if(game_over== true){
        player.kill();
        game_end.visible = true;
        }
    if(game_over_with_lives== true){
        zombie.kill();
        zombie.kill();
        zombie.kill();
        game_over_with_lives= false;
        createEnemy();
        createEnemy();
        }
    if (cursors.up.isDown)
    {
      player.body.velocity.y = -300;
      console.log("up");
    }
    else if (cursors.down.isDown)
    {
      player.body.velocity.y = 300;
    }
    if (cursors.left.isDown)
    {
      player.body.velocity.x = -300;
      
    }
    else if (cursors.right.isDown)
    {
      player.body.velocity.x = 300;
    }
    else{
      player.body.velocity.x = 0;
      player.body.velocity.y = 0;
    }
    
    accelerateToObject(zombie, player, 250);
    game.physics.arcade.collide(player, zombie, player_and_zombie, null, this);
    
  }
   
  function createEnemy()
 {
   zombie = game.add.sprite(game.world.randomX, game.world.randomY, 'car_object');
   game.physics.enable(zombie, Phaser.Physics.ARCADE);
   
   zombie.body.fixedRotation = true;
   //accelerateToObject(zombie, player, 250);
   //player.body.createBodyCallback(zombie, playerDamage, this);
   spawnCounter = 0;
 }
 
 function accelerateToObject(object1, object2, speed)
 {
   if (typeof speed === 'undefined')
   {
     speed = 60;
   }
    var angle = Math.atan2(object2.y - object1.y, object2.x - object1.x);
    object1.body.rotation = angle + game.math.degToRad(90);
    object1.body.force.x = Math.cos(angle) * speed;
    object1.body.force.y = Math.sin(angle) * speed;
 }
  function player_and_zombie (player, zombie){
    //player.kill();
    zombie.kill();
    lives--;
    if(lives== 0){
        game_over= true;
        }
    else{
        game_over_with_lives= true;
        }
    console.log("Player and Zombie");
    }
  
  
  
};





