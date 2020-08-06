function initQuizMaster() {
  // Before redirect, setup the game code gen
  // Create new Game state
  // Add to LocalStorage
  // Redirect to quizmaster.html
}

// EventListners

$(document).ready(function () {
  $(".quizmaster-btn").on("click", function (e) {
    e.preventDefault();
    let room_id = shortid.generate(); // generate a unique ID for the room
    console.log(room_id);
    createRoomFirebase(room_id);

    db.ref(`/${room_id}`).on("value", (snapshot) => {
      console.log("value changed", snapshot.val());
    });
  });
});

var animation = bodymovin.loadAnimation({
  container: document.getElementById('lottie'), // Required
  path: 'assets/bodymovin/buzzquiz.json', // Required
  renderer: 'svg', // Required
  loop: true, 
  autoplay: true
})