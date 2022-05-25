function init(){
   let button = document.getElementById("addButton");
   button.onclick = handleAddButtonClick;
   button = document.getElementById("clearAllButton");
   button.onclick = handleClearAllButtonClick;
   loadPlaylist();
}

function handleAddButtonClick(){
   let textInput = document.getElementById("songTextInput");
   let songName = textInput.value;
   if(songName == ""){
      return;
   }
   let li = document.createElement("li");
   let span = document.createElement("span");
   span.innerHTML = songName;
   span.className = "li-content";
   let div = document.createElement("div");
   div.className = "deleteButton";
   div.onclick = handleDeleteButtonClick;
   li.appendChild(div);
   li.appendChild(span);
   let ul = document.getElementById("playlist");
   ul.insertBefore(li, ul.firstChild);
   save(songName);
}

function handleClearAllButtonClick(){
   let ul = document.getElementById("playlist");
   ul.innerHTML = "";
   localStorage.clear();
}

function handleDeleteButtonClick(event){
   let li = event.target.parentElement;
   let text = li.children[1].innerHTML;
   li.parentElement.removeChild(li);

   let playlistArray = getStoreArray("playlist");
   for(let i=0; i<playlistArray.length; i++){
      if(playlistArray[i] == text){
         playlistArray.splice(i, 1);
         break;
      }
   }
   localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

window.onload = init;