// Init Game State
let game_state = {};

//Init function
(function () {
  //   _g3T-8KGI

  $("#join_room_button").on("click", function () {
    let room_id = $("#join_room_id").val();
    console.log(room_id);
    if (!room_id) return;
    // Gets game state and adds a Eventlistners
    db.ref(`/${room_id}`).on("value", (snapshot) => {
      if (snapshot.val()) {
        game_state = snapshot.val();
        console.log(game_state);
        $(".join_room_form").remove();
        // render_waiting_room();
        render_player_form(game_state);
        db.ref(`/${room_id}`).off();
      } else {
        alert("This game room does not exist");
      }
    });
  });
})();

// Complete Avatar creation
$(".avatar_picker_btn").on("click", function () {
  let name = $(".waiting_room input#name").val();
  // let name = $(".waiting_room input#name").val();
  console.log({
    name,
  });
});

/// Componenet functions - That just render on screen

/**
 *
 * @param {object} game_state
 */

const render_waiting_room = (game_state) => {
  let playersHTML = "";
  let ContainerHTML = `       
    <h2>Waiting for players to join ....</h2>
    <div class="players_grid">
      ${playersHTML}
    </div>
  `;
  game_state.players.forEach(({ name, avatar_uri }) => {
    playersHTML += `
    <div class="players_grid-item">
      <img src="${avatar_uri}" alt="${name}" />
      <p>${name}</p>
    </div>
  `;
  });

  // render waiting room
  $(".game_container").html(ContainerHTML);
};
const render_player_form = () => {
  const avatar_picker = `
  <div class="waiting_room">
  <input type="text" name="name" id="name">
  <h4>Choose an avatar</h4>
  <div class="players_grid">
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Frenchy.png" alt="Frenchy" />
    <p>Frenchy</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Chick.png" alt="Chick" />
    <p>Chick</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Butter.png" alt="Butter" />
    <p>Butter</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Holly.png" alt="Holly" />
    <p>Holly</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Lemy.png" alt="Lemy" />
    <p>Lemy</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Nicola.png" alt="Nicola" />
    <p>Nicola</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Pears.png" alt="Pears" />
    <p>Pears</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Sal.png" alt="Sal" />
    <p>Sal</p>
  </div>
  <div class="players_grid-item">
    <img src="./assets/img/avatars/Berry.png" alt="Berry" />
    <p>Berry</p>
  </div>
</div>
<button class="avatar_picker_btn btn btn-warning">Next</button>
</div>`;
  $(".game_container")
    .html(avatar_picker)
    .promise()
    .done(function () {
      $(".players_grid").on("click", function (e) {
        console.log(e.target);
      });
    });
};

const QuestionComponent = () => {
  const question = `<div class="container">
  <!-- navigation -->
  <div class="row mt-5 px-3">
    <div class="col">
      <i class="fas fa-chevron-left"></i>
    </div>
  </div>
  <!-- breadcrumbs -->
  <div class="row mt-4 px-3">
    <div class="col">
      <h2>Question 1/10</h2>
    </div>
  </div>
  <!-- question -->
  <div class="row mt-3 px-3">
    <div class="col">
     <h1> What is the name of this character?<h1>
    </div>
  </div>
  <!-- single image-->
  <div class="row mt-3 px-3">
    <div class="col">
   <img src="https://via.placeholder.com/1500x1000" width="100%"/>
    </div>
  </div>
  <!-- four image-->
  <div class="row mt-3 px-3">
    <div class="col-6 mb-3">
   <img src="https://via.placeholder.com/1500x1000" width="100%"/>
    </div>
    <div class="col-6 mb-3">
   <img src="https://via.placeholder.com/1500x1000" width="100%"/>
    </div>
    <div class="col-6 mb-3">
   <img src="https://via.placeholder.com/1500x1000" width="100%"/>
    </div>
    <div class="col-6 mb-3">
   <img src="https://via.placeholder.com/1500x1000" width="100%"/>
    </div>
  </div>
  <!-- Timer -->
  <div class="row mt-3 px-3">
    <div class="col">
      <hr class=""/>
      <hr class="selected"/>
    </div>
  </div>
  <!-- answers -->
  <div class="row mt-3">
    <div class="col answer">
      <button class="selected"><div class="number">a</div> <p>Answer</p></button>
      <button><div class="number">b</div> <p>Answer</p></button>
      <button><div class="number">c</div> <p>Answer</p></button>
      <button class="correct"><div class="number">d</div> <p>Answer</p></button>
      <div class="row">
        <div class="col mt-4">
          <div class="center-div">
            <div class="c100 p50 small black">
                  <span>2/10</span>
                  <div class="slice">
                      <div class="bar"></div>
                      <div class="fill"></div>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
 `;
  $(".game_container").append(question);
};
