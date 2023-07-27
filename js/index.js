var bookmarkNameInput = document.getElementById("bookmarkName");
var bookmarkURLInput =document.getElementById("bookmarkURL");
var addBtn=document.getElementById("submitBtn")
var mainIndex=0;
var bookmarkContainer = [];



if(localStorage.getItem("bookmark")!= null){
    bookmarkContainer = JSON.parse(localStorage.getItem("bookmark"))
    displayData(bookmarkContainer)
}

var nameRegex= /^\w{3,}(\s+\w+)*$/;

function nameValid(){
    if(nameRegex.test(bookmarkNameInput.value)){
        return true;
    }
    else{
        return false;
    }
}

var urlRegex=/^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

function urlValid(){
    if(urlRegex.test(bookmarkURLInput.value)){
        return true;
    }
    else{
        return false;
    }
}

bookmarkNameInput.onkeyup= function(){
    if (urlValid() && nameValid()){
        addBtn.removeAttribute("disabled");
    }
    else{
        addBtn.disabled="true";
    }
}

bookmarkURLInput.onkeyup= function(){
    if (urlValid() && nameValid()){
        addBtn.removeAttribute("disabled");
    }
    else{
        addBtn.disabled="true";
    }
}

function addBookmark (){
    if(addBtn.innerHTML=="Update"){
        addBtn.innerHTML="Submit"
        var bookmark ={

            bookmarkName : bookmarkNameInput.value,
            bookmarkURL : bookmarkURLInput.value
        
            }
            bookmarkContainer.splice(mainIndex,1,bookmark)

    }
    else{
        var bookmark ={

            bookmarkName : bookmarkNameInput.value,
            bookmarkURL : bookmarkURLInput.value
        
            }
            
            bookmarkContainer.push(bookmark)
    }

    addBtn.disabled="true";
    localStorage.setItem("bookmark" , JSON.stringify(bookmarkContainer))
    displayData(bookmarkContainer)
    clear()
}

function displayData(anyArray){
    var cartona ='';

    for(var i=0; i< anyArray.length ;i++){
        cartona+= `
        <tr>
        <td>${i+1}</td>
        <td>${anyArray[i].bookmarkName}</td>
        <td>  <a href="https://${anyArray[i].bookmarkURL}"> <button class="btn btn-sm btn-visit "> <i class="fa-solid fa-eye pe-1"></i> Visit</button> </a> </td>
        <td><button class="btn btn-sm btn-Update" onclick="updateBookmark(${i})"> <i class="fa-solid fa-share pe-1"></i> Update </button></td>
        <td><button class="btn btn-sm btn-Delete" onclick="deleteBookmark(${i})"> <i class="fa-solid fa-trash-can pe-1"></i> Delete </button></td>
        </tr>
        
        `
    }

        document.getElementById("tableContent").innerHTML= cartona

}

function deleteBookmark (bookmark){
        bookmarkContainer.splice(bookmark ,1);
        localStorage.setItem("bookmark" , JSON.stringify(bookmarkContainer))

        displayData(bookmarkContainer);
}

function clear(){
    bookmarkNameInput.value="";
    bookmarkURLInput.value="";
}

function updateBookmark(i){
        bookmarkNameInput.value=bookmarkContainer[i].bookmarkName;
        bookmarkURLInput.value=bookmarkContainer[i]. bookmarkURL ;
        addBtn.innerHTML="Update";
        mainIndex=i;
}

function search(term){
        var termBook=[];

        for(var i=0 ; i<bookmarkContainer.length ;i++){
            if(bookmarkContainer[i].bookmarkName.toLowerCase().includes(term)){
                termBook.push(bookmarkContainer[i]);
            }
        }
displayData(termBook);
}

