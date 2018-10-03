var wrapper = document.getElementById('wrapper');
var title = document.getElementById('songTitle');
var add = document.getElementById('add');
var userSongName = document.getElementById('userSongName');
var userSongUrl = document.getElementById('userSongPath');
var songList = document.getElementById('songList');
var list = document.getElementById('list');
var shuffle = document.getElementById('isShuffleOn');
class JukeBox{
	constructor(){
		this.playlist = [];
		this.index = 0;
		this.shuffleOn = false;
		this.listOfSong = [];
	}
	playSong(){
		if(	this.playlist[this.index].url.play()==true){
			this.pauseSong();
		}else{
			this.playlist[this.index].url.play();
			title.innerHTML = this.playlist[this.index].name;
		}
	}
	pauseSong(){
		if(this.playlist[this.index].url.pause()==false){
			this.playlist[this.index].url.pause();
		}
	}
	nextSong(){
		this.playlist[this.index].url.pause();
		this.playlist[this.index].url.currentTime = 0;
		if(this.shuffleOn==true){
			this.index = Math.round(Math.random()*this.playlist.length-1);
		}
		if(this.index<this.playlist.length-1){;
			this.index++;
			this.playSong();
		}else{
			this.index = 0;
			this.playSong();
		}
	}
	shuffleSong(){
		if(this.shuffleOn==false){
			this.shuffleOn = true;
			shuffle.innerHTML = 'Shuffle is now: On.';
		}else{
			this.shuffleOn = false;
			shuffle.innerHTML = 'Shuffle is now: Off.';
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

var songList = [new Song('Mario','music/SuperMarioBros.mp3'), new Song('Zelda', 'music/ZeldaMedleyPianoMan.mp3'), new Song('Sonic', 'music/GreenHillZoneRemix.mp3'), new Song('Pokemon', 'music/PokemonTheme.mp3')];
var jukebox = new JukeBox();


jukebox.playlist = songList;


add.addEventListener('click', function(){
	jukebox.addSong(userSongName.value, userSongUrl.value);
	userSongName.value = ' ';
	userSongPath.value = ' ';
})


list.addEventListener('click', function(e){
	var check = e.target.id.toString();
	check = check.split('');
	var passOrFail = false;
	if(check[0]=="s"){
		var number = parseInt(check[check.length-1]);
		jukebox.index = number;
	}jukebox.playSong();
})