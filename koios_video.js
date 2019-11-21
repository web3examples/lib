// <script src='https://raw.githubusercontent.com/web3examples/lib/master/koios_video.js'></script>  
// <script src='https://web3examples.com/lib/koios_video.js'></script>  

var loadScriptAsync = function(uri){
  return new Promise((resolve, reject) => {
    var tag = document.createElement('script');
    tag.src = uri;
    tag.async = true;
    tag.onload = () => {
      resolve();
    };
  //var firstScriptTag = document.getElementsByTagName('script')[0];
  //firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
  document.head.appendChild(tag);
  
});
}

function LinkButton(nameButton,funct) {
    console.log(`Linking button ${nameButton}`);
    console.log(funct);
    var button=document.getElementById(nameButton);
    console.log(button);
    button.addEventListener("click", (event) => {
        console.log(`Button pressed: ${nameButton}`);
        event.preventDefault();
        funct();
    });
}


           
function generateTableHead(table, data) {
    
    console.log(data);
    
  let thead = table.createTHead();
  let row = thead.insertRow();
  for (let key in data) {
    let th = document.createElement("th");
    th.style.border="1px solid";
    let text = document.createTextNode(key);
    th.appendChild(text);
    row.appendChild(th);
  }
}

function rowclick(event) {  

    var node=event.target    
    var id=node.id;
    if (!id) { node=node.parentNode;id=node.id;}
    if (!id) { node=node.parentNode;id=node.id;} // to handle the "pre"'s
    if (!id) return; // no id found
    var time=Number(alldata[id].start);
    if (isNaN(time)) time=0;
    video.currentTime=time/1000;
    //responsiveVoice.cancel();
    //console.log(alldata[id].text);
    
}

function generateRow(table, sub,rownr) {
let row = table.insertRow();
row.setAttribute("id", rownr.toString());
row.addEventListener("click", rowclick);

  for (key in sub) {
      let cell = row.insertCell();
      cell.style.border="1px solid";
      cell.innerHTML = sub[key];
      //let text = document.createTextNode(sub[key]);
      //cell.appendChild(text);
    }
}

function generateTable(table, data) {
  rownr=0;  
  for (let element of data) {    
    generateRow(table,element, rownr++);
  }
}

function videoerror(event)
{   let error = event;
    if (event.path && event.path[0]) {     // Chrome v60
      error = event.path[0].error;
    }    
    if (event.originalTarget) { // Firefox v55
      error = error.originalTarget.error;
    }
    alert(`Video error: ${error.message}`);     // Here comes the error message
}

function CreateButton(name,funct) {
    var buttonback=document.createElement("button");
    buttonback.innerHTML = name;
    buttonback.addEventListener("click", funct);
    document.body.appendChild(buttonback);
}      
  
  
  var position=document.createElement("p");
document.body.appendChild(position);
    
function VideoLocation() {
    
    position.innerText=`Position: ${video.currentTime.toFixed(0)}`;
    
    var tPlayed=0;
    for (let i=0;i< video.played.length;i++) {
        tPlayed += video.played.end(i) - video.played.start(i);
    }
    position.innerText+=` Played: ${tPlayed.toFixed(0)}`;

    position.innerText+=` (of ${video.duration.toFixed(0)} seconds)`;
    position.innerText+=` speed=${video.playbackRate.toFixed(1)}`;
    
    
    
    function check  (x) { return Number(x.start/1000 >= video.currentTime); } 
    var y= alldata.findIndex(check )  ; 

    if (y >=0  && y != previous_row ) {
        if (previous_row >=0)
            document.getElementById(previous_row.toString()).style.backgroundColor=previous_colour;
        previous_colour=document.getElementById(y.toString()).style.backgroundColor;
        previous_row=y;
        document.getElementById(y.toString()).style.backgroundColor = "lightgray";
        //responsiveVoice.cancel();
        console.log(alldata[y].text);
        StartSpeak(alldata[y].text);   
    }
}   

var video=document.createElement("video");
//video.src="https://siderus.io/ipfs/"+ipfs_element.innerText;
video.src="http://www.gpersoon.com:8080/ipfs/QmdQRYXN8Mmqv8QCH51p6KjRvRkEXUpgGQSFuTPF21fccP"; // +ipfs_element.innerText;
video.class="videoplayer";
video.controls=false;
//video.style.height="200px";
//video.autoplay=true; 
video.muted=true;  // otherwise not playing automatically
//video.ontimeupdate = function() {VideoLocation()}; // call function when movie is at a different location
video.addEventListener('error', videoerror, true);

vp=document.getElementById("videoplayer");
console.log(vp.outerHTML);
vp.appendChild(video);
console.log("videoplayer");
console.log(vp.outerHTML);

var slide=document.createElement("embed");
slide.src="https://ipfs.infura.io/ipfs/QmawzPTovb1LUPGLd7LxKRpynzA6VsqnkCa16EZmkGvjGV#page=1&view=Fit&scrollbar=0"
slide.type="application/pdf" 
slide.width="200px" 
//slide.height="200px"
slide.objectFit="fill";
slide.objectPosition="-250px";
slide.zIndex="2";
document.body.appendChild(slide);


video.addEventListener('timeupdate', (event) => {  // about 4x/second
  //console.log(video.currentTime);
  VideoLocation();
});



var newline=document.createElement("br");
document.body.appendChild(newline);

function startVideo() {
    video.play();
    video.autoplay=true; // so after location change the video continues to play
}

function stopVideo() {
    video.pause();
    StopSpeak();
}


CreateButton("Rewind",          ()=> video.currentTime =0 );
CreateButton("Back 1 sec",      ()=> video.currentTime -=1 );
CreateButton("Forward 1 sec",   ()=> video.currentTime +=1 );
CreateButton("Back 30 sec",     ()=> video.currentTime -=30 );
CreateButton("Forward 30 sec",  ()=> video.currentTime +=30 );
CreateButton("25% slower",      ()=> {video.playbackRate *=0.75;video.play();});
CreateButton("Normal speed",    ()=>{video.playbackRate =1;video.play();} );
CreateButton("25% faster",      ()=> {video.playbackRate *=1.25;video.play();} );
CreateButton("Pause",           stopVideo);
CreateButton("Play",            startVideo); 
CreateButton("Toggle controls", ()=> { video.controls= !video.controls;} );
CreateButton("Toggle audio",    ()=> { video.muted= !video.muted;} );
CreateButton("25% smaller",     ()=> { video.style.height = 0.75 * parseFloat(video.style.height)+"%" } );
CreateButton("25% larger",      ()=> { video.style.height = 1.25 * parseFloat(video.style.height)+"%" } );
CreateButton("Full screen",     ()=> { video.requestFullscreen(); } );
CreateButton("Voice comments",  ()=> { StartSpeak(document.getElementById("explain").innerText); } );
CreateButton("Cancel voice",    ()=> { StopSpeak(); } );

var voices = [];
var synth = window.speechSynthesis;

function StartSpeak(text)
{
   var utterThis = new SpeechSynthesisUtterance(text);
   utterThis.voice = voices[14];
   synth.speak(utterThis);
  // responsiveVoice.speak(text) } 
}

function StopSpeak()
{  synth.cancel();
   //  responsiveVoice.cancel()
}

function populateVoiceList() {
    voices = synth.getVoices();
}
                                      
function InitSpeak()
{ 
  populateVoiceList();
  if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
  }
  // responsiveVoice.setDefaultVoice("Dutch Female");
}

var previous_colour=""
var previous_row=-1;
var table
var tablediv
var alldata=""

async function asyncloaded() {
    console.log("Start koios_video.js");
    //await loadScriptAsync("https://unpkg.com/jquery/dist/jquery.js"); // to debug jquery errors from responsivevoice
    //await loadScriptAsync("https://code.responsivevoice.org/responsivevoice.js?key=djbTj1z0");
    await loadScriptAsync("https://unpkg.com/subtitle/dist/subtitle.bundle.js");
    console.log("Calling LinkButton");
    
    LinkButton("start",startVideo);
    LinkButton("stop",stopVideo);
    
    InitSpeak();
    	    
    var transcript=document.getElementById("transcript").innerText;
    console.log(transcript);
    
    document.getElementById("transcript").hidden=true;
    
    alldata = window.Subtitle.parse(transcript)
    console.log(alldata)
    
    tablediv=document.getElementById("subtitles");
    console.log(tablediv);
    table=document.createElement("table");
    table.style.borderCollapse = "collapse";
    tablediv.appendChild(table)
    document.body.appendChild(tablediv);
    generateTableHead(table,alldata[0]);
    generateTable(table,alldata);

}


 window.addEventListener('load', asyncloaded);  
