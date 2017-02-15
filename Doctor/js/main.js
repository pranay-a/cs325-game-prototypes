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
        game.load.image( 'asteriod', 'assets/Earth.png' );
        game.load.image( 'earth', 'assets/asteroid.png' );
        game.load.image( 'stars', 'assets/stars.png' );
    }
    
    var bouncy;
    var earth;
    var asteriod;
    var stars;
    var earth_asteriod = false;
    var text;
    var score= 0;
    var points;
    var game_over= false;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.tileSprite(0, 0, 1000, 600, 'stars');
        
        earth = game.add.sprite( game.world.centerX, 100, 'earth' );
        asteriod = game.add.sprite(game.world.centerX, 500, 'asteriod');
        
        
        asteriod.anchor.setTo(0.5, 0);
        game.physics.enable(asteriod, Phaser.Physics.ARCADE);
        game.physics.enable(earth, Phaser.Physics.ARCADE);
        earth.body.velocity.setTo(Math.random()*800,(-Math.random()*800)+100);
        earth.body.collideWorldBounds = true;
        earth.body.bounce.set(1);
        asteriod.body.collideWorldBounds = true;
        asteriod.body.immovable = true;
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
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        points = game.add.text(0,0,'Score:', style);
        text = game.add.text(game.world.centerX, game.world.centerY, 'Game Over', style);
		text.visible = false;
    }
    
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        points.text= "Score: "+ score;
        if(game_over== false){
		score+= 1;
		}
        asteriod.x = game.input.x;

    if (asteriod.x < 28)
    {
        asteriod.x = 28;
    }
    else if (asteriod.x > game.width - 28)
    {
        asteriod.x = game.width - 28;
    }
    game.physics.arcade.overlap(earth, asteriod, astriod_on_earth, null, this);
        
    }
function astriod_on_earth(asteriod,earth){
    asteriod.kill();
    earth.kill();
    text.visible = true;
    game_over= true;
    }
 

    
};




































































/*window.onload = function() {
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
        game.load.image( 'earth', 'assets/Earth.png' );
        game.load.image( 'asteriod', 'assets/asteroid.png' );
    }
    
    var earth;
    var asteriod;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        earth = game.add.sprite( game.world.centerX, game.world.centerY, 'earth' );
        asteriod = game.add.sprite( game.world.centerX, game.world.centerY, 'asteriod' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        earth.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        earth.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
        
        
       /* asteriod.body.velocity.x = 0;
		asteriod.body.velocity.y = 0;
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        asteriod.body.velocity.x = -200;
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        asteriod.body.velocity.x = 200;
        
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        asteriod.body.velocity.y = 200;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        asteriod.body.velocity.y = -200;
    }
    else{
        asteriod.body.velocity.x = 0;
		asteriod.body.velocity.y = 0;
		}
    
    }
};*/
