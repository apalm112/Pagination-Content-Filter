//Problem: There is no input search feature to quickly find a student
//Solution: Add JS to dynamically add a search input field to find all matching students

//Include search input to look for particular student
//Add it dynamically to index.html using the format:
// <div class="student-search">
//     <input placeholder="search for...">
//     <button>Search</button>
// </div>

//Search button click returns all results that match name or emails which include matching name

//If no matches, then a message in the HTML rells user there are no matches
//Iterate thru DOM to collect all the students

//This could work for specific name search
//populates the studentArray w/ names only
var getStudent = document.getElementsByClassName('student-details');
for (var idx=0; idx < getStudent.length; idx++){
    //console.log(getStudent[idx].childNodes[3].innerHTML);
    studentArray.push(getStudent[idx].childNodes[3].innerHTML);
}
