var game_main = function(game){    
    N_ROWS = 12;
    N_COLUMNS = 3;

    bpm = 120;
    box_n = 0;
    row = 0;
    
    boxes = [];
    boxesBgs = [];
    items = [];
    allKeys = [];
    
    OFF_SET = 19;
    HIGHLIGHT_COLOR = 0xff0000;
    HIGHLIGHT_COLOR2 = 0x0000aa;
    
    chosenItem = null;
};   
 
game_main.prototype = {
    create: function(){
    	loadSounds();
        try{StatusBar.hide;}catch(e){}
        //initAd();
    	
    	bg = game.add.image(0, 0, 'bg');
    	bg.alpha = 0.25;
    	
    	for (x = 0; x < 7; x++){
    		boxBg = game.add.sprite(25 + x * 150, 20, 'boxBg');
    		boxBg.scale.set(1.175, 1.175);
    		boxBg.tint = HIGHLIGHT_COLOR2;
			boxBg.alpha = 0.5;
			
    		boxBg.inputEnabled = true;
    		boxBg.events.onInputDown.add(chooseItem, this);
    		
    		boxesBgs.push(boxBg);
    		
    		sprite = game.add.sprite(50 + x * 150, 50, soundsArray[x].key);

    		items.push(sprite);
    	}
    	
    	for (x = 0; x < soundsArray.length; x++){
    		allKeys[x] = soundsArray[x].key;
    	}

        for (n = 0; n < N_ROWS * N_COLUMNS; n++){
            box = game.add.sprite(0, 0, 'box' + Math.floor(Math.random() * 5));
            box.x = box.width * (n % N_ROWS);
            box.y = (Math.floor(Math.random() * OFF_SET) + box.height) * Math.floor(n / N_ROWS) + 
            Math.floor(Math.random() * OFF_SET + box.height / 1.5) + 100;
			
			box.inputEnabled = true;
			box.events.onInputDown.add(addItem, this);
			
            boxes.push(box);
        }

    	boxTempo = game.add.sprite(1100, 40, 'boxBg');
    	boxTempo.scale.set(1.21, 0.9);
    	boxTempo.tint = 0xffaaff;
        boxTempo.inputEnabled = true;
    	boxTempo.events.onInputDown.add(changeTempo, this);
    	
    	tempoSprite = game.add.sprite(1120, boxTempo.y + 15, 'tempo');
       
        tempoText = game.add.text(1180, boxTempo.y + 25, bpm, {font: '28px', fill: '#6e5443', align: 'center'});

		playBtn = game.add.sprite(1260, 55, 'play');
		playBtn.inputEnabled = true;
		playBtn.events.onInputDown.add(playMusic, this);

        power_reset = game.add.sprite(1375, 15, 'power_reset');
		power_reset.inputEnabled = true;
		power_reset.events.onInputDown.add(function(){
			location.reload();
			if(AdMob) AdMob.showInterstitial();
		}, this);
		power_reset.scale.set(.52, .52);
		
     /*   setTimeout(function(){
        	changeAnimal();
        }, 6000);*/

        getBox();  
        
        musics[0].play();
        musics[1].play();
        musics[2].play();
        
        musics[0].mute = true;
        musics[1].mute = true;
        musics[2].mute = true;
    }
};

function playMusic(){
	if (playBtn.tint == 0xffffff){
		playBtn.tint = 0x00ff00;
		musics[game.rnd.integerInRange(0, musics.length-1)].mute = false;
	}
	else{
		playBtn.tint = 0xffffff;
		for (m = 0; m < musics.length; m++){
			musics[m].mute = true;
		}
	}
}

/*
function changeAnimal(){
	var animalToPop = game.rnd.integerInRange(0, items.length-1);
	var tween = game.add.tween(items[animalToPop]).to( { alpha: 0 }, 240, "Linear", true);
		
	var itemsKeys = [];
	
	for (x = 0; x < items.length; x++){
		itemsKeys[x] = items[x].key;	
	}
	
	var unusedKeys = allKeys.filter(function(el) {
		return itemsKeys.indexOf(el) < 0;
	});
	
	var spriteKey = unusedKeys[game.rnd.integerInRange(0, unusedKeys.length-1)];

	var sprite = game.add.sprite(50 + animalToPop * 150, 50, spriteKey);
	sprite.scale.set(.35, .35);
	sprite.alpha = 0;

	items.splice(animalToPop, 1, sprite);

	tween.onComplete.add(function(){
	    var tween2 = game.add.tween(sprite).to({ alpha: 1}, 240, "Linear", true);
	});

    setTimeout(function(){
    	changeAnimal();
    }, 6000);
}*/

function changeTempo(){
 	resetBpmChange = false;
	
	if (bpm < 200){
		bpm += 40;	
	}
	else{
		bpm = 40;
	}
	
	tempoText.text = bpm;
	
	setTimeout(function(){
		resetBpmChange = true;
	}, 500);
	
	clockSfx.play();
	
	tempoSprite.tint = 0xff0000;
	setTimeout(function(){ tempoSprite.tint = 0xffffff; }, 500);
}

function chooseItem(_this){
	var indexItem = boxesBgs.indexOf(_this);
	chosenItem = items[indexItem];

	for (x = 0; x < 7; x++){
		if (items[x] != chosenItem){
			items[x].tint = 0xffffff;
			boxesBgs[x].tint = HIGHLIGHT_COLOR2;
			items[x].scale.set(1, 1);
			boxesBgs[x].alpha = 0.5;
		}
		else{
			items[x].tint = 0xf0f077;
			boxesBgs[x].tint = 0xffffff * Math.random();
			items[x].scale.set(1.03, 1.03);
			boxesBgs[x].alpha = 1;
		}
	}
}

function addItem(_this){	
	if (chosenItem != null){	
		if (_this.children < 1){ // no children
			var sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
			sprite.scale.set(.8, .8);
			
			sprite.alpha = 0;
			game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
	
			sprite.x = _this.width / 2 - sprite.width / 2;
			sprite.y = _this.height / 2 - sprite.height / 2;
			
			//soundsArray[items.indexOf(chosenItem)].play();
		}
		
		else{
			if (_this.children[0].key == soundsArray[items.indexOf(chosenItem)].key){ // same child - delete
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				game.add.tween(_this).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.destroy();
					
					boxes[index] = game.add.sprite(x, y, 'box' + Math.floor(Math.random() * 5));	
					boxes[index].alpha = 0;
					
					boxes[index].inputEnabled = true;
					boxes[index].events.onInputDown.add(addItem, _this);
		
					game.add.tween(boxes[index]).to( { alpha: 1 }, 240, "Linear", true);
				});
			}	
			
			else{ // different child - replace
				var x = _this.x;
				var y = _this.y;
				var index = boxes.indexOf(_this);
				
				var tween = game.add.tween(_this.children[0]).to( { alpha: 0 }, 240, "Linear", true);
				
				tween.onComplete.add(function(){
					_this.children[0].destroy();
					
					sprite = _this.addChild(game.make.sprite(0, 0, chosenItem.key));
					sprite.scale.set(.8, .8);
					
					sprite.alpha = 0;
					game.add.tween(sprite).to( { alpha: 1 }, 240, "Linear", true);
			
					sprite.x = _this.width / 2 - sprite.width / 2;
					sprite.y = _this.height / 2 - sprite.height / 2;
					
					soundsArray[items.indexOf(chosenItem)].play();
				});
			}
		}
	}
}

function getBox(){
	var keyObjects = [];
	
    for (n = 0; n < boxes.length; n++){
        if (n % N_ROWS == box_n){
        	row = n;
            boxes[n].tint = HIGHLIGHT_COLOR;
            boxes[n].scale.set(1.01, 1.01);
        	boxes[n].alpha = 1;

            for (x = 0; x < boxes[n].children.length; x++){
                keyObjects.push(boxes[n].children[x].key);
            }
        }
        else{
            boxes[n].tint = 0xffffff;
            boxes[n].scale.set(1, 1);
            if (n % 4 == 0){
            	boxes[n].alpha = 1;
            	boxes[n].tint = 0xff0ff0;
            }
            else{
            	boxes[n].alpha = 0.6;
            }
        }
    }
    
    play_sounds(keyObjects);
    
    if (box_n < (N_ROWS - 1)) box_n++;
    else { box_n = 0; }; 
    
    setTimeout(function(){
        getBox();
    }, 60000 / bpm);
}

function play_sounds(_keys){
	for (x = 0; x < _keys.length; x++){
		for (s = 0; s < soundsArray.length; s++){
			if (_keys[x] == soundsArray[s].key){
				soundsArray[s].play();
			}
		}
	}
}

function loadSounds(){
	cowSfx = game.add.audio('cow', 0.6, false);
	elephantSfx = game.add.audio('elephant', 0.7, false);
	sheepSfx = game.add.audio('sheep', 0.6, false);
	catSfx = game.add.audio('cat', 0.8, false);
	dogSfx = game.add.audio('dog', 0.8, false);
	monkeySfx = game.add.audio('monkey', 0.8, false);
	pigSfx = game.add.audio('pig', 0.8, false);
	chickenSfx = game.add.audio('chicken', 0.9, false);
	owlSfx = game.add.audio('owl', 1, false);
	penguinSfx = game.add.audio('penguin', 0.9, false);
	bearSfx = game.add.audio('bear', 0.8, false);

	clockSfx = game.add.audio('clock', 0.7, false);
	
	musicSfx = game.add.audio('music', 1, true);
	music2Sfx = game.add.audio('music2', 1, true);
	music3Sfx = game.add.audio('music3', 1, true);
	
	musics = [musicSfx, music2Sfx, music3Sfx];
        
	soundsArray = [
		catSfx, chickenSfx, cowSfx, dogSfx, elephantSfx, monkeySfx, owlSfx, pigSfx, sheepSfx, penguinSfx, bearSfx
	];
	
	shuffle(soundsArray);
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
  }
  return array;
}

function initAd(){
	admobid = {
    	banner: 'ca-app-pub-9795366520625065/9819363393',
    	interstitial: 'ca-app-pub-9795366520625065/3728597762'
    };
    
    if(AdMob) AdMob.createBanner({
	    adId: admobid.banner,
	    position: AdMob.AD_POSITION.BOTTOM_CENTER,
    	autoShow: true
	});
	
	if(AdMob) AdMob.prepareInterstitial( {adId:admobid.interstitial, autoShow:false} );
}