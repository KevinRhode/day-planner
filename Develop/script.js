// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
let now = dayjs();

$(function () {
  
  let hours = 13;
    
  let header = $('#currentDay');
   
    //
    // TODO: Add code to display the current date in the header of the page.
    header.text(dayjs(now).format('dddd, MMMM D')+ endingFormat(dayjs(now).format('DD'))) ;   

    let plannerContainer = $('.container-fluid');    

    for (let index = 0; index < 9; index++) {
    // Create button
    let hourDiv = $('<div>');
    hourDiv.attr('id',hours)

    let checkhours = dayjs().hour(hours);
    if (now.$H > checkhours.$H) {
      //do somthing
      hourDiv.addClass('row time-block past');
    } else if (now.$H === checkhours.$H) {
      hourDiv.addClass('row time-block present');
    } else {
      hourDiv.addClass('row time-block future');
    }

    
    
    let detailDiv = $('<div>');
    detailDiv.addClass('col-2 col-md-1 hour text-center py-3');
    //
    let ampm = index < 3 ? 'AM': 'PM';
    detailDiv.text(checkhours.format('h A'));
    hourDiv.append(detailDiv);

    let detailTextArea = $('<textarea>');
    detailTextArea.attr('rows','3');
    detailTextArea.addClass('col-8 col-md-10 description') 
    hourDiv.append(detailTextArea);  

    let detailBtn = $('<button>');
    detailBtn.html('<i class="fas fa-save" aria-hidden="true"></i>');
    detailBtn.addClass('btn saveBtn col-2 col-md-1');
    detailBtn.attr('aria-label','save');
    hourDiv.append(detailBtn);

    plannerContainer.append(hourDiv);    
    
    // if (hours === 12) {
    //   hours = 1;
    // }else{
    //   hours++
    // }    
      hours++;
    }


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  plannerContainer.on('click','.saveBtn',handleSave)

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //apply present, past current
  
  let testitititit =  plannerContainer.children('.time-block');


  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  

});


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

function handleSave(){
// do i hit this?
}