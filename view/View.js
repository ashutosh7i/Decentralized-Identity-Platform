/**
 * to do
 * 1.Take user CID, use the stored data on broweser etc.
 * if a list available, first take user key and show all available CID
 * else
 * Step1 take a CID
 * Step2 take a key
 *          decrypt the CID using the key
 *          will get a Base64
 * Step3 give the file back to user, show image, else by default initiate a download.
 *          base64 to file conversion.
 * 
 */


//v2
//form
console.log("Script.js loading")

//loading standard page components
const previousButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const submitButton = document.querySelector('#submit')
const tabTargets = document.querySelectorAll('.tab')
const tabPanels = document.querySelectorAll('.tabpanel')

let page1data1 = document.querySelector('#page1data1')
let page1show1 = document.querySelector("#page1show1")
//let page1SubmitKey = document.querySelector("#page1SubmitKey")
let Step1 = document.querySelector("#Step2")
let page2data1 = document.querySelector("#page2data1")
let page2show1 = document.querySelector("#page2show1")
let page2SubmitKey = document.querySelector("#page2SubmitKey")
let Step2 = document.querySelector("#Step3")
let page3data1 = document.querySelector("#page3data1")
let page3show1 = document.querySelector("#page3show1")
let h3 = document.querySelectorAll("h3");
let page3Result = document.getElementById("page3result");

const isEmpty = (str) => !str.trim().length
let currentStep = 0

var Base64;
var Cyphertext;
var CID;
var Key;

//a function to decrypt the cyphertext
function decryptCiphertext(ciphertext, key) {
    let decrypted = CryptoJS.AES.decrypt(ciphertext, key);
    let result = decrypted.toString(CryptoJS.enc.Utf8);
    return result;
}

// Validate first input on load
validateEntry()

//Step 1
//when cid entered, show the submit button
//selecting all getElementById of page1show1 and hiding them by default
var textarea1 = document.querySelectorAll("#page1show1") //document.getElementById("page1show1");
textarea1[0].style.display = "none";
textarea1[1].style.display = "none";

//page1SubmitKey.style.display = "none" //hide the submit button by default
// page1data1.addEventListener('input', (e) => { //show submit button only when something is present inside input field
//     e.preventDefault()
//     CID = page1data1.value;
//     if (CID !== "") {    //when textbox is not empty 
//         if (CID.length === 59) { //and a valid cid lenght
//             h3[0].innerHTML = '<centre><h3 style="color: green;">Valid CID</h3></centre>'
//             //page1SubmitKey.style.display = "block"
//         }
//         else {
//             //page1SubmitKey.style.display = "none"
//             h3[0].innerHTML = '<centre><h3 style="color: red;">Invalid CID</h3></centre>'
//         }
//     }
//     else {
//         h3[0].innerHTML = '<centre><h3 style="color: black;">Please Enter CID</h3></centre>'
//         validateEntry()
//         //page1SubmitKey.style.display = "none"
//     }
// })

//fetch the cid by username from db
//code for creating a dropdown 
let request = indexedDB.open("mydatabase", 1);
var RetreivedCid;
request.onsuccess = function (event) {
    let db = event.target.result;
    let tx = db.transaction("messages", "readonly");
    let messagesStore = tx.objectStore("messages");
    let index = messagesStore.index("username");

    let getAllRequest = index.getAll(localStorage.Username);

    getAllRequest.onsuccess = function (event) {
        let messages = event.target.result;

        let select = document.getElementById("message-select");
        messages.forEach(function (message) {
            let option = document.createElement("option");
            option.value = message.cid;
            option.text = message.label;
            select.add(option);
        });
        //cid of first by default
        // Print CID of the first message by default
        const firstOptionValue = select.options[0].value;
        const firstMessage = messages.find(function (message) {
            return message.cid === firstOptionValue;
        });
        RetreivedCid = JSON.parse(firstMessage.cid).cid;
        console.log(RetreivedCid);
        //update on change
        select.onchange = function () {
            let selectedValue = select.value;
            let selectedMessage = messages.find(function (message) {
                return message.cid === selectedValue;
            });
            RetreivedCid = JSON.parse(selectedMessage.cid).cid;
            console.log(RetreivedCid);
        };
    };

    getAllRequest.onerror = function (event) {
        console.error("Error retrieving messages from database:", event.target.error);
    };
};

nextButton.addEventListener('click', (event) => {
    event.preventDefault()
    //use api to fetch that cid from server
    const url = `https://gateway.ipfs.io/ipfs/${RetreivedCid}`;

    fetch(url)
        .then(response => response.text())
        .then(text => {
            // perform operations on the downloaded file
            console.log(text);
            Cyphertext = text;
            h3.innerHTML = text;
        })
        .catch(error => console.error(error));

    console.log("next Button Clicked")
    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    tabTargets[currentStep].classList.remove('active')

    // Show next tab
    tabPanels[currentStep + 1].classList.remove('hidden')
    tabTargets[currentStep + 1].classList.add('active')
    currentStep += 1


    //   //When click next on step1-
    //   //converting the file to base64
    //   //creating a div to be shown on second page
    //   //add that item/div to the html list


    //when on step2
    if (currentStep == 1) {


        validateEntry()

        console.log("you are on step2")

        //Step2 
        //when user enters the key
        page2SubmitKey.style.display = "none"
        page2data1.addEventListener('input', (e) => { //show submit button only when something is present inside input field
            e.preventDefault()
            if (page2data1.value !== "") {
                page2SubmitKey.style.display = "block"
                h3[1].innerHTML = '<centre><h3 style="color: black;"></h3></centre>'
            }
            else {
                page2SubmitKey.style.display = "none"
                h3[1].innerHTML = '<centre><h3 style="color: black;">Enter your key</h3></centre>'
                validateEntry()
            }
        })

        //keep the textbox hidden untill submitting
        var textarea2 = document.querySelectorAll("#page2show1") //document.getElementById("page1show1");
        // textarea2[0].style.display = "none";
        // textarea2[1].style.display = "none";
        textarea2[0].style.display = "block";
        textarea2[1].style.display = "block";
        //when submit key pressed
        page2SubmitKey.addEventListener('click', (e) => {
            e.preventDefault();
            Key = page2data1.value;
            console.log("Key Entered");
            console.log(Key);

            //decrypt the base64
            // Base64 = decryptCiphertext(Cyphertext, Key);

            Base64 = CryptoJS.AES.decrypt(Cyphertext, Key).toString(CryptoJS.enc.Utf8);

            console.log(Base64)

            if (Base64 === "") {
                textarea2[0].value = "xxxxxxx- INVALID KEY -xxxxxxx"
                textarea2[0].style.display = "block";
                textarea2[1].style.display = "block";
            }
            else {
                //show the Base64 in textbox
                textarea2[0].value = "~~~~~~~ Valid Key ~~~~~~~\n\n"
                textarea2[0].value += Base64
                textarea2[0].style.display = "block";
                textarea2[1].style.display = "block";
            }

        })
    }
    else if (currentStep == 2) {
        console.log("you are on step3")
        console.log(Base64)
        console.log(Cyphertext)
        console.log(CID)
        console.log(Key)

        //function to convert base64 back to file
        function downloadBase64File(base64Data) {
            const extensionMatch = base64Data.match(/^data:(.+);base64,/);
            const extension = extensionMatch ? `.${extensionMatch[1].split('/')[0]}` : '';
            const contentType = extensionMatch ? extensionMatch[1] : '';
            const decodedData = atob(base64Data.replace(/^data:.+;base64,/, ''));
            const arrayBuffer = new ArrayBuffer(decodedData.length);
            const uint8Array = new Uint8Array(arrayBuffer);
            for (let i = 0; i < decodedData.length; i++) {
                uint8Array[i] = decodedData.charCodeAt(i);
            }
            const blob = new Blob([arrayBuffer], { type: contentType });

            const fileName = `decoded${extension}`;

            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('download', fileName);
            downloadLink.setAttribute('href', URL.createObjectURL(blob));
            downloadLink.click();
        }


        downloadBase64File(Base64);

        //showing the file in the page
        function displayBase64Data(base64String) {
            // Determine the MIME type of the data
            const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];

            // Create an HTML element based on the MIME type
            let element;
            if (mimeType.startsWith('image/')) {
                element = document.createElement('img');
                element.src = base64String;
                element.style.width = '4.7cm';
                element.style.height = '4.7cm';
            } else if (mimeType === 'application/pdf') {
                element = document.createElement('iframe');
                element.src = base64String;
                element.style.width = '7cm';
                element.style.height = '7cm';
            } else {
                element = document.createElement('div');
                element.textContent = atob(base64String.split(',')[1]);
            }

            // Append the element to the document body
            page3Result.appendChild(element);
        }

        displayBase64Data(Base64);




    }

    //   //encode the file to base64---------1
    //     //encode the file to base64
    //   let base64String = fileToBase64(page1data1.files[0])
    //   page1show1.textContent = base64String

    //    //convert base64 to hash using key-------------2
    //    let encryptionKey = page2data1.value
    //    let hash = base64ToEncryption(base64String, encryptionKey)

    //   validateEntry()
    updateStatusDisplay()
})

// Previous: Change UI relative to current step and account for button permissions
previousButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("previous Button Clicked")

    // Hide current tab
    tabPanels[currentStep].classList.add('hidden')
    tabTargets[currentStep].classList.remove('active')

    // Show previous tab
    tabPanels[currentStep - 1].classList.remove('hidden')
    tabTargets[currentStep - 1].classList.add('active')
    currentStep -= 1

    nextButton.removeAttribute('disabled')
    updateStatusDisplay()
})

//submit button
submitButton.addEventListener('click', (event) => {
    event.preventDefault()
    console.log("Completed")
    alert("Redirecting to Home")
    window.location.href = "/";
})

function updateStatusDisplay() {
    // If on the last step, hide the next button and show submit
    if (currentStep === tabTargets.length - 1) {
        nextButton.classList.add('hidden')
        previousButton.classList.remove('hidden')
        submitButton.classList.remove('hidden')
        validateEntry()



        // If it's the first step hide the previous button
    }
    else if (currentStep == 0) {
        nextButton.classList.remove('hidden')
        previousButton.classList.add('hidden')
        submitButton.classList.add('hidden')
        console.log("first step")
        // In all other instances display both buttons
    }
    else {
        nextButton.classList.remove('hidden')
        previousButton.classList.remove('hidden')
        submitButton.classList.add('hidden')
        console.log("second step")
    }
}

function validateEntry() {
    let input = tabPanels[currentStep].querySelector('.form-input')

    // Start but disabling continue button
    nextButton.setAttribute('disabled', true)
    submitButton.setAttribute('disabled', true)

    // Validate on initial function fire
    setButtonPermissions(input)

    // Validate on input
    input.addEventListener('input', () => setButtonPermissions(input))
    // Validate if bluring from input
    input.addEventListener('blur', () => setButtonPermissions(input))
}

function setButtonPermissions(input) {
    if (isEmpty(input.value)) {
        nextButton.setAttribute('disabled', true)
        submitButton.setAttribute('disabled', true)
    }
    else {
        nextButton.removeAttribute('disabled')
        submitButton.removeAttribute('disabled')
    }
}

console.log("Script.js loaded")