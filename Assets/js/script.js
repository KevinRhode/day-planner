// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//get current day
let now = dayjs();
//custom id for selecting localStorage. uses current date as id, then secon object with 24 hour time id for hours
let dataId = now.format('YYYYMMDD')
//Data
let localStorageData;
//container for div rows
let plannerContainer = $('.container-fluid'); 


//data object template of what is saved to localStorage
let dataObj = {
  date : dataId,
  textAreaData : {
   "9": "",
   "10": "",
   "11": "",
   "12": "",
   "13": "",
   "14": "",
   "15": "",
   "16": "",
   "17": ""
  }  
};
//to popluate on new domains
if (JSON.parse(localStorage.getItem(dataId)) == null) {
  localStorage.setItem(dataId,JSON.stringify(dataObj));
}

loadLocalStorage(dataId);

$(document).ready(function () {
  //starting ttime - uses 24 hour format for id so 12 - 1 is not an issue
  let hours = 9;
    
  let header = $('#currentDay');
   
    //
    // TODO: Add code to display the current date in the header of the page.
    header.text(dayjs(now).format('dddd, MMMM D')+ endingFormat(dayjs(now).format('DD'))) ;   
    //select Dom element to append to
       
    //loop though all Rows
    for (let index = 0; index < 9; index++) {
    // Create Hour Row
    let hourDiv = $('<div>');
    hourDiv.attr('id',hours)


    // TODO: Add code to apply the past, present, or future class to each time
    // block by comparing the id to the current hour. HINTS: How can the id
    // attribute of each time-block be used to conditionally add or remove the
    // past, present, and future classes? How can Day.js be used to get the
    // current hour in 24-hour time?
    let checkhours = dayjs().hour(hours);
    if (now.$H > checkhours.$H) {
      //aplly past if now hour is greater then checkhour
      hourDiv.addClass('row time-block past');
    } else if (now.$H === checkhours.$H) {
      //aplly present if now hour is equal to checkhour
      hourDiv.addClass('row time-block present');
    } else {
      //aplly future if now hour is less then checkhour
      hourDiv.addClass('row time-block future');
    }
    //left portion of UL div
    let detailDiv = $('<div>');
    detailDiv.addClass('col-2 col-md-1 hour text-center py-3');
    //
    //gives hour pls am or pm with A
    detailDiv.text(checkhours.format('h A'));
    hourDiv.append(detailDiv);
    //text area users types in
    let detailTextArea = $('<textarea>');
    if (localStorageData !== null) {
      detailTextArea.text(localStorageData.textAreaData[hours])
    }    
    detailTextArea.attr('rows','3');
    detailTextArea.addClass('col-8 col-md-10 description') 
    hourDiv.append(detailTextArea);  

    //adds button on end
    let detailBtn = $('<button>');
    //adds floppy dish icon to save button
    detailBtn.html('<i class="fas fa-save" aria-hidden="true"></i>');
    //sytling of button
    detailBtn.addClass('btn saveBtn col-2 col-md-1');
    detailBtn.attr('aria-label','save');
    hourDiv.append(detailBtn);

    plannerContainer.append(hourDiv);   
      hours++;
    }


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  plannerContainer.on('click','.saveBtn',handleSave)
  

});

//custom method to as verbage at the end of day
function endingFormat(getFormating){
  if(getFormating === '11'){
    return 'th';
  }else if (getFormating[1] === '1' ) {
    return 'st';
  }
  else if(getFormating[1] === '2'){
    return 'nd';
  } else if(getFormating[1] === '3'){
    return 'rd';
  }
  else{
    return'th';
  }
}

 // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
function handleSave(){
  // get parent elements id of the delegated button pressed
  let ORC = $(this).parent('div');
  //gets the id of the var for saving to the correct object
  let Id = ORC.attr('id');
  localStorageData.textAreaData[Id] = ORC.children().eq(1)[0].value;
  //.attr('id')
  window.localStorage.setItem(dataId,JSON.stringify(localStorageData));
  //create custom alert
  let alertUserOfSave = $("<div></div>").html('Appointment Added to <span>localStorage</span>  <i class="fa fa-check"></i>');
  alertUserOfSave.addClass('customUlAlert').css('text-align','center');
  //alertUserOfSave.html('appointment added to <span>localStorage</span><i class="fa fa-check"></i>');
  alertTimer();
  plannerContainer.prepend(alertUserOfSave);
  
  
}
//load localStorage in golbal var
function loadLocalStorage(dateId){
    //try incase nothing is in localstorage
    try {
      let dataObj2 = JSON.parse(localStorage.getItem(dateId)); 
      // let datatatatatatatat = dataObj
      localStorageData = dataObj2;

    } catch (error) {
      
    }

}

//let custom alert disapear after a bit
function alertTimer() {
  // Sets timer
  timerCount = 1;
  timer = setInterval(function() {    
    

    // Tests if time has run out
    if (timerCount === 0) {
      // Clears interval
      clearInterval(timer);
     $('.customUlAlert').remove();
    }

    timerCount--;
  }, 1000);
  

}