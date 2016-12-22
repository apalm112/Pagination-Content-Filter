//Problem: There is no input search feature to quickly find a student
//Solution: Add JS to dynamically add a search input field to find all matching students

/* Global Variables --------------------------------*/
var $studentDetails = $('.student-details');
var $student = $('.student-item');

/* Main Functions ----------------------------------*/

function appendSearchDiv() {
    //Include search input to look for particular student
    //Add it dynamically to index.html using the format:
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

//Search button click returns all results that match name or emails which include matching name
function searchButtonClicked() {
    //get text value from input
    $('.student-search button').on('click', function(){
        searchNames();
    });

    //function call to search studentNames & studentEmails for matching name
}

function searchNames(){
    var $input = $('.student-search');
    var inputValue = $input[0].firstChild.value;

    // hides all the students
    $student.slice(0, $student.length).css('display', 'none');

    //Iterate thru DOM to collect all the students
    for (var idx=0; idx < $studentDetails.length; idx++){
        if ($studentDetails[idx].innerText.includes(inputValue)) {
            //shows only matching students
            $student.slice(idx, idx+1).css('display', 'list-item');
            console.log('Found a match for ' + inputValue + ': ' + $student[idx].childNodes[1].innerText );
        } else {
            //call function to display msg 'Name not found.'
            // console.log('Name not found.');
        }
    }
}


function searchEmails() {
    var studentEmails = [];

}



function noMatchesMessage() {
    //If no matches, then a message in the HTML tells user there are no matches
}



$(document).ready(function(){
    //functions to append content filter elements & functionality to the DOM
    appendSearchDiv();
    searchButtonClicked();
});
