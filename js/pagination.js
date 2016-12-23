/*Treehouse Project 02: Pagination & Content Filter
    Script dynamically adds functionality so user can click on links to view student list, ten students or less at a time. */

/* Global Variables ------------------------------------*/
var $studentList = $('.student-list');  //to hide student ul element
var $studentDetails = $('.student-details');
var $student = $('.student-item');
var counter = 0;

/* Main Functions ----------------------------------------*/

function studentDisplayNone() {
    //Hides all the students currently being displayed.
    $student.slice(0, $student.length).css('display', 'none');
}

function showFirstTenStudents() {
    //On page load, display the first ten students, hide the others & pagination links.
    studentDisplayNone();
    $student.slice(0, 10).css('display', 'list-item');
    appendPaginationLinks();
}

function appendPaginationLinks() {
    //Append the pagination links to the DOM.
    $('.page').append(createPageLinks);
}

function calculatePagesNeeded() {
    //Calculate the # of pages & links needed, based on 10 students/page.
    var numberOfPaginationLinks = Math.ceil($student.length / 10);
    return numberOfPaginationLinks;
}

function searchPagesNeeded() {
    //Calculate the # of pages & links needed, based on 10 students/page.
    var numberOfSearchLinks = Math.ceil(counter / 10);
    return numberOfSearchLinks;
}


function createPageLinks() {
    //Dynamically creates the pagination links w/ corresponding number values displayed.
    var paginationLink = '<div class="pagination"><ul>';
    for (var idx=0; idx < calculatePagesNeeded(); idx++) {
        paginationLink += '<li><a class="active" href="#' + (idx+1) + '">';
        paginationLink += (idx+1) + '</a></li>';
    }
    paginationLink += '</ul></div>';
    return paginationLink;
}

function paginationClicked() {
    //When pagination link is clicked, corresponding set of students is displayed.
    $('.active').on('click', function() {
        //Remove any previous displayed no match found message.
        // $('h4').remove();
        //Calculate range of students to display.
        var highNumber = this.innerHTML * 10;
        var lowNumber = highNumber - 10;
        //Hide currently displayed students.
        $student.slice(0, $student.length).css('display', 'none');
        //Show new set of students.
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}




/* Content Filter Functions -- ----------------------------------*/

function appendSearchDiv() {
    //Dynamically create & append content filter input & button, using the format:
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for students...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

function searchButtonClicked() {
    //Returns all results that match name or emails which include matching name.
    //Get user text value from input.
    $('.student-search button').on('click', function(){
        hidePaginationLinks();
        //Removes the no match found message if it has been appended.
        $('h4').remove();
        // hidePaginationLinks();
        //Function call to search for a match.
        searchNames();
        //get corresponding # of pagination Links
        createPageLinks();
    });

}

function searchNames(){
    //Function searches for matching name or email, displays results to the DOM.
    var $input = $('.student-search');
    var inputValue = $input[0].firstChild.value;
    var notMatch = true;

    //Hides any students currently displayed.
    studentDisplayNone();

    //Iterate thru DOM to collect any matching students.
    for (var idx=0; idx < $student.length; idx++){
        if ($student[idx].innerText.includes(inputValue)) {
            //Shows only matching students.
            $student.slice(idx, idx+1).css('display', 'list-item');
            counter++;
            // console.log('Found a match for ' + inputValue + ': ' + $student[idx].childNodes[1].innerText );
            //Clears the user input text from the input form.
            $input[0].childNodes[0].value = '';
            notMatch = false;
        }
    }
    //Display no matches found message to the DOM.
    if (notMatch) {
        noMatchesMessage();
        // hidePaginationLinks();
    }
}

function noMatchesMessage() {
    //If no matches, then a message in the HTML tells user no matches found.
    studentDisplayNone();
    var message = '<h4>No matches found.</h4>';
    $studentList.prepend(message);
    //Change input value of placeholder.
    var $input = $('.student-search');
    $input[0].childNodes[0].placeholder = ('Click search for students');
    $input[0].childNodes[0].value = '';
}

// DUPLICATES ???
/*function createPageLinks() {
    //Calculate the # of pagination links to display based on search results.
    //Dynamically creates the pagination links w/ corresponding number values displayed.
    var paginationLink = '<div class="pagination"><ul>';
    for (var idx=0; idx < calculatePagesNeeded(); idx++) {
        paginationLink += '<li><a class="active" href="#' + (idx+1) + '">';
        paginationLink += (idx+1) + '</a></li>';
    }
    paginationLink += '</ul></div>';
    return paginationLink;
}*/

function hidePaginationLinks() {
    //When no matching students found, hide the pagination links.
    $searchPaginationLink = $('.pagination');
    $searchPaginationLink.remove();
    //Tried this one:     css('display', 'none');
}



/* On page load ---------------------------------*/
//On initial page load, these functions are executed.
$(document).ready(function() {
    showFirstTenStudents();
    appendSearchDiv();
    paginationClicked();
    searchButtonClicked();
});
