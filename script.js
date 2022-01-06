// get the div containing the movie theater seats
const seatContainer = document.querySelector('.seatContainer');
// querySelectorAll() returns all elements as a node list which can be manipulated similar to an array
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
// get the movie select element from the page and assign to global
const movieSelect = document.getElementById('movie');
// assign the ticket price to a global
let ticketPrice = Number(movieSelect.value);

// set up initial load state by populating selected seats and setting the corresponding text
populateSelectedSeats();
populateSelectedMovie();
populateSummaryText();
updateSelectedCount();

function setMovieData(movieIndex, ticketPrice) {
  localStorage.setItem('movieIndex', Number(movieIndex));
  localStorage.setItem('ticketPrice', Number(ticketPrice));
}

function getMovieData() {
  const preSelectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  const preSelectedMovie = localStorage.setItem('movieIndex', Number(movieIndex));
  const preSelectedTicketPrice = localStorage.setItem('ticketPrice', Number(ticketPrice));
}

function populateSelectedSeats() {
  // JSON.parse() reverses JSON.stringify()
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
  if(selectedSeats !== null && selectedSeats.length > 0) {
    selectedSeats.forEach(seatNumber => seats[seatNumber].classList.add('selected'));
  }
}

function populateSelectedMovie() {
  const selectedMovieIndex = localStorage.getItem('movieIndex');
  if(selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

function populateSummaryText() {
  const selectedTicketPrice = localStorage.getItem('ticketPrice');
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats')); 
  if(selectedSeats !== null && selectedSeats.length > 0) {
    document.getElementById('count').innerText = selectedSeats.length;
    document.getElementById('total').innerText = selectedSeats.length * selectedTicketPrice;
  }
}

function updateSelectedCount() {
  // update number of tickets and price information on page
  const selectedSeats = document.querySelectorAll('.row .seat.selected');
  const selectedSeatsCount = selectedSeats.length;
  document.getElementById('count').innerText = selectedSeatsCount;
  document.getElementById('total').innerText = selectedSeatsCount * ticketPrice;

  // store array index of selected seats in localStorage
  let seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

seatContainer.addEventListener('click', e => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

movieSelect.addEventListener('change', e => {
  ticketPrice = Number(e.target.value);
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});