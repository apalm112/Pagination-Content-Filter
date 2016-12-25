/*Treehouse Project 02: Pagination & Content Filter
    Script dynamically adds functionality so user can click on links to view student list, ten students or less at a time. */

/* Global Variables ------------------------------------*/
var $student = $('.student-item');
var $input;
var inputValue;
var notMatch = true;
var counter;  // To track # of search result pagination links to make.
var results = [];


/* Main Functions ----------------------------------------*/

function studentDisplayNone() {
    //Hides students currently being displayed.
    $student.slice(0, $student.length).css('display', 'none');
}

function showFirstTenStudents() {
    //Hide all students, then display the first ten students.
    studentDisplayNone();
    $student.slice(0, 10).css('display', 'list-item');
}

function appendPaginationLinks() {
    //Append the pagination links to the DOM.
    $('.page').append(createPageLinksDiv);
}

function calculatePagesNeeded() {
    //Calculate the # of pages & links needed, based on 10 students/page.
    var numberOfPaginationLinks = Math.ceil($student.length / 10);
    return numberOfPaginationLinks;
}

function createPageLinksDiv() {
    //Dynamically creates the pagination links w/ corresponding number values displayed.
    var paginationLink = '<div class="search-pagination"><ul>';
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
        $('h4').remove();
        //Calculate new range of students to display.
        var highNumber = this.innerHTML * 10;
        var lowNumber = highNumber - 10;
        studentDisplayNone();
        //Show new set of students.
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}

/* Content Filter Functions -----------------------------------------*/

function appendSearchDiv() {
    //Dynamically create & append content filter input & button.
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for students...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

function searchButtonClicked() {
    //Function returns students that match user input value.
    $('.student-search button').on('click', function() {
        //Removes the no match found message.
        $('h4').remove();
        //Empty the results array to hold new search results.
        results = [];
        //Function call to search for a match.
        searchNames();
        searchPaginationLinkClicked();
    });
}

function searchNames(){
    //Function searches for matching name or email, displays results to the DOM.
    //Set values for variables that are passed to other functions.
    $input = $('.student-search');
    inputValue = $input[0].firstChild.value.toLowerCase();
    notMatch = true;
    counter = 0;
    studentDisplayNone();
    removeSearchLinks();
    getMatches();
    if (inputValue === '') {
        //Conditional resets DOM to inital page load state.
        showFirstTenStudents();
        appendPaginationLinks();
        paginationClicked();
    //Conditional displays no matches found message to the DOM.
    } else if (notMatch) {
        noMatchesMessage();
        removeSearchLinks();
    } else {
        // This conditional runs when matches are found.
        appendSearchLinksDiv();
        appendFirstTenSearchResults();
    }
}

function getMatches() {
    //Iterate thru the DOM to collect any matching students.
    for (var idx=0; idx < $student.length; idx++){
        if (($student[idx].innerText.includes(inputValue))) {
            results.push($student[idx]);
            counter++;
            //Clears the user input text from the input form.
            $input[0].childNodes[0].value = '';
            //Changed to false so no matches message function triggered.
            notMatch = false;
        }
    }
}

function appendFirstTenSearchResults() {
    //Display the first ten search results.
    var firstTen = results.slice(0, 10);
    for (var idx=0; idx < firstTen.length; idx++){
        firstTen[idx].style.display = ('list-item');
    }
}

function noMatchesMessage() {
    //If no matching students found, then append a message to the DOM & change input placeholder value.
    studentDisplayNone();
    var $studentList = $('.student-list');
    var message = '<h4>No matches found.</h4>';
    $studentList.prepend(message);
    //Change input value of placeholder.
    var $input = $('.student-search');
    $input[0].childNodes[0].placeholder = ('Click search for students');
    $input[0].childNodes[0].value = '';
}

function calculateSearchPagesNeeded() {
    //Calculate the # of pagination links needed, based on 10 students/link.
    var numberOfSearchLinks = Math.ceil(counter / 10);
    //If less than 10 students, then don't display pagination links.
    if (numberOfSearchLinks === 1) {
        numberOfSearchLinks = 0;
    }
    return numberOfSearchLinks;
}

function createSearchLinksDiv() {
    //Creates the pagination links w/ corresponding number values displayed.
    var searchLink = '<div class="search-pagination"><ul>';
    for (var idx=0; idx < calculateSearchPagesNeeded(); idx++) {
        searchLink += '<li><a class="search-active" href="#' + (idx+1) + '">';
        searchLink += (idx+1) + '</a></li>';
    }
    searchLink += '</ul></div>';
    return searchLink;
}

function appendSearchLinksDiv() {
    //Append the search pagination links to the DOM.
    $('.page').append(createSearchLinksDiv);
}

function searchPaginationLinkClicked() {
    //When search pagination link is clicked, corresponding set of students is displayed.
    $('.search-active').on('click', function() {
        //Remove any previously displayed message & students.
        $('h4').remove();
        studentDisplayNone();
        //Calculate new range of students to display.
        var highNumber = this.innerHTML * 10;
        var lowNumber = highNumber - 10;
        //Show new set of students.
        var firstTen = results.slice(lowNumber, highNumber);
        for (var idx=0; idx < firstTen.length; idx++){
            firstTen[idx].style.display = ('list-item');
        }
    });
}

function removeSearchLinks() {
    //When no matching students found, remove the pagination links.
    $searchLink = $('.search-pagination');
    $searchLink.remove();
}

//On initial page load, these functions are executed.
$(document).ready(function() {
    showFirstTenStudents();
    appendPaginationLinks();
    paginationClicked();
    appendSearchDiv();
    searchButtonClicked();
});
