//Problem: Page currently has no pagination, so all students are listed on page
//Solution: Implement a pagination feature w/ unobtrusive JS to show only 10 students at a time, w/ clickable links appended that will list further students


// <ul class="student-list">
//   <li class="student-item cf">
//       <div class="student-details">
//           <img class="avatar" src="https://randomuser.me/api/portraits/thumb/women/67.jpg">
//           <h3>iboya vat</h3>
//           <span class="email">iboya.vat@example.com</span>
//       </div>
//       <div class="joined-details">
//              <span class="date">Joined 07/15/15</span>
//      </div>
//   </li>

var studentArray = []; //Global Array to hold students found on web page
// When page loads:  the script will traverse throught the DOM
//(by selecting '.student-details' then getting its child that's a <h3>)
function countStudents() {
    //Iterate thru DOM to collect all the students
    var getStudent = document.getElementsByClassName('student-details');
    for (var idx=0; idx < getStudent.length; idx++){
        //console.log(getStudent[idx].childNodes[3].innerHTML);
        studentArray.push(getStudent[idx].childNodes[3].innerHTML);
    }
    // getStudent[33].childNodes[3].innerText;
}












//IF browser has JS disabled, Then index.html should display entire list of students


// calculate the number of pages needed & pagination links to display
//count the number of students on the page



// display list of ten students
// display pagination links

//when pagination links clicked on, they show appropriate list of students

//Script must work for any number of students

//All functionality to be appended dynamically to the DOM
// <div class="pagination">
// <ul>
// <li>
// <a class="active" href="#">1</a>
// </li>
// //repeat
// </ul>
// </div>
