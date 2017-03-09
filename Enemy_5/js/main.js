"use strict";

var Game5 = {};












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
  
  //"use strict";
  
  //var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
  Game5.StateA = function (game) {

    this. bouncy;
  this.text;
  this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.good_guy;
  this.other_guy;
  this.background;
  this.keys;
  this.space;
  this.tool;
  this.other_tool;
  this.bullets;
  this.bullet;
  this.bullet_time= 0;
  this.brick;
  this.win_text;
  this.laser;

};





//This is State A
Game5.StateA.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    this.load.image( 'good_guy', 'assets/good_guy.png' );
    this.load.image( 'other_guy', 'assets/other_guy.png' );
    this.load.image( 'bullet', 'assets/bullet.png' );
    this.load.image( 'other_bullet', 'assets/other_bullet.png' );
    this.load.image( 'background', 'assets/background.jpg' );
    this.load.image( 'brick', 'assets/brick1.jpg' );
    this.load.audio('laser', 'assets/laser.wav');
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    
    this.good_guy = this.add.sprite(0, 600, 'good_guy' );
    this.other_guy = this.add.sprite(700, 500, 'other_guy');
    
    
    //asteriod.anchor.setTo(0.5, 0);
    this.physics.enable(this.good_guy, Phaser.Physics.ARCADE);
    this.physics.enable(this.other_guy, Phaser.Physics.ARCADE);
    this.physics.arcade.enable(this.good_guy);
    this.physics.arcade.enable(this.other_guy);
    //earth.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.good_guy.body.collideWorldBounds = true;
    //earth.body.bounce.set(1);
    this.other_guy.body.collideWorldBounds = true;
    this.other_guy.body.immovable = true;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    this.tool = this.add.weapon(30, 'bullet');
    this.tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    this.tool.bulletSpeed = 450;
    
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.tool.fireRate = 200;
    
    
    
    
    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.tool.trackSprite(this.good_guy, 60, 50, true);
    
    
    
    
    this.other_tool = this.add.weapon(30, 'other_bullet');
    this.other_tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    this.other_tool.bulletSpeed = -200;
    this.other_tool.fireRate = 300;
    this.other_tool.trackSprite(this.other_guy, 60, 50, true);
    
    
    this.laser = this.add.audio('laser');
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(0,0,'Score:', style);
    this.level = this.add.text(700,0,'Level: 1', style);
    this.text = this.add.text(this.world.centerX, this.world.centerY, 'Game Over You Loose', style);
    this.text.visible = false;
    this.win_text = this.add.text(this.world.centerX, this.world.centerY, 'Game Over You Win', style);
    this.win_text.visible = false;
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.points.text= "Score: "+ this.score;
    if(this.game_over== false){
      this.score+= 1;
      if(Math.random()>.9){
        this.other_tool.fire();
      }
      
      this.good_guy.body.velocity.x = 0;
      this.good_guy.body.velocity.y = 0;
      
      this.other_guy.body.velocity.x = 0;
      this.other_guy.body.velocity.y = 0;
      if(Math.random()>.5){
        this.other_guy.body.velocity.y = Math.random()*1000;
      }
      else{
        this.other_guy.body.velocity.y = -(Math.random()*1000);
      }
      if (this.keys.left.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.x = -200;
        this.good_guy.scale.x = -1;
      }
      else if (this.keys.right.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.x = 200;
        this.good_guy.scale.x = 1;
      }
      
      if (this.keys.up.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.y = -200;
      }
      else if (this.keys.down.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.y = 200;
      }
      if (this.space.isDown)
      {
        this.tool.fire();
        this.laser.play();
      }
      
      this.physics.arcade.overlap(this.tool.bullets, this.other_guy, this.gotoStateB, null, this);
      this.physics.arcade.overlap(this.other_tool.bullets, this.good_guy, this.bullet_guy, null, this);
      
    }
  },
  bullet_enemy: function () {
    this.other_guy.kill();
    this.win_text.visible = true;
    this.game_over= true;
    this.tool.bullets.visible= false;
    this.other_tool.bullets.visible= false;
  },
  bullet_guy: function () {
    this.good_guy.kill();
    this.text.visible = true;
    this.game_over= true;
    this.tool.bullets.visible= false;
    this.other_tool.bullets.visible= false;
  },
  
  gotoStateB: function () {

        this.game.state.start('StateB',this.score);

    }
  
  
  
  };
  
 




















































  Game5.StateB = function (game,score) {

    this. bouncy;
  this.text;
  this.score= score;
  this.points;
  this.level;
  this.game_over= false;
  this.good_guy;
  this.other_guy;
  this.other_guy1;
  this.other_guys= 2;
  this.background;
  this.keys;
  this.space;
  this.tool;
  this.other_tool;
  this.other_tool1;
  this.bullets;
  this.bullet;
  this.bullet_time= 0;
  this.win_text;
  this.laser;

};





//This is State B
Game5.StateB.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    this.load.image( 'good_guy', 'assets/good_guy.png' );
    this.load.image( 'other_guy', 'assets/other_guy.png' );
    this.load.image( 'bullet', 'assets/bullet.png' );
    this.load.image( 'other_bullet', 'assets/other_bullet.png' );
    this.load.image( 'background', 'assets/background1.jpg' );
    this.load.audio('laser', 'assets/laser.wav');
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.add.tileSprite(0, 0, 1000, 600, 'background');
    
    this.good_guy = this.add.sprite(0, 600, 'good_guy' );
    this.other_guy = this.add.sprite(700, 500, 'other_guy');
    this.other_guy1 = this.add.sprite(700, 0, 'other_guy');
    
    //asteriod.anchor.setTo(0.5, 0);
    this.physics.enable(this.good_guy, Phaser.Physics.ARCADE);
    this.physics.enable(this.other_guy, Phaser.Physics.ARCADE);
    this.physics.arcade.enable(this.good_guy);
    this.physics.arcade.enable(this.other_guy);
    this.physics.arcade.enable(this.other_guy1);
    //earth.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.good_guy.body.collideWorldBounds = true;
    //earth.body.bounce.set(1);
    this.other_guy.body.collideWorldBounds = true;
    this.other_guy.body.immovable = true;
    this.other_guy1.body.collideWorldBounds = true;
    this.other_guy1.body.immovable = true;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    this.tool = this.add.weapon(30, 'bullet');
    this.tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    this.tool.bulletSpeed = 450;
    
    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    this.tool.fireRate = 200;
    
    
    
    
    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    this.tool.trackSprite(this.good_guy, 60, 50, true);
    
    
    
    
    this.other_tool = this.add.weapon(30, 'other_bullet');
    this.other_tool.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    this.other_tool.bulletSpeed = -200;
    this.other_tool.fireRate = 300;
    this.other_tool.trackSprite(this.other_guy, 60, 50, true);
    
    
    this.other_tool1 = this.add.weapon(30, 'other_bullet');
    this.other_tool1.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    
    //  The speed at which the bullet is fired
    this.other_tool1.bulletSpeed = -200;
    this.other_tool1.fireRate = 300;
    this.other_tool1.trackSprite(this.other_guy1, 60, 50, true);
    
    this.laser = this.add.audio('laser');
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(0,0,'Score:', style);
    this.level = this.add.text(700,0,'Level: 2', style);
    this.text = this.add.text(this.world.centerX, this.world.centerY, 'Game Over You Loose', style);
    this.text.visible = false;
    this.win_text = this.add.text(this.world.centerX, this.world.centerY, 'Game Over You Win', style);
    this.win_text.visible = false;
  },
  
  
  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.points.text= "Score: "+ this.score;
    if(this.game_over== false){
      this.score+= 1;
      if(Math.random()>.9){
        this.other_tool.fire();
        this.other_tool1.fire();
      }
      
      this.good_guy.body.velocity.x = 0;
      this.good_guy.body.velocity.y = 0;
      
      this.other_guy.body.velocity.x = 0;
      this.other_guy.body.velocity.y = 0;
      
      
      
      this.other_guy1.body.velocity.x = 0;
      this.other_guy1.body.velocity.y = 0;
      
      
      if(Math.random()>.5){
        this.other_guy.body.velocity.y = Math.random()*1000;
        this.other_guy1.body.velocity.y = Math.random()*1000;
      }
      else{
        this.other_guy.body.velocity.y = -(Math.random()*1000);
        this.other_guy1.body.velocity.y = -(Math.random()*1000);
      }
      if (this.keys.left.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.x = -200;
        this.good_guy.scale.x = -1;
      }
      else if (this.keys.right.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.x = 200;
        this.good_guy.scale.x = 1;
      }
      
      if (this.keys.up.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.y = -200;
      }
      else if (this.keys.down.isDown && this.game_over==false)
      {
        this.good_guy.body.velocity.y = 200;
      }
      if (this.space.isDown)
      {
        this.tool.fire();
        this.laser.play();
      }
      
      this.physics.arcade.overlap(this.tool.bullets, this.other_guy, this.bullet_enemy, null, this);
      this.physics.arcade.overlap(this.tool.bullets, this.other_guy1, this.bullet_enemy1, null, this);
      this.physics.arcade.overlap(this.other_tool.bullets, this.good_guy, this.bullet_guy, null, this);
      this.physics.arcade.overlap(this.other_tool1.bullets, this.good_guy, this.bullet_guy, null, this);
    }
  },
  bullet_enemy: function () {
    this.other_guy.kill();
    this.other_tool.bullets.visible= false;
    if(this.other_guys== 0){
    this.win_text.visible = true;
    this.game_over= true;
    this.tool.bullets.visible= false;
    //this.other_tool.bullets.visible= false;
    }
    else{
        this.other_guys+= -1;
        }
  },
  bullet_enemy1: function () {
    this.other_guy1.kill();
    this.other_tool1.bullets.visible= false;
    if(this.other_guys== 0){
    this.win_text.visible = true;
    this.game_over= true;
    this.tool.bullets.visible= false;
    //this.other_tool.bullets.visible= false;
    }
    else{
        this.other_guys+= -1;
        }
  },
  bullet_guy: function () {
    this.good_guy.kill();
    this.text.visible = true;
    this.game_over= true;
    this.tool.bullets.visible= false;
    this.other_tool.bullets.visible= false;
  }
  
  
  
  
  
  };



var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('StateA', Game5.StateA);
game.state.add('StateB', Game5.StateB);
//game.state.add('StateC', Game5.StateC);

game.state.start('StateA');






