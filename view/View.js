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
let page1SubmitKey = document.querySelector("#page1SubmitKey")
let Step1 = document.querySelector("#Step2")
let page2data1 = document.querySelector("#page2data1")
let page2show1 = document.querySelector("#page2show1")
let page2SubmitKey = document.querySelector("#page2SubmitKey")
let Step2 = document.querySelector("#Step3")
let page3data1 = document.querySelector("#page3data1")
let page3show1 = document.querySelector("#page3show1")
let page3show2 = document.querySelector("#page3show2")

const isEmpty = (str) => !str.trim().length
let currentStep = 0

var Base64;
var Cyphertext;
var CID;

//function to encode a file to base64
function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
}

// Validate first input on load
validateEntry()

//Step 1
//when cid entered, show the submit button
//selecting all getElementById of page1show1 and hiding them by default
var textarea1 = document.querySelectorAll("#page1show1") //document.getElementById("page1show1");
textarea1[0].style.display = "none";
textarea1[1].style.display = "none";

page1SubmitKey.style.display = "none" //hide the submit button by default
page1data1.addEventListener('input', (e) => { //show submit button only when something is present inside input field
    e.preventDefault()
    if (page1data1.value !== "") {
        page1SubmitKey.style.display = "block"

    }
    else {
        validateEntry()
        page1SubmitKey.style.display = "none"
    }
})



// Next: Change UI relative to current step and account for button permissions
nextButton.addEventListener('click', (event) => {
   event.preventDefault()

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
        page2SubmitKey.style.display = "none" //hide the submit button by default
        page2data1.addEventListener('input', (e) => { //show submit button only when something is present inside input field
            e.preventDefault()
            if (page2data1.value !== "") {
                page2SubmitKey.style.display = "block"

            }
            else {
                validateEntry()
                page2SubmitKey.style.display = "none"
            }
        })

      //keep the textbox hidden untill submitting
      var textarea2 = document.querySelectorAll("#page2show1") //document.getElementById("page1show1");
      textarea2[0].style.display = "none";
      textarea2[1].style.display = "none";

      //when submit key pressed
        page2SubmitKey.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Key Entered");
            console.log(page2data1.value);
            //encrypt the base64 with the key
            var encryptedBase64 = CryptoJS.AES.encrypt(textarea1[0].value, page2data1.value); //CryptoJS.AES.encrypt(Base64,page2data1.value);
            console.log(encryptedBase64)
            Cyphertext = encryptedBase64
            //show the cyphertext in textbox
            textarea2[0].value = encryptedBase64
            textarea2[0].style.display = "block";
            textarea2[1].style.display = "block";


        })
    }
    else if (currentStep == 2) {
        console.log("you are on step3")
        console.log(Cyphertext)

        //hiding the textarea and copy button on step3 by default
        var textarea3 = document.querySelectorAll("#page3show1") //document.getElementById("page1show1");
        textarea3[0].style.display = "none";
        textarea3[1].style.display = "none";

        //js for step3 slider
        let confirM = document.querySelector("#confirm")
        let deleteNotice = document.querySelectorAll(".notice")
        confirM.addEventListener('change', (e) => {
            e.preventDefault()
            //console.log(confirM.value)
            if (confirM.value > 99) {
            confirM.style.display = "none";
            deleteNotice[0].style.display = "block";


            //upload the file to IPFS
            var myHeaders = new Headers();
            myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFCN2Q5RTk4Qzg1Njc4MWVhRDJEMzBBNjkzYkU0NjgzM2E0Mjg1QjciLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2Nzc3NDMxOTI3OTIsIm5hbWUiOiJESVMifQ.B-zCBx7XBk-5KVDyL-Vgdk1T2zOuBQ3b7QMfPTDRc-M");
            myHeaders.append("Content-Type", "text/plain");

            var requestOptions = {
               method: 'POST',
               headers: myHeaders,
               body: Cyphertext,
               redirect: 'follow'
            };

            fetch("https://api.web3.storage/upload", requestOptions)
                .then(response => response.text())
                // .then(result => console.log(result) )
                .then(result => {
                    CID = result;
                })
                .then(() => {
                    //parsing only cid from response
                    let json_cid = JSON.parse(CID)
                    var onlyCid = json_cid.cid
                    console.log(onlyCid) 
                    alert("File Uploaded Successfully\nCID=\n"+onlyCid)

                    //show the cyphertext in textbox
                    textarea3[0].value = onlyCid
                    textarea3[0].style.display = "block";
                    textarea3[1].style.display = "block";
                    //showing success on webpage
                    const NewDiv = document.createElement('div');
                    NewDiv.innerHTML = '<centre><h1 style="color: #57f309; border: #f34709;">File Uploaded to IPFS✅</h1>';
                    NewDiv.classList.add('list-item');
                    page3show2.appendChild(NewDiv);
                    
                })
                .catch(error => {
                    const NewDiv = document.createElement('div');
                    // NewDiv.innerHTML = '<centre><h1 style="color: #57f309; border: #f34709;">Failed</h1>';
                    NewDiv.innerText = error;
                    NewDiv.classList.add('list-item');
                    page3show2.appendChild(NewDiv);
                });
            }
        })


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