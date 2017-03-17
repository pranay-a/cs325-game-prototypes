"use strict";

var Game5 = {};

var score= 0;









var pong_like= false;
var pong_won= false;
var math_like= false;
var math_score= 0;











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
    
    this.load.image( 'background', 'assets/restaurant_start.jpg' );
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   this.game.add.tileSprite(0, 0, 1000, 600, 'background');
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
    this.points = this.add.text(155,100,'This game will tell you how \nmuch you are compatible with your date', style);
    this.level = this.add.text(230,0,'Welcome to your date', style);
    this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.space.isDown)
      {
        this.gotoState2();
      }
      
     
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
    this.points = this.add.text(309,120,'Do you like the game pong. \n(Press Y for yes and N for no)', style);
    //this.level = this.add.text(230,0,'Welcome to your date', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.yes.isDown)
      {
        this.gotoState3();
        pong_like= true;
      }
      if (this.no.isDown)
      {
        this.gotoState6();
        pong_like= false;
      }
      
     
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
  this.paddle1;
  this.paddle2;
  this.ball;
  this.start_text;
  this.game1= false;
  this.game2= false;
  this.score1= 0;
  this.score2= 0;
  
  
  
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
    
  this.game.load.image('paddle', 'assets/paddle.png');
  this.game.load.image('ball', 'assets/ball.png');
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
     this.game.physics.startSystem(Phaser.Physics.ARCADE);

    
    this.paddle1 = this.add.sprite(19, game.world.centerY, 'paddle' );
    this.paddle2 = this.add.sprite(game.world.width-19, game.world.centerY, 'paddle');
    //this.paddle1.scale.setTo(0.5,0.5);
    //this.paddle2.scale.setTo(0.5,0.5);
    this.game.stage.backgroundColor = 0x000000;
  
    
    //asteriod.anchor.setTo(0.5, 0);
    this.physics.enable(this.paddle1, Phaser.Physics.ARCADE);
    this.physics.enable(this.paddle2, Phaser.Physics.ARCADE);
    this.physics.arcade.enable(this.paddle1);
    this.physics.arcade.enable(this.paddle2);
   
    //earth.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
    this.paddle1.body.collideWorldBounds = true;
    //earth.body.bounce.set(1);
    this.paddle2.body.collideWorldBounds = true;
    this.paddle1.body.immovable = true;
    this.paddle2.body.immovable = true;
    this.paddle1.anchor.setTo(0.5, 0.5);
    this.paddle2.anchor.setTo(0.5, 0.5);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
 
    
    
    this.ball = game.add.sprite(game.world.centerX, 550, 'ball'); 
    this.ball.anchor.set(0.5);
    this.ball.checkWorldBounds = true;
    
    this.game.physics.enable(this.ball, Phaser.Physics.ARCADE);
    
    this.ball.body.collideWorldBounds = true;
    this.ball.body.bounce.setTo(1,1);
    
    this.ball.events.onOutOfBounds.add(this.ball_out, this);
    this.score1= 0;
  this.score2= 0;
    
    
    
    
    
    
    
    
    
    
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
    var style = { font: "25px Verdana", fill: "#ffffff", align: "center" };
    this.points = this.add.text(0,10,'Score: ', style);
    this.level = this.add.text(690,10,'Score: ', style);
    this.start_text = this.add.text(200, 100, 'Get the score of 3 to win\n\n\n\n\n\n\n\n\n\n(Press the SPACEBAR to start)', style);
    //this.win_text = this.add.text(200, 100, 'Get the score of 3 to win', style);
    
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.points.text= "Score: "+ this.score1;
    this.level.text= "Score: "+ this.score2;
    if((this.score1== 3) || (this.score2== 3)){
        if(this.score2== 3){
            this.gotoState4();
            }
        else if(this.score1== 3){
            pong_won= true;
            this.gotoState5();
            }
        }
        
        
        
        
    if (this.space.isDown && this.game1== false)
    {
      this.ball_go();
      
      
    }
    if(this.ball.body.blocked.left== true){
      this.score2+= 1;
      this.game1= false;
      this.start_text.visible = true;
      this.ball.body.x= game.world.centerX;
      this.ball.body.velocity.y = 0;
      this.ball.body.velocity.x = 0;
      
    }
    else if(this.ball.body.blocked.right== true){
      this.score1+= 1;
      this.game1= false;
      this.start_text.visible = true;
      this.ball.body.x= game.world.centerX;
      this.ball.body.velocity.y = 0;
      this.ball.body.velocity.x = 0;
      
    }
    if (this.keys.up.isDown){
      this.paddle1.body.velocity.y = -300;
    }
    else if(this.keys.down.isDown){
      this.paddle1.body.velocity.y = 300;
    }
    else{
      this.paddle1.body.velocity.y = 0;
    }
    this.paddle2.body.velocity.y = this.ball.body.velocity.y;
    this.paddle2.body.maxVelocity.y= 240;
    
    this.game.physics.arcade.collide(this.paddle1, this.ball);
    this.game.physics.arcade.collide(this.paddle2, this.ball);
      
     
  },
  
  
  
  ball_go: function (){
  if(Math.random()>.5){
    this.ball.body.velocity.y = -350;
    this.ball.body.velocity.x = -350;
    }
    else{
    this.ball.body.velocity.y = 350;
    this.ball.body.velocity.x = 350;
    }
    this.game2= true;
    this.start_text.visible = false;
    
    
  },
  ball_out: function (){
    this.score1+= 1;
   
  
    
  },
  
  
  
  gotoState4: function () {

        this.game.state.start('State4', this.score);

    },
    gotoState5: function () {

        this.game.state.start('State5', this.score);

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
  this.keys;
  this.space;
 

};





//This is State 4
Game5.State4.prototype = {

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
    this.points = this.add.text(309,105,'Nice game, but you lost.\n Do you like the Math. \n(Press Y for yes and N for no)', style);
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
  

};





//This is State 5
Game5.State5.prototype = {

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
    this.points = this.add.text(309,105,'Nice game, you won.\n Do you like the Math.\n(Press Y for yes and N for no)', style);
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
 
 
 
 
 
 
  Game5.State7 = function (game) {

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





//This is State 7
Game5.State7.prototype = {

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
    this.points = this.add.text(350,80,'Ok.\n Ready to find out \nthe compatibility.', style);
    this.level = this.add.text(340,150,'(Press the SPACEBAR \nto find out)', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.space.isDown)
      {
        this.gotoState12();
        
      }
      if (this.no.isDown)
      {
        this.gotoState12();
        
      }
      
     
  },
  
  
  
  gotoState12: function () {

        this.game.state.start('State12', this.score);

    }
    
  
  
  
  };
 
 
 Game5.State8 = function (game) {

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
  this.button1;
  this.button2;
  this.button3;
  this.button4;
  

};






//This is State 8
Game5.State8.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'star', 'assets/star.jpg' );
    this.load.image( 'button2', 'assets/button_2.png' );
    this.load.image( 'button5', 'assets/button_5.png' );
    this.load.image( 'button8', 'assets/button_8.png' );
    this.load.image( 'button9', 'assets/button_9.png' );
   
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.tileSprite(0, 0, 1000, 600, 'star');
   this.button1 = game.add.button(game.world.centerX, 300, 'button2', this.gotoState9, this);
   this.button2 = game.add.button(game.world.centerX, 350, 'button5', this.gotoState9, this);
   this.button3 = game.add.button(game.world.centerX, 400, 'button8', this.correct_gotoState9, this);
   this.button4 = game.add.button(game.world.centerX, 450, 'button9', this.gotoState9, this);
   this.button1.visible = false;
   this.button2.visible = false;
   this.button3.visible = false;
   this.button4.visible = false;
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    

    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(230,105,'Answer these math questions\n (Press the SPACEBAR to start)', style);
    this.level = this.add.text(game.world.centerX- 30,200,'x+2 = 10\n What is x', style);
    this.level.visible = false;
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.space.isDown)
      {
      this.points.visible= false;
      this.level.visible = true;
        this.button1.visible = true;
   this.button2.visible = true;
   this.button3.visible = true;
   this.button4.visible = true;
      }
      
     
  },
  
  
  correct_gotoState9: function () {
        math_score+= 1;
        this.game.state.start('State9', this.score);

    },
  gotoState9: function () {

        this.game.state.start('State9', this.score);

    },
    gotoState8: function () {

        this.game.state.start('State8', this.score);

    }
  
  
  
  };
 
 
 
 
 
 Game5.State9 = function (game) {

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
  this.button1;
  this.button2;
  this.button3;
  this.button4;
  

};






//This is State 9
Game5.State9.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'star', 'assets/star.jpg' );
    this.load.image( 'button-32', 'assets/button_-32.png' );
    this.load.image( 'button-10', 'assets/button_-10.png' );
    this.load.image( 'button-5', 'assets/button_-5.png' );
    this.load.image( 'button-1', 'assets/button_-1.png' );
   
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.tileSprite(0, 0, 1000, 600, 'star');
   this.button1 = game.add.button(game.world.centerX, 300, 'button-32', this.gotoState10, this);
   this.button2 = game.add.button(game.world.centerX, 350, 'button-10', this.gotoState10, this);
   this.button3 = game.add.button(game.world.centerX, 400, 'button-5', this.gotoState10, this);
   this.button4 = game.add.button(game.world.centerX, 450, 'button-1', this.correct_gotoState10, this);
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.yes = game.input.keyboard.addKey(Phaser.Keyboard.Y);
    this.no = game.input.keyboard.addKey(Phaser.Keyboard.N);
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    

    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    //this.points = this.add.text(230,105,'Answer these math questions\n (Press the SPACEBAR to start)', style);
    this.level = this.add.text(350,200,'5x - 6 = 3x - 8\n What is x', style);
  
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    
      
     
  },
  
  
  correct_gotoState10: function () {
        math_score+= 1;
        this.game.state.start('State10', this.score);

    },
  gotoState10: function () {

        this.game.state.start('State10', this.score);

    },
    gotoState8: function () {

        this.game.state.start('State8', this.score);

    }
  
  
  
  };
 
 
 
 Game5.State10 = function (game) {

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
  this.button1;
  this.button2;
  this.button3;
  this.button4;
  

};






//This is State 10
Game5.State10.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'star', 'assets/star.jpg' );
    this.load.image( 'button102', 'assets/button_102.png' );
    this.load.image( 'button108', 'assets/button_108.png' );
    this.load.image( 'button120', 'assets/button_120.png' );
    this.load.image( 'button97', 'assets/button_97.png' );
   
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.tileSprite(0, 0, 1000, 600, 'star');
   this.button1 = game.add.button(game.world.centerX, 300, 'button102', this.correct_gotoState11, this);
   this.button2 = game.add.button(game.world.centerX, 350, 'button108', this.gotoState11, this);
   this.button3 = game.add.button(game.world.centerX, 400, 'button120', this.gotoState11, this);
   this.button4 = game.add.button(game.world.centerX, 450, 'button97', this.gotoState11, this);
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    

    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    //this.points = this.add.text(230,105,'Answer these math questions\n (Press the SPACEBAR to start)', style);
    this.level = this.add.text(300,200,'((8*9)+10+15)+5= ', style);
  
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    
      
     
  },
  
  
  correct_gotoState11: function () {
        math_score+= 1;
        this.game.state.start('State11', this.score);

    },
  gotoState11: function () {

        this.game.state.start('State11', this.score);

    },
    gotoState8: function () {

        this.game.state.start('State8', this.score);

    }
  
  
  
  };
 
 
 
 
  Game5.State11 = function (game) {

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
  this.button1;
  this.button2;
  this.button3;
  this.button4;
  

};






//This is State 11
Game5.State11.prototype = {

  preload: function () {
    // Load an image and call it 'logo'.
    
    this.load.image( 'star', 'assets/star.jpg' );
   
   
    
  },
  
  
  create: function () {
    // Create a sprite at the center of the screen using the 'logo' image.
   //this.game.add.tileSprite(0, 0, 800, 600, 'background');
   this.game.add.tileSprite(0, 0, 1000, 600, 'star');
 
    this.keys = this.input.keyboard.createCursorKeys();
    this.space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
   
    // Anchor the sprite at its center, as opposed to its top-left corner.
    // so it will be truly centered.
    //bouncy.anchor.setTo( 0.5, 0.5 );
    

    var style = { font: "25px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(100,300,'(Press the SPACEBAR to find out the compatibility)', style);
    this.level = this.add.text(200,200,'Number of correct answers:  ', style);
  
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    this.level.text= "Number of correct answers: "+ math_score+'/3';
      if (this.space.isDown)
      {
      this.gotoState12();
      }
     
  },
  
  
  correct_gotoState11: function () {
        math_score+= 1;
        this.game.state.start('State11', this.score);

    },
  gotoState12: function () {

        this.game.state.start('State12', this.score);

    },
    gotoState8: function () {

        this.game.state.start('State8', this.score);

    }
  
  
  
  };
 

Game5.State12 = function (game) {

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





//This is State 12
Game5.State12.prototype = {

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
    var total= 0;
    if(pong_like== true){
        total+= 1;
        }
    if(pong_won== true){
        total+= 1;
        }
    if(math_like== true){
        total+= 1;
        }
    total+= math_score;
    var total1= total/6.0;
    total1= total1*100;
    total1= total1.toFixed(0);
    var style = { font: "16px Verdana", fill: "#000000", align: "center" };
    this.points = this.add.text(312,115,'There is a '+total1+'% compatibility' , style);
    this.level = this.add.text(309,150,'(Press the SPACEBAR to \ntry again)', style);
    //this.win_text = this.add.text(200, 500, '(Press the SPACEBAR to continue)', style);
   
  },
  

  update: function () {
    // Accelerate the 'logo' sprite towards the cursor,
    // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
    // in X or Y.
    if (this.space.isDown)
      {
        this.gotoState2();
        pong_like= false;
        pong_won= false;
        math_like= false;
        math_score= 0;
      }
      if (this.no.isDown)
      {
        this.gotoState2();
        pong_like= false;
        pong_won= false;
        math_like= false;
        math_score= 0;
      }
      
     
  },
  
  
  
  gotoState2: function () {

        this.game.state.start('State2', this.score);

    },
    gotoState6: function () {

        this.game.state.start('State6', this.score);

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






