var wrapper = document.getElementById('wrapper');
var title = document.getElementById('songTitle');
var add = document.getElementById('add');
var userSongName = document.getElementById('userSongName');
var userSongUrl = document.getElementById('userSongPath');
var songList = document.getElementById('songList');
var list = document.getElementById('list');
class JukeBox{
	constructor(){
		this.playlist = [];
		this.index = 0;
		this.shuffleOn = false;
	}
	playSong(){
		if(this.shuffleOn == true){
			this.shuffleSong();
		}

		if(this.playlist[this.index].url.play()==false){
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
		if(this.index<this.playlist.length-1){;
			this.index++;
			this.playSong();
		}else{
			this.index = 0;
			this.playSong();
		}
	
	}
	shuffleSong(){
		this.index = Math.round(Math.random()*this.playlist.length-1);
		this.shuffleOn = true;
		title.innerHTML = this.playlist[this.index].name;
		this.playSong();
	}
	selectSong(){
		
	}
	addSong(name,url){

			this.playlist.push(new Song(name, url));	

	}
	listsSongs(){
		for(let i= 0; i < this.playlist.length; i++){
			list.innerHTML += ' '+ (i+1) + '.) ' + this.playlist[i].name + "\n ";
		}
		
	}
}

class Song{
	constructor(name, url){
		this.name = name;
		this.url = new Audio(url);
	}
}

var songList = [new Song('Mario','music/SuperMarioBros.mp3'), new Song('Zelda', 'music/ZeldaMedleyPianoMan.mp3')];
var jukebox = new JukeBox();
jukebox.playlist = songList;


add.addEventListener('click', function(){
	jukebox.addSong(userSongName.value, userSongUrl.value);
	userSongName.value = ' ';
	userSongPath.value = ' ';
})
