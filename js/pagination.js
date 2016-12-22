//Problem: Page currently has no pagination, so all students are listed on page
//Solution: Implement a pagination feature w/ unobtrusive JS to show only 10 students at a time, w/ clickable links appended that will list further students

//IF browser has JS disabled, Then index.html should display entire list of students

/* Global Variables ------------------------------------*/
var $studentList = $('.student-list');  //to hide student ul element
var $student = $('.student-item');

/* Main Functions ----------------------------------------*/

function showFirstTenStudents() {
    $student.slice(0, 10).css('display', 'list-item');
    displayPaginationLinks();
}

function displayPaginationLinks() {
    $('.page').append(createPageLinks);
}

function calculatePagesNeeded() {
    // calculate the number of pages & links needed based on 10 students/page
    var numberOfPaginationLinks = Math.ceil($student.length / 10);
    return numberOfPaginationLinks;
}

function createPageLinks() {
    var paginationLink = '<div class="pagination"><ul>';
    for (var idx=0;idx<calculatePagesNeeded();idx++) {
        paginationLink += '<li><a class="active" href="#' + (idx+1) + '">';
        paginationLink += (idx+1) + '</a></li>';
    }
    paginationLink += '</ul></div>';
    return paginationLink;
}

function paginationClicked() {
    //when pagination links clicked on, corresponding set of students is shown
    $('.active').on('click', function() {
        $('h4').remove();
        var highNumber = this.innerHTML * 10;
        var lowNumber = highNumber - 10;
        $student.slice(0, $student.length).css('display', 'none');
        $student.slice(lowNumber, highNumber).css('display', 'list-item');
    });
}

$(document).ready(function() {
    showFirstTenStudents();
    paginationClicked();
});
