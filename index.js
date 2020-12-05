// DOM elements
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const questionCards = document.querySelector('#questionCards');

//Modal pop-ups 
const setupUI = (user) => {
  if (user) {
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
    renderCardsAuth();
  } else {
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
    renderCardsAuth();
  }
};


// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);


});

// Takes JSON retrieved from db-firestore and generates cards based on the information there
function renderCardsAuth()
{
db.collection('questions').get().then(snapshot => {
 
    snapshot.docs.forEach(doc => {
        createQuestionCards(doc);
    });
});
}

//generates cards and injects them into the website.
function createQuestionCards(doc)
{
  // determines like dislike ratio
  let a = doc.data().numLikes;
  let b = doc.data().numDislikes;
  let ratio = a/(a+b);

  //determines Question Tags
  let BTag ="";


  if(doc.data().isBehavioral)
  {
    if (doc.data().isTechnical)
    {
      BTag += "Technical";
    }
    BTag += "Behavioral";
  }
  else if (doc.data().isTechnical)
  {
    BTag += "Technical";
  }
  else
    BTag += "None";

// Question Card Code Block
    var cardBlock = '<div class="genericCard">' +
    '<h2 class="header">'+ doc.data().qHeader + '</h2>' +
    '<div class="card horizontal">' +
      '<div class="card-stacked">' +
        '<div class="card-content">' +
          '<p>' + doc.data().question + '</p>'+
        '</div>'+
        '<div class="card-action">'+
         
        '<p>' + a + '</p>'+
        '<a onclick="incrementUpVote()">' + "UpVote" + '</a>' + 
        '<p>' + b + '</p>'+
        '<a onclick="incrementDownVote()">' + "DownVote" + '</a>' + 
        '<p>' + ratio + '</p>'+
        '<p>' + BTag + '</p>'+
        '<p>' + doc.data().qDate + '</p>'+
          
        '</div>'+
      '</div>' +
    '</div>' +
    '</div>';
    $('#questionCards').append(cardBlock);
}

  /*
<div class="genericCard">
<h2 class="header">Question Title</h2>
<div class="card horizontal">
  <div class="card-stacked">
    <div class="card-content">
      <p>Question Body Here</p>
    </div>
    <div class="card-action">
      <!-- Most of these will be replaced with numbers generated, 
           links are here for reference of general style -->
      <a href="#"> Upvote </a>
      <a href="#"> Downvote </a>
      <a href="#"> Up/Down Ratio </a>
      <a href="#"> Tags </a>
      <a href="#"> Date Posted </a>
      
    </div>
  </div>
</div>
</div>
*/

// possible modal code to add questions
/*
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    

    db.collection('students').add({

       
        name: form.name.value,
        major: form.major.value,
        graduation: form.graduation.value
        
    })
    .then(function(docRef) {
        console.log("Docuument written: ", docRef.id);
    })
    .catch(function(error){
        console.error("Error adding document: ", error);
    });
    console.log("exec");

    let csname = "";
    let csdate = "";
    let csmajor = "";
    let csdatea = "";

    if (csdate == "2020")
    {
        csdatea = "Senior";
    }
   else if (csdate == "2021")
    {
        csdatea = "junior";
    }
    else if (csdate == "2022")
    {
        csdatea = "sophmore";
    }
   else  if (csdate == "2023")
    {
        csdatea = "freshman";
    }
    else
    {
        csdatea = "other"
    }

    
    csname = form.name.value;
    csdate = form.graduation.value;
    csmajor = form.major.value;
   
    form.name.value = '';
    form.major.value = '';
    form.graduation.value = '';

    if (csdatea != "")
    {window.alert("Thanks for submitting your information" + csname +" "+ csdatea +" " + " "+ csmajor)}
    else
    {
        window.alert("Thanks for submitting your information" + csname +" "+ csdate +" " + " "+ csmajor)  
    }
    location.reload();
});
*/



//search fuctions

var $searchContainer = $("#search");
var $contentBoxes = $searchContainer.find("#questionCards");
var $searchInput = $searchContainer.find("#search-input");
$searchInput.on("input", searchQuestions);

function searchQuestions(){
  
  var userInput;
  
  //checks user input

  userInput = $(this).val();
  
  //changes input to lower case to search
  userInput = userInput.toLowerCase();
  
  //loops through all content
  $contentBoxes.each(function(){
   
    var headerText = $(this).find("h2").text();
    var contentText = $(this).find("p").text();
    var searchableContent = headerText + " " + contentText;
        searchableContent = searchableContent.toLowerCase();
    
  //hides whats not entered in input
    if(!searchableContent.includes(userInput)){
      $(this).hide();
    } else {
      $(this).show();
    }

  });

};

