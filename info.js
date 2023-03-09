//selecting all of the required elements
const page1data1 = document.querySelector("#page1data1")
const page1SubmitKey = document.querySelector(".btn-submit")
const page1copy1 = document.querySelector("#page1copy1")
const page1show1 = document.querySelector("#page1show1")

//hiding the submit button by default
page1SubmitKey.style.display = "none";
//showing the submit button only when something entered in the field
page1data1.addEventListener("input", (e) => {
    e.preventDefault()
    if(page1data1.value !== ""){
        page1SubmitKey.style.display = "block"
    }
    else{
        page1SubmitKey.style.display = "none"
    }
})

//if cid is submitted
page1SubmitKey.addEventListener("click", (e) => {
    e.preventDefault()
    console.log(page1data1.value)

    //using js fetch to get response from api
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch(`https://api.web3.storage/status/${page1data1.value}`, requestOptions)
        .then(response => response.text())
        .then(result => {
            console.log(result);
            //append that in the textarea
            page1copy1.value = result
            //console.log(JSON.stringify(result));

            //showing Json response on webpage
            const NewDiv = document.createElement('div');
            // NewDiv.innerHTML = '<centre><h1 style="color: #57f309; border: #f34709;">File Uploaded to IPFS✅</h1>';
            NewDiv.innerHTML = JSON.stringify(result)
            NewDiv.classList.add('list-item');
            page1show1.appendChild(NewDiv);
        })
        .catch(error => console.log('error', error));


})