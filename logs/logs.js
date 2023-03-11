//selecting all of the required elements
const page1data1 = document.querySelector("#page1data1")
const page1SubmitKey = document.querySelector(".btn-submit")
const page1copy1 = document.querySelectorAll("#page1copy1")
const page1show1 = document.querySelector("#page1show1")
const btnRight = document.querySelector(".btnRight")

// //a Super useful function that converts bytes to Size
// function bytesToSize(bytes) {
//     var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
//     if (bytes == 0) return 'n/a';
//     var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
//     if (i == 0) return bytes + ' ' + sizes[i];
//     return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
// };
// //console.log(bytesToSize(108)) =>108 Bytes ;  //console.log(bytesToSize(1123233222)); => 1.0 GB

// //hiding the submit button by default
// page1SubmitKey.style.display = "none";
// //showing the submit button only when something entered in the field
// page1data1.addEventListener("input", (e) => {
//     e.preventDefault()
//     if(page1data1.value !== ""){
//         page1SubmitKey.style.display = "block"
//     }
//     else{
//         page1SubmitKey.style.display = "none"
//     }
// })

// //hiding the textfield and copy button by default
// page1copy1[0].style.display="none"
// page1copy1[1].style.display="none"

// //and the view button
// btnRight.style.display="none"
// btnRight.addEventListener("click",(e) => {
//     console.log("button clicked")
//     window.location = "http://www.w3schools.com";
// })

// //if cid is submitted
// page1SubmitKey.addEventListener("click", (e) => {
//     e.preventDefault()
//     //console.log(page1data1.value) //logs the input CID

//     //using js fetch to get response from api
//     var requestOptions = {
//         method: 'GET',
//         redirect: 'follow'
//       };
      
//       fetch(`https://api.web3.storage/status/${page1data1.value}`, requestOptions)
//         .then(response => response.text())
//         .then(result => {
//             //if CID is valid

//             //console.log(result);    //logs response

//             //parse json as a string
//             let obj = JSON.parse(result)
//             //take values from it like this
//             let dCID =  obj.cid;
//             let dSize = bytesToSize(obj.dagSize);
//             let dCreated = (moment(obj.created).format('llll'))    //see at bottom
//             let dPeer = obj.pins[0].peerName;
//             let dPeerId = obj.pins[0].peerId;

//             //showing Json response on webpage
//             const NewDiv = document.createElement('div');
//             NewDiv.innerHTML = `<centre><span class="title">CID Details-</span></centre><br><p><span class="bold">CID:</span> ${dCID}<br><span class="bold">Size:</span> ${dSize}<br><span class="bold">Created:</span> ${dCreated}<br><span class="bold">Peer:</span> ${dPeer}<br><span class="bold">PeerId:</span> ${dPeerId}<p>`;
//             //NewDiv.innerHTML = JSON.stringify(result)
//             NewDiv.classList.add('list-item');
//             page1show1.appendChild(NewDiv);

//             //append that in the textarea
//             let output= `CID: ${dCID} \n Size: ${dSize} \n Created: ${dCreated} \n Peer: ${dPeer} \n PeerId: ${dPeerId}`;

//             page1copy1[0].value = output
//             page1copy1[0].style.display="block"
//             page1copy1[1].style.display="block"

//             console.table(result);

//             //making the view button visible
//             btnRight.style.display="block"

//         })
//         .catch(error => console.log('error', error));

//         //after click disable the submit button for prevention
//         page1SubmitKey.style.display = "none"

//         //if user edits the CID again, refresh the page
//         page1data1.addEventListener("input",(e) => {
//             location.reload()
//         })
// })


// // let str = '2018-07-30T15:01:13Z';
// // let date = moment(str);
// // console.log(date.format('llll'));
// //(moment(obj.created).format('llll'))