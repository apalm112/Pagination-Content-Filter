//Problem: Page currently has no pagination, so all students are listed on page
//Solution: Implement a pagination feature w/ unobtrusive JS to show only 10 students at a time, w/ clickable links appended that will list further students

//IF browser has JS disabled, Then index.html should display entire list of students

/* Global Variables ------------------------------------*/
var $studentList = $('.student-list');  //to hide student ul element
var $student = $('.student-item');

var studentArray = []; //Global Array to hold students found on web page
var groupsOfTenStudents = []; //Global Array to hold smaller arrays of groups of ten students

/* Main Functions ----------------------------------------*/
//Script must work for any number of students

function showFirstTenStudents() {
    $student.slice(0, 10).css('display', 'list-item');
    //this line almost worked, just need to add li border
    //$stuList.prepend(groupsOfTenStudents[0].slice(0, 10));
    displayPaginationLinks();
}

function displayPaginationLinks() {
    calculatePagesNeeded();
    //All functionality to be appended dynamically to the DOM

    $studentList.append(createPageLinks);
}

function calculatePagesNeeded() {
    // calculate the number of pages & links needed based on 10 students/page
    var numberOfStudents = $student.length;
    var numberOfPaginationLinks = Math.ceil(numberOfStudents / 10);
    return numberOfPaginationLinks;
}

function createPageLinks() {
    var numberOfPageLinks = calculatePagesNeeded();
    var paginationLink = '<div class="pagination">';
    paginationLink += '<ul><li>';
    paginationLink += '<a class="active" href="#">' + 1 + '</a>';
    paginationLink += '</li>';
    //repeat
    paginationLink += '</ul></div>';
    return paginationLink;
}


function paginationClicked() {
    //when pagination links clicked on, they show appropriate list of students

}

function getTenStudents() {
    //group devArray into arrays of ten students each
    for (var idx=0; idx < devArray.length; idx += 10) {
        groupsOfTenStudents.push(devArray.slice(idx, (idx + 10)));
        $student.remove([idx]);
    }
    $student.load(function() {
        $(this).css('display', 'list-item');
    });
}



$(document).ready(function() {
    showFirstTenStudents();
});
