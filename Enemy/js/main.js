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
    game.load.image( 'good_guy', 'assets/good_guy.jpg' );
    game.load.image( 'other_guy', 'assets/other_guy.jpg' );
    game.load.image( 'bullet', 'assets/bullet.jpg' );
    game.load.image( 'other_bullet', 'assets/other_bullet.jpg' );
    game.load.image( 'background', 'assets/background.jpg' );
  }
  
  var bouncy;
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
  function create() {
    // Create a sprite at the center of the screen using the 'logo' image.
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.tileSprite(0, 0, 1000, 600, 'background');
    
    good_guy = game.add.sprite(0, 600, 'good_guy' );
    other_guy = game.add.sprite(700, 500, 'other_guy');
    
    
    //asteriod.anchor.setTo(0.5, 0);
    game.physics.enable(good_guy, Phaser.Physics.ARCADE);
    game.physics.enable(other_guy, Phaser.Physics.ARCADE);
    game.physics.arcade.enable(good_guy);
    game.physics.arcade.enable(other_guy);
    //earth.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    good_guy.body.collideWorldBounds = true;
    //earth.body.bounce.set(1);
    other_guy.body.collideWorldBounds = true;
    other_guy.body.immovable = true;
    keys = game.input.keyboard.createCursorKeys();
    space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    tool = game.add.weapon(30, 'bullet');
    tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    tool.bulletSpeed = 450;
    
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    tool.fireRate = 200;
    
    
    
    
    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    tool.trackSprite(good_guy, 60, 50, true);
    
    
    
    
    other_tool = game.add.weapon(30, 'other_bullet');
    other_tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    other_tool.bulletSpeed = -200;
    other_tool.fireRate = 300;
    other_tool.trackSprite(other_guy, 60, 50, true);
    
    
    
    
    
    
    
    
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










