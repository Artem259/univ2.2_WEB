function save(item){
	let playlistArray = getStoreArray("playlist");
	playlistArray.unshift(item);
	localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlaylist(){
	let playlistArray = getSavedSongs();
	let ul = document.getElementById("playlist");
	if(playlistArray !=null){
		for (let i=0; i<playlistArray.length; i++){
			let li = document.createElement("li");
		    let span = document.createElement("span");
		    span.innerHTML = playlistArray[i];
		    span.className = "li-content";
		    let div = document.createElement("div");
		    div.className = "deleteButton";
		    div.onclick = handleDeleteButtonClick;
		    li.appendChild(div);
		    li.appendChild(span);
		    let ul = document.getElementById("playlist");
		    ul.appendChild(li);
		}
	}
}

function getSavedSongs(){
	return getStoreArray("playlist");
}

function getStoreArray(key){
	let playlistArray = localStorage.getItem(key);
	if(playlistArray == null || playlistArray == ""){
		playlistArray = new Array();
	}
	else{
		playlistArray = JSON.parse(playlistArray);
	}
	return playlistArray;
}