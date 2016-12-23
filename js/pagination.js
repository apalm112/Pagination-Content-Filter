/*Treehouse Project 02: Pagination & Content Filter
    Script dynamically adds functionality so user can click on links to view student list, ten students or less at a time. */

/* Global Variables ------------------------------------*/
var $studentList = $('.student-list');  //to hide student ul element
var $studentDetails = $('.student-details');
var $student = $('.student-item');
var counter;  // To track # of search result pagination links to make.

/* Main Functions ----------------------------------------*/

function studentDisplayNone() {
    //Hides all the students currently being displayed.
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
        //Hide currently displayed students.
        $student.slice(0, $student.length).css('display', 'none');
        //Show new set of students.
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}

/* Content Filter Functions -----------------------------------------*/

function appendSearchDiv() {
    //Dynamically create & append content filter input & button, using the format:
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for students...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}

function searchButtonClicked() {
    /*TODO: Problem: When the search button is clicked & the input value is
            '', the functionality as is just removes any divs shown & displays the first ten students But w/out the pagination links.  Solution:  fix the code that the pagination links are appended to the DOM.*/
    //Returns all results that match name or emails which include matching name.
    //Get user text value from input.
    $('.student-search button').on('click', function() {
        //Removes the no match found message if it has been appended.
        $('h4').remove();
        //Function call to search for a match.
        searchNames();
    });
}

function searchNames(){
    /* TODO:  Problem: This function is just too damn big.  Solution:  Break it
              into two seperate functions:
              one function with the for loop,
              the second function with the if else if conditional. */


    //Function searches for matching name or email, displays results to the DOM.
    var $input = $('.student-search');
    var inputValue = $input[0].firstChild.value.toLowerCase();
    console.log('INPUT VALUE IS: ' + inputValue);
    var notMatch = true;
    counter = 0;
    //Hides any students currently displayed.
    studentDisplayNone();
    hideSearchLinks(); // THIS ONE WORKS!

    /* TODO: Problem: This for loop finds all the matches, then just displays
             all ofthem at once.  Solution: Push all matches into an array, then show only the first ten matches.  Then subsequent sets of matches can be displayed by clicking the search pagination links. */
    //Iterate thru DOM to collect any matching students.
    for (var idx=0; idx < $student.length; idx++){
        if (($student[idx].innerText.includes(inputValue)) && (inputValue !== '')) {
            //Shows only matching students.
            $student.slice(idx, idx+1).css('display', 'list-item');
            counter++;
            //Clears the user input text from the input form.
            $input[0].childNodes[0].value = '';
            notMatch = false;
        }
    }
    if (inputValue === '') {
        console.log('INPUT VALUE IS EMPTY STRING');
        showFirstTenStudents();
    //Display no matches found message to the DOM.
    } else if (notMatch) {
        noMatchesMessage();
        hideSearchLinks(); // THIS ONE WORKS!
    } else {
        // This conditional runs when matches are found. It will call a  function to create search pagination links & append them.
        appendSearchLinksDiv();
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

function calculateSearchPagesNeeded() {
    //Calculate the # of pages & links needed, based on 10 students/page.
    var numberOfSearchLinks = Math.ceil(counter / 10);
    if (numberOfSearchLinks === 1) {
        numberOfSearchLinks = 0;
    }
    return numberOfSearchLinks;
}

function createSearchLinksDiv() {
    //Dynamically creates the pagination links w/ corresponding number values displayed.
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
    //TODO: This function is not wired to return the search results,
            // It is currently just grabbing a set of 10 students from the DOM list.  Needs to grab the students from a new list of search results.


    //When search link is clicked, corresponding set of students is displayed.
    $('.search-active').on('click', function() {
        //Remove any previous displayed message or search links.
        console.log('SEARCH PAGINATION LINK CLICKED');
        hideSearchLinks();
        $('h4').remove();
        //Calculate new range of students to display.
        var highNumber = this.innerHTML * 10;
        console.log(this);
        console.log(this.innerHTML);
        var lowNumber = highNumber - 10;
        //Hide currently displayed students.
        $student.slice(0, $student.length).css('display', 'none');
        //Show new set of students.
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}


function hideSearchLinks() {
    //When no matching students found, hide the pagination links.
    $searchLink = $('.search-pagination');
    $searchLink.remove();
    // css('display', 'none')
}

/* On page load ---------------------------------*/
//On initial page load, these functions are executed.
$(document).ready(function() {
    showFirstTenStudents();
    appendPaginationLinks();
    appendSearchDiv();
    paginationClicked();
    searchButtonClicked();
    searchPaginationLinkClicked();
});
