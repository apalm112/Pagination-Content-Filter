//Problem: There is no input search feature to quickly find a student
//Solution: Add JS to dynamically add a search input field to find all matching students

/* Global Variables --------------------------------*/
var $student = $('.student-details');

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
function searchButtonClick() {
    //get text value from input

    //function call to search studentNames & studentEmails for matching name
}

function searchNames(){
    var $input = $('.student-search');
    var inputValue = $input[0].firstChild.value;

    //Iterate thru DOM to collect all the students
    for (var idx=0; idx < $student.length; idx++){
        //console.log($student[idx].childNodes[1].innerText);
        if ($student[idx].childNodes[1].innerText contains inputValue) {
            console.log(inputValue);
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
    //function to append div, input, button to DOM
    appendSearchDiv();

});
