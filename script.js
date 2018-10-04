var title = document.getElementById('songTitle');
var add = document.getElementById('add');
var userSongName = document.getElementById('userSongName');
var userSongUrl = document.getElementById('userSongPath');
var songList = document.getElementById('songList');
var list = document.getElementById('list');
var shuffle = document.getElementById('shuffle');
var musicNote1 = document.getElementById('musicImage1');
var musicNote2 = document.getElementById('musicImage2');
var musicNote3 = document.getElementById('musicImage3');
var play = document.getElementById('play');





class JukeBox{
	constructor(){
		this.playlist = [];
		this.index = 0;
		this.shuffleOn = false;
		this.listOfSong = [];
	}
	playSong(){
		if(	play.innerHTML == "Pause"){
			this.pauseSong();
			play.innerHTML = "Play"
		}else{
			this.playlist[this.index].url.play();
			title.innerHTML = this.playlist[this.index].name;
			play.innerHTML = "Pause"
		}
	}
	pauseSong(){
		this.playlist[this.index].url.pause();
	}
	nextSong(){
		this.playlist[this.index].url.pause();
		this.playlist[this.index].url.currentTime = 0;
		if(this.shuffleOn==true){
			this.index = Math.round(Math.random()*this.playlist.length-1);
		}
		if(this.index<this.playlist.length-1){;
			this.index++;
			play.innerHTML = "Play"
			this.playSong();
		}else{
			this.index = 0;
			play.innerHTML = "Play"
			this.playSong();
		}
	}
	previousSong(){
		this.playlist[this.index].url.pause();
		this.playlist[this.index].url.currentTime = 0;
		if(this.shuffleOn==true){
			this.index = Math.round(Math.random()*this.playlist.length-1);
		}
		if(this.index==0){;
			this.index = this.playlist.length-1;
			play.innerHTML = "Play"
			this.playSong();
		}else{
			this.index--;
			play.innerHTML = "Play"
			this.playSong();
		}
	}
	shuffleSong(){
		if(this.shuffleOn==false){
			this.shuffleOn = true;
			shuffle.innerHTML = 'Shuffle: On.';
		}else{
			this.shuffleOn = false;
			shuffle.innerHTML = 'Shuffle: Off.';
		}
	}
	selectSong(div, num){
		this.index = num;
	}
	addSong(name,url){

			this.playlist.push(new Song(name, url));	

	}
	listsSongs(){
		list.innerHTML = " "
		for(let i= 0; i < this.playlist.length; i++){
			var div = document.createElement('BUTTON');
			div.id = 'songTitles'+i;
			div.style.border = '2px solid';			
			div.innerHTML += ' '+ (i+1) + '.) ' + this.playlist[i].name + "\n  ";
			list.appendChild(div);	
		}
	}
}

class Song{
	constructor(name, url){
		this.name = name;
		this.url = new Audio(url);
	}
}
function anim(){
	musicNote3.style.animationName = "fadeIn";
	musicNote3.style.animationDuration = "7s";
	musicNote3.style.animationIterationCount = "infinite";
	musicNote3.style.animationPlayState = "running";

	musicNote2.style.animationName = "fadeIn";
	musicNote2.style.animationDuration = "10s";
	musicNote2.style.animationIterationCount = "infinite";
	musicNote2.style.animationPlayState = "running";

	musicNote1.style.animationName = "fadeIn";
	musicNote1.style.animationDuration = "15s";
	musicNote1.style.animationIterationCount = "infinite";
	musicNote1.style.animationPlayState = "running";

	title.style.animationPlayState = "running"
}
function stopAnim(){
	musicNote3.style.animationPlayState = "paused";
	musicNote2.style.animationPlayState = "paused";
	musicNote1.style.animationPlayState = "paused";

	title.style.animationPlayState = "paused";
}

var songList = [new Song('Mario','music/SuperMarioBros.mp3'), new Song('Zelda', 'music/ZeldaMedleyPianoMan.mp3'), new Song('Sonic', 'music/GreenHillZoneRemix.mp3'), new Song('Pokemon', 'music/PokemonTheme.mp3')];
var jukebox = new JukeBox();


jukebox.playlist = songList;


add.addEventListener('click', function(){
	jukebox.addSong(userSongName.value, userSongUrl.value);
	userSongName.value = ' ';
	userSongPath.value = ' ';
})


play.addEventListener('click', function(){
		if(play.innerHTML== "Pause"){
			anim();
		}else{
			stopAnim();
		}
	})
next.addEventListener('click', function() {
		if(play.innerHTML== "Pause"){
			anim();
		}else{
			stopAnim();
		}
})
list.addEventListener('click', function(e){
	var check = e.target.id.toString();
	check = check.split('');
	jukebox.pauseSong();
	play.innerHTML = "Play";
	if(check[0]=="s"){
		var number = parseInt(check[check.length-1]);
		jukebox.index = number;
	}jukebox.playSong();
	anim();
})