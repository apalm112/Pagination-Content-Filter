//Problem: Page currently has no pagination, so all students are listed on page
//Solution: Implement a pagination feature w/ unobtrusive JS to show only 10 students at a time, w/ clickable links appended that will list further students

//IF browser has JS disabled, Then index.html should display entire list of students

/* Global Variables ------------------------------------*/
var $studentList = $('.student-list');  //to hide student ul element
var $student = $('.student-item');

var studentArray = []; //Global Array to hold students found on web page

/* Main Functions ----------------------------------------*/
//Script must work for any number of students

function showFirstTenStudents() {
    $student.slice(0, 10).css('display', 'list-item');
    //this line almost worked, just need to add li border
    //$stuList.prepend(studentArray[0].slice(0, 10));
    displayPaginationLinks();
}

function displayPaginationLinks() {
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
    var paginationLink = '<div class="pagination"><ul>';
    var counter = 0;
    for (var idx=0;idx<numberOfPageLinks;idx++) {
        counter ++;
        paginationLink += '<li><a class="active" href="#' + counter + '">';
        paginationLink += counter + '</a></li>';
    }
    paginationLink += '</ul></div>';
    return paginationLink;
}

function paginationClicked() {
    //when pagination links clicked on, they show appropriate list of students
    $('.active').on('click', function() {
        //call function that gets corresponding <a> set of students to display
        console.log(this.innerHTML);
        var number = this.innerHTML;
        var highNumber = number * 10;
        var lowNumber = highNumber - 10;
        // if else conditional to get previous set of students diplay:none;
        $student.slice(lowNumber, highNumber).css('display', 'list-item');

    });
}

function getTenStudents() {
    //group array into arrays of ten students each
    // for (var idx=0; idx < $student.length; idx++) {
    //     studentArray.push($student[idx]);
    // }


}


$(document).ready(function() {
    showFirstTenStudents();
    getTenStudents();
    paginationClicked();
});
