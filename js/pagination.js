//Problem: Page currently has no pagination, so all students are listed on page
//Solution: Implement a pagination feature w/ unobtrusive JS to show only 10 students at a time, w/ clickable links appended that will list further students


// <ul class="student-list">
//   <li class="student-item cf">
//       <div class="student-details">
//           <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
//           <h3>iboya vat</h3>
//           <span class="email">iboya.vat@example.com</span>
//       </div>
//   </li>



//IF browser has JS disabled, Then index.html should display entire list of students


var studentArray = []; //Global Array to hold students found on web page
var groupsOfTenStudents = []; //Global Array to hold smaller arrays of groups of ten students


// When page loads:  the script will traverse throught the DOM
//(by selecting '.student-details' then getting its child that's a <h3>)
function getStudents() {
    //Iterate thru DOM to collect all the students
    var getStudent = document.getElementsByClassName('student-details');
    for (var idx=0; idx < getStudent.length; idx++){
        //console.log(getStudent[idx].childNodes[3].innerHTML);
        studentArray.push(getStudent[idx].childNodes[3].innerHTML);
    }
}

//Script must work for any number of students
function calculatePagesNeeded() {
    // calculate the number of pages needed & pagination links to display
    var numberOfStudents = studentArray.length;
    var numberOfPaginationLinks = Math.ceil(numberOfStudents / 10);
    return numberOfPaginationLinks;
}

function displayTenStudents() {
    calculatePagesNeeded();
    //get the ul element & hide it
    var $stuList = $('.student-list');
    $stuList.hide();
    //get first ten students & display them--will need a loop for unknow size
    for (var idx=0; idx < studentArray.length; idx += 10) {
        // for (var sdx=10; sdx < studentArray.length; sdx += 10) {
        //create studentArray.slice([idx of 10]) for studentArray.length
        groupsOfTenStudents.push(studentArray.slice(idx, (idx + 10)));
    }
    // var firstTenStudents = studentArray.slice(0,10);
}

function displayPaginationLinks() {
    calculatePagesNeeded();
    // display pagination links
    //All functionality to be appended dynamically to the DOM
    // <div class="pagination">
    // <ul>
    // <li>
    // <a class="active" href="#">1</a>
    // </li>
    // //repeat
    // </ul>
    // </div>

}

function paginationClicked() {
    //when pagination links clicked on, they show appropriate list of students

}

getStudents();
