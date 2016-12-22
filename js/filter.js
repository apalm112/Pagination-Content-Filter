//Problem: There is no input search feature to quickly find a student
//Solution: Add JS to dynamically add a search input field to find all matching students

/* Global Variable --------------------------------*/
var $student = $('.student-details');
var studentArray = [];

//Search button click returns all results that match name or emails which include matching name


//This could work for specific name search
//populates the studentArray w/ names only
//$student[0][0][3].innerHTML;
// var getStudent = document.getElementsByClassName('student-details');
//Iterate thru DOM to collect all the students
for (var idx=0; idx < $student.length; idx++){
    //console.log($student[idx].childNodes[3].innerHTML);
    studentArray.push($student[idx].childNodes[3].innerHTML);
}



//Include search input to look for particular student
//Add it dynamically to index.html using the format:
function appendSearchDiv() {
    //
    var search =  '<div class="student-search">';
    search += '<input placeholder="search for...">';
    search += '<button>Search</button>';
    search += '</div>';
    $('.page-header').append(search);
}


    //If no matches, then a message in the HTML tells user there are no matches


$(document).ready(function(){
    //function to append div, input, button to DOM
    appendSearchDiv();
});
