/* Content Filter code to dynamically add functionality for student search.*/

/* Global Variables --------------------------------*/
var $studentList = $('.student-list');
var $studentDetails = $('.student-details');
var $student = $('.student-item');

/* Main Functions ----------------------------------*/

function progressiveEnhancement() {
    //
    $student.slice(0, $student.length).css('display', 'none');
}

function appendSearchDiv() {
    //Include search input to look for particular student.
    //Add it dynamically to index.html using the format:
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for students...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

function searchButtonClicked() {
    //Search button click returns all results that match name or emails which include matching name.
    //Get user text value from input.
    $('.student-search button').on('click', function(){
        //Removes the no match found message if it has been appended.
        $('h4').remove();
        //Function call to search for a match.
        searchNames();
    });

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


function searchPaginationLinks() {
    //Calculate the # of pagination links to display based on search results.
    $('button').on('click', function() {
        var highNumber = this.innerHTML * 10;
        var lowNumber = highNumber - 10;
        $student.slice(0, $student.length).css('display', 'none');
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}





$(document).ready(function(){
    //functions to append content filter elements & functionality to the DOM
    progressiveEnhancement();
    appendSearchDiv();
    searchButtonClicked();
    searchPaginationLinks();
});
