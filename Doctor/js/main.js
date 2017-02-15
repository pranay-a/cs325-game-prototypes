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
        game.load.image( 'background', 'assets/background.jpg' );
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
    
    
    
    
    
    
    
    
    var good_guy;
    var other_guy;
    var background;
    var keys;
    var space;
    var tool;
    var bullets;
    var bullet;
    var bullet_time= 0;
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
    tool.bulletSpeed = 600;

    //  Speed-up the rate of fire, allowing them to shoot 1 bullet every 60ms
    tool.fireRate = 100;

    


    //  Tell the Weapon to track the 'player' Sprite
    //  With no offsets from the position
    //  But the 'true' argument tells the weapon to track sprite rotation
    tool.trackSprite(good_guy, 0, 0, true);
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(30, 'bullet');
    bullets.setAll('anchor.x', 0.5);
    bullets.setAll('anchor.y', 1);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('checkWorldBounds', true);
        
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
       good_guy.body.velocity.x = 0;
    good_guy.body.velocity.y = 0;

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
        
    }
function bullet_fire(){
       if (game.time.now > bullet_time)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstDead(true, good_guy.x + 24 * good_guy.scale.x, good_guy.y + 8, 'bullet');

        if (bullet)
        {
            //  And fire it
            bullet.reset(good_guy.x, good_guy.y + 5); 
            bullet.scale.x = -1;
            bullet.body.velocity.x = 400;
            bullet_time = game.time.now + 200;
        }
    }
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
