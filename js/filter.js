//Problem: There is no input search feature to quickly find a student
//Solution: Add JS to dynamically add a search input field to find all matching students

/* Global Variables --------------------------------*/
var $studentList = $('.student-list');
var $studentDetails = $('.student-details');
var $student = $('.student-item');

/* Main Functions ----------------------------------*/

function appendSearchDiv() {
    //Include search input to look for particular student
    //Add it dynamically to index.html using the format:
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for students...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

//Search button click returns all results that match name or emails which include matching name
function searchButtonClicked() {
    //get text value from input
    $('.student-search button').on('click', function(){
        $('h4').remove();
        searchNames();
    });

    //function call to search studentNames & studentEmails for matching name
}

function searchNames(){
    //Function searches for matching name or email, displays results to the DOM
    var $input = $('.student-search');
    var inputValue = $input[0].firstChild.value;
    var notMatch = true;

    // hides students currently displayed
    $student.slice(0, $student.length).css('display', 'none');

    //Iterate thru DOM to collect all the students
    for (var idx=0; idx < $student.length; idx++){
        if ($student[idx].innerText.includes(inputValue)) {
            //shows only matching students
            $student.slice(idx, idx+1).css('display', 'list-item');
            console.log('Found a match for ' + inputValue + ': ' + $student[idx].childNodes[1].innerText );
            $input[0].childNodes[0].value = '';
            notMatch = false;
        }
    }
    if (notMatch) {
        noMatchesMessage();
    }
}


function noMatchesMessage() {
    //If no matches, then a message in the HTML tells user there are no matches
    var message = '<h4>No matches found.</h4>';
    $student.slice(0, $student.length).css('display', 'none');
    $student.slice(0, 10).css('display', 'list-item');
    $studentList.prepend(message);
    // change input placeholder to 'search again....'
    var $input = $('.student-search');
    $input[0].childNodes[0].placeholder = ('Search again for students');
    $input[0].childNodes[0].value = '';

}



$(document).ready(function(){
    //functions to append content filter elements & functionality to the DOM
    appendSearchDiv();
    searchButtonClicked();
});
