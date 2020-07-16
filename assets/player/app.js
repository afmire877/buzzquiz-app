// Init Game State
let game_state = false;
let isWaiting = false;

//Init function
(function () {
  //   _g3T-8KGI
  $("#join_room_button").on("click", function () {
    let room_id = $("#join_room_id").val();
    console.log(room_id);
    if (!room_id) return;
    // Gets game state and adds a Eventlistners
    db.ref(`/${room_id}`).on("value", (snapshot) => {
      if (snapshot.val() && !game_state) {
        game_state = snapshot.val();
        console.log(game_state);
        $(".join_room_form").remove();
        render_player_form();
        gameSetup();
      } else if (snapshot.val()) {
        game_state = snapshot.val();
      } else {
        alert("This game room does not exist");
      }
    });
  });
})();

const gameSetup = () => {
  // Firebase EventListners
  db.ref(`/${game_state.session_id}/players`).on("value", (snapshot) => {
    const { isPlaying, isWaiting } = game_state;
    if (!isPlaying && isWaiting) render_waiting_room(snapshot.val());
  });
  db.ref(`/${game_state.session_id}`).on("value", (snapshot) =>
    snapshot.val() ? (game_state = snapshot.val()) : null
  );
};

/// Componenet functions - That just render on screen
const render_waiting_room = (playersArray = null) => {
  let players;
  if (playersArray !== null) {
    players = playersArray;
  } else {
    players = game_state.players;
  }
  let ContainerHTML = ` 
  <div class="waiting_room">      
    <h2>Waiting for players to join ....</h2>
    <div class="players_grid">`;
  players.forEach(({ name, avatar_uri }) => {
    ContainerHTML += `
      <div class="players_grid-item">
        <img src="${avatar_uri}" alt="${name}" />
        <p>${name}</p>
      </div>
    `;
  });
  ContainerHTML += `</div>
  </div>`;
  // render waiting room
  $(".game_container").empty().html(ContainerHTML);
};

const render_player_form = () => {
  const data = [
    {
      name: "Frenchy",
      uri: "./assets/img/avatars/Frenchy.png",
    },
    {
      name: "Chick",
      uri: "./assets/img/avatars/Chick.png",
    },
    {
      name: "Butter",
      uri: "./assets/img/avatars/Butter.png",
    },
    {
      name: "Holly",
      uri: "./assets/img/avatars/Holly.png",
    },
    {
      name: "Lemy",
      uri: "./assets/img/avatars/Lemy.png",
    },
    {
      name: "Nicola",
      uri: "./assets/img/avatars/Nicola.png",
    },
    {
      name: "Pears",
      uri: "./assets/img/avatars/Pears.png",
    },
    {
      name: "Sal",
      uri: "./assets/img/avatars/Sal.png",
    },
    {
      name: "Berry",
      uri: "./assets/img/avatars/Berry.png",
    },
  ];
  let avatar_picker = `
  <div class="waiting_room">
    <input type="text" name="name" id="name">
    <h4>Choose an avatar</h4>
    <div class="players_grid">
    `;
  data.forEach(({ name, uri }, i) => {
    avatar_picker += `
      <div class="players_grid-item players_grid-item-${i} " data-uri="${uri}">
        <img src="${uri}" alt="${name}" />
        <p>${name}</p>
      </div>
    `;
  });
  avatar_picker += `</div>
    <button class="avatar_picker_btn btn btn-warning">Next</button>
  </div>`;

  $(".game_container")
    .html(avatar_picker)
    .promise()
    .done(function () {
      let avatar_uri;
      let name;
      $(".players_grid").on("click", function (e) {
        let container = e.target.closest(".players_grid-item");
        $(".players_grid img").removeClass("active");
        container.classList.add("active");
        avatar_uri = container.dataset.uri;
      });

      $("button.avatar_picker_btn").on("click", function () {
        name = $("input#name").val();
        addPlayerToFirebase({
          avatar_uri,
          name,
          totalPoints: 0,
        }).then(() => {
          $(".game_container").empty();
          game_state.isWaiting = true;
          render_waiting_room();
          let index = game_state.players.length - 1;
          db.ref(`/${game_state.session_id}/players/${index}`)
            .onDisconnect()
            .remove();
        });
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

/**
 *
 * @param {object} player  An Object of player data
 * @returns {promise}
 */

const addPlayerToFirebase = (player) => {
  if (!Array.isArray(game_state.players)) game_state.players = [];
  return db
    .ref(`/${game_state.session_id}/players`)
    .set([...game_state.players, player]);
};
