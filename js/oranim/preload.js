var preloader = function(game){};
 
preloader.prototype = {
    preload: function(){ 
        this.progress = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 30, '',{
             font: '25px', fill: 'white', align: 'center'
        });
        this.progress.anchor.setTo(0.5, 0.5);
        this.game.load.onFileComplete.add(this.fileComplete, this);

        this.add.text(this.game.world.centerX - 37,  this.game.world.centerY - 150, "", {
            font: '18px', fill: 'lightgrey', align: 'center'
        });

        game.load.image('bg', 'assets/oranim/images/bg.png');
        
        game.load.image('box0', 'assets/oranim/images/box1.png');
        game.load.image('box1', 'assets/oranim/images/box2.png');
        game.load.image('box2', 'assets/oranim/images/box3.png');
        game.load.image('box3', 'assets/oranim/images/box4.png');
        game.load.image('box4', 'assets/oranim/images/box5.png');
        game.load.image('box5', 'assets/oranim/images/box6.png');
        
        game.load.image('boxBg', 'assets/oranim/images/boxBg.png');
        
        game.load.image('cat', 'assets/oranim/images/cat.png');
        game.load.image('chicken', 'assets/oranim/images/chicken.png');
        game.load.image('cow', 'assets/oranim/images/cow.png');
        game.load.image('dog', 'assets/oranim/images/dog.png');
        game.load.image('elephant', 'assets/oranim/images/elephant.png');
        game.load.image('monkey', 'assets/oranim/images/monkey.png');
        game.load.image('owl', 'assets/oranim/images/owl.png');
        game.load.image('pig', 'assets/oranim/images/pig.png');
        game.load.image('sheep', 'assets/oranim/images/sheep.png');        
        game.load.image('bear', 'assets/oranim/images/bear.png');        
        game.load.image('penguin', 'assets/oranim/images/penguin.png');        

        game.load.image('tempo', 'assets/oranim/images/metronome.png');
        game.load.image('play', 'assets/oranim/images/play.png');
        
        game.load.image('power_reset', 'assets/oranim/images/power_reset.png');

		game.load.audio('cat', 'assets/oranim/audio/cat.mp3');
		game.load.audio('chicken', 'assets/oranim/audio/chicken.mp3');
		game.load.audio('cow', 'assets/oranim/audio/cow.mp3');
        game.load.audio('dog', 'assets/oranim/audio/dog.mp3');
        game.load.audio('elephant', 'assets/oranim/audio/elephant.mp3');
        game.load.audio('monkey', 'assets/oranim/audio/monkey.mp3');
        game.load.audio('owl', 'assets/oranim/audio/owl.mp3');
        game.load.audio('pig', 'assets/oranim/audio/pig.mp3');
        game.load.audio('sheep', 'assets/oranim/audio/sheep.mp3');
        game.load.audio('bear', 'assets/oranim/audio/bear.mp3');        
        game.load.audio('penguin', 'assets/oranim/audio/penguin.mp3');    
       
        game.load.audio('music', 'assets/oranim/audio/music1.mp3');
        game.load.audio('music2', 'assets/oranim/audio/music2.mp3');
        game.load.audio('music3', 'assets/oranim/audio/music3.mp3');
  
        game.load.audio('clock', 'assets/oranim/audio/clock.mp3');
    },
    
    create: function(){
       game.state.start("Game");
    },
};

preloader.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
    this.progress.text ="";
};
