"use strict";

var Game5 = {};

var score= 0;









var pong_like= false;
var pong_won= false;
var math_like= false;
var math_score= 0;
var sound;










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
  Game5.State1 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
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





//This is State 1
Game5.State1.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/background.jpg' );
    this.load.image( 'button2', 'assets/button_start.png' );
    game.load.audio('laser', 'assets/background_music.mp3');
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   this.game.add.tileSprite(0, 0, 1000, 600, 'background');
   this.button1 = game.add.button(360, 250, 'button2', this.gotoState2, this);
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(155,100,'In this game you are trying to find the\nman that only is visible sometimes.', style);
    this.level = this.add.text(230,0,'        Man in the dark', style);
    sound = game.add.audio('laser');
    sound.play();
    
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
   
      
     
  },
  
  
  
  gotoState2: function () {

        this.game.state.start('State2', this.score);

    }
  
  
  
  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  Game5.State2 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
  this.background;
  this.player;
  this.other_player;
  this.timer= 0;
  this.timer2= 0;
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





//This is State 2
Game5.State2.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/ball.jpg' );
    this.load.image( 'player', 'assets/player.png' );
    this.load.image( 'other_player', 'assets/other_player.png' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.image(game.world.centerX, 390, 'background').anchor.set(0.5);
   //this.game.add.image(435, 165, 'speech').anchor.set(0.5);
   this.game.stage.backgroundColor = 0x205067;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    this.player = this.game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.other_player = game.add.sprite(game.world.randomX, game.world.randomY, 'other_player');
    this.physics.arcade.enable(this.other_player);
    this.other_player.body.bounce.set(1);
    this.other_player.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.other_player.body.collideWorldBounds = true;
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "16px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(0,0,'Score: ', style);
    this.level = game.add.text(400,0,'Level: 1             Get 100 points to go to Level 2', style);
    //this.level = this.add.text(230,0,'Welcome to your date', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.points.text= 'Score: '+ score;
    this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.timer++;
      this.timer2++;
    if(this.timer%50==0){
        this.other_player.visible= false;
        }
    if(this.timer%80==0){
        this.other_player.visible= true;
        }
    if(this.timer%100==0){
        this.other_player.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
        }
    if(this.other_player.visible == true){
        this.game.physics.arcade.collide(this.player, this.other_player, this.player_and_car_other_1, null, this);
        }
    if(score>=100){
        this.gotoState3();
        }
    if (this.keys.left.isDown)
      {
        this.player.body.velocity.x = -400;
        this.player.scale.x = -1;
        //player.angle= 0;
        
      }
      else if (this.keys.right.isDown)
      {
        this.player.body.velocity.x = 400;
        this.player.scale.x = 1;
        //player.angle= 0;
      }
      
      if (this.keys.up.isDown)
      {
        this.player.body.velocity.y = -400;
        //player.angle= -90;
      }
      else if (this.keys.down.isDown)
      {
        this.player.body.velocity.y = 400;
        //player.angle= 90;
      }
      
     
  },
  
  player_and_car_other_1: function () {
    score+= 10;
    this.other_player.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    },
  
  gotoState3: function () {

        this.game.state.start('State3', this.score);

    },
    gotoState6: function () {

        this.game.state.start('State6', this.score);

    }
  
  
  
  };
  
  
  
  //This is State 3
  Game5.State3 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
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





//This is State 3
Game5.State3.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/background.jpg' );
    this.load.image( 'button2', 'assets/button_start.png' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   this.game.add.tileSprite(0, 0, 1000, 600, 'background');
   this.button1 = game.add.button(360, 250, 'button2', this.gotoState4, this);
    
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    
    
    // Turn on the arcade physics engine for this sprite.2
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(155,100,'                       Level 2', style);
    this.level = this.add.text(230,0,'        Man in the dark', style);
    
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
   
      
     
  },
  
  
  
  gotoState4: function () {

        this.game.state.start('State4', this.score);

    }
  
  
  
  };
 
 
 
 
 Game5.State4 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
  this.background;
  this.player;
  this.other_player;
  this.other_player2;
  this.timer= 0;
  this.timer2= 0;
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





//This is State 4
Game5.State4.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/ball.jpg' );
    this.load.image( 'player', 'assets/player.png' );
    this.load.image( 'other_player', 'assets/other_player.png' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.image(game.world.centerX, 390, 'background').anchor.set(0.5);
   //this.game.add.image(435, 165, 'speech').anchor.set(0.5);
   this.game.stage.backgroundColor = 0x205067;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    this.player = this.game.add.sprite(game.world.centerX, game.world.centerY, 'player');
    this.physics.arcade.enable(this.player);
    this.game.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.other_player = game.add.sprite(game.world.randomX, game.world.randomY, 'other_player');
    this.physics.arcade.enable(this.other_player);
    this.other_player.body.bounce.set(1);
    this.other_player.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.other_player.body.collideWorldBounds = true;
    this.other_player2 = game.add.sprite(game.world.randomX, game.world.randomY, 'other_player');
    this.physics.arcade.enable(this.other_player2);
    this.other_player2.body.bounce.set(1);
    this.other_player2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.other_player2.body.collideWorldBounds = true;
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "16px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(0,0,'Score: ', style);
    this.level = game.add.text(400,0,'Level: 2                            Get 500 points Win', style);
    //this.level = this.add.text(230,0,'Welcome to your date', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.points.text= 'Score: '+ score;
    this.player.body.velocity.x = 0;
      this.player.body.velocity.y = 0;
      this.timer++;
      this.timer2++;
    if(this.timer%50==0){
        this.other_player.visible= false;
        }
    if(this.timer%80==0){
        this.other_player.visible= true;
        }
    if(this.timer%60==0){
        this.other_player2.visible= false;
        }
    if(this.timer%90==0){
        this.other_player2.visible= true;
        }
    if(this.other_player.visible == true){
        this.game.physics.arcade.collide(this.player, this.other_player, this.player_and_car_other_1, null, this);
        }
    if(this.other_player2.visible == true){
        this.game.physics.arcade.collide(this.player, this.other_player2, this.player_and_car_other_2, null, this);
        }
    if(score>500){
        this.gotoState5();
        }
    if (this.keys.left.isDown)
      {
        this.player.body.velocity.x = -400;
        this.player.scale.x = -1;
        //player.angle= 0;
        
      }
      else if (this.keys.right.isDown)
      {
        this.player.body.velocity.x = 400;
        this.player.scale.x = 1;
        //player.angle= 0;
      }
      
      if (this.keys.up.isDown)
      {
        this.player.body.velocity.y = -400;
        //player.angle= -90;
      }
      else if (this.keys.down.isDown)
      {
        this.player.body.velocity.y = 400;
        //player.angle= 90;
      }
      
     
  },
  
  player_and_car_other_1: function () {
    score+= 10;
    this.other_player.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    },
    player_and_car_other_2: function () {
    score+= 10;
    this.other_player2.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    },
  
  gotoState5: function () {

        this.game.state.start('State5', this.score);

    },
    gotoState6: function () {

        this.game.state.start('State6', this.score);

    }
  
  
  
  };
 
 
 
 
 
Game5.State5 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
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





//This is State 5
Game5.State5.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/background.jpg' );
    this.load.image( 'button2', 'assets/button_play.png' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   this.game.add.tileSprite(0, 0, 1000, 600, 'background');
   this.button1 = game.add.button(360, 250, 'button2', this.gotoState1, this);
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(155,100,'Game Over You win\nYou defeated the man trying to get away ', style);
    this.level = this.add.text(230,0,'        Man in the dark', style);
    sound.stop();
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
   score= 0;
      
     
  },
  
  
  
  gotoState1: function () {

        this.game.state.start('State1', this.score);

    }
  
  
  
  };
  
 
 
 
 Game5.State6 = function (game) {

    this. bouncy;
  this.text;
  //this.score= 0;
  this.points;
  this.level;
  this.game_over= false;
  this.yes;
  this.no;
  this.background;
  this.keys;
  this.space;
 

};





//This is State 6
Game5.State6.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'background', 'assets/restaurant_with_people1.jpg' );
    this.load.image( 'speech', 'assets/speech_bubble.png' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.image(game.world.centerX, 390, 'background').anchor.set(0.5);
   this.game.add.image(435, 165, 'speech').anchor.set(0.5);
   this.game.stage.backgroundColor = 0x205067;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    
    
    // Turn on the arcade physics engine for this sprite.
    //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    // Make it bounce off of the world bounds.
    //bouncy.body.collideWorldBounds = true;
    //bounce_earth();
    // Add some text using a CSS style.
    // Center it in X, and position its top 15 pixels from the top of the world.
    var style = { font: "16px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(309,105,'Ok\n Do you like the Math \n(Press Y for yes and N for no)', style);
    //this.level = this.add.text(230,0,'Welcome to your date', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.yes.isDown)
      {
        this.gotoState8();
        math_like= true;
      }
      if (this.no.isDown)
      {
        this.gotoState7();
        math_like= false;
      }
      
     
  },
  
  
  
  gotoState7: function () {

        this.game.state.start('State7', this.score);

    },
    gotoState8: function () {

        this.game.state.start('State8', this.score);

    }
  
  
  
  };
 
 
 
 
 

 
 






var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

game.state.add('State1', Game5.State1);
game.state.add('State2', Game5.State2);
game.state.add('State3', Game5.State3);
game.state.add('State4', Game5.State4);
game.state.add('State5', Game5.State5);
game.state.add('State6', Game5.State6);
game.state.add('State7', Game5.State7);
game.state.add('State8', Game5.State8);
game.state.add('State9', Game5.State9);
game.state.add('State10', Game5.State10);
game.state.add('State11', Game5.State11);
game.state.add('State12', Game5.State12);

game.state.start('State1');






