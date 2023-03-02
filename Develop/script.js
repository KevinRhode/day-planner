// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


$(function () {
  
  
  let now = dayjs();  
  let header = $('#currentDay');
   
    header.text(dayjs(now).format('dddd, MMMM D')+ endingFormat(dayjs(now).format('DD'))) ;   

    let plannerContainer = $('.container-fluid');    

    for (let index = 0; index < 12; index++) {
      // Create button
    let hourDiv = $('<div>');
    hourDiv.addClass('row time-block present');
    
    let detailDiv = $('<div>');
    detailDiv.addClass('col-2 col-md-1 hour text-center py-3');
    //
    let k = now.$d;
    detailDiv.text('the hour it is for 10AM exp');
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

    }


  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  // plannerContainer.on('click','')

  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  //
  // TODO: Add code to display the current date in the header of the page.

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