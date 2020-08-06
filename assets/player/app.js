// Init Game State
let game_state = false;
//YQsmoHot7
let clientPlayer = false;
const lettersArray = ["a", "b", "c", "d", "e"];

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

const gameSetup = async () => {
  const { session_id } = game_state;
  // Firebase EventListners
  db.ref(`/${session_id}/players`).on("value", (snapshot) => {
    const { isPlaying, isWaiting, gameEnded } = game_state;
    if (!isPlaying && isWaiting && clientPlayer)
      render_waiting_room(snapshot.val());

    if (gameEnded) {
      // rerender the leaderboard
    }
  });
  db.ref(`/${session_id}`).on("value", (snapshot) =>
    snapshot.val() ? (game_state = snapshot.val()) : null
  );
  // Question Changer
  db.ref(`/${session_id}/currentQIndex`).on("value", (snapshot) => {
    if (snapshot.val() === false) return;
    let questions = Array.from(
      document.querySelector(".game_container").children
    );
    console.log(snapshot.val());
    questions.forEach((q) => (q.style.display = "none"));
    document.querySelector(`.question-${snapshot.val()}`).style.display =
      "block";
  });
  db.ref(`/${session_id}/timeLeft`).on("value", (snapshot) => {
    let time = snapshot.val();

    if (time && time >= 1) {
      $(".timer_circle").addClass(`p${time * 10}`);
    } else {
      $(".timer_circle").addClass(`p0`);
    }
  });
  db.ref(`/${game_state.session_id}/gameEnded`).on("value", (snapshot) => {
    if (snapshot.val()) endOfGame();
  });
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
  <div class="row mt-5 px-3"> <div class="col"> <i class="fas fa-chevron-left"></i> </div> </div> <div class="row mt-4 px-3"> <div class="col"> <h2>Profile creation</h2> </div> </div> <div class="row mt-3 px-3"> <div class="col"> <h1>Choose your character!<h1> </div> </div> <div class="row mt-3 px-3"> <div class="col"> <form> <div class="form-group"> <h3 for="exampleInputEmail1" class="mb-3">Who are you?</h3> <input type="text" class="form-control form-control-lg" id="name" aria-describedby="emailHelp" placeholder="John Smith"> <small id="emailHelp" class="form-text text-muted mt-3">Keep it clean people.</small> </div> </form> </div> </div> <!-- four image--> <div class="row mt-5 px-3 avatar-grid"> <div class="col-12 mb-4"> <h3 for="exampleInputEmail1" class="mb-3">Who speaks to your soul?</h3> </div>`;

  data.forEach(({ name, uri }, i) => {
    avatar_picker += ` 
    <div class="col-4 mb-4 text-center players-${i} avatar-grid-item" data-uri="${uri}">
        <img src="${uri}" width="100%" class="rounded-circle"/>
        <h3 class="mt-3">${name}</h3>
    </div>
        `;
  });

  avatar_picker += `</div><div class="row mt-3 px-3"> <div class="col-12 mb-4 text-center"> <button class="btn btn-warning btn-lg avatar_picker_btn">Next</button> </div> </div>`;

  $(".game_container")
    .html(avatar_picker)
    .promise()
    .done(function () {
      let avatar_uri;
      let name;
      $(".avatar-grid").on("click", function (e) {
        let container = e.target.closest(".avatar-grid-item");
        $(".avatar-grid-item").removeClass("active");
        container.classList.add("active");
        avatar_uri = container.dataset.uri;
      });

      $("button.avatar_picker_btn").on("click", function () {
        name = $("input#name").val();
        let playerID = "p-" + Math.floor(Math.random() * Date.now());
        let index = game_state.players?.length || 0;
        clientPlayer = {
          avatar_uri,
          name,
          totalPoints: 0,
          index,
        };

        addPlayerToFirebase(clientPlayer)
          .then(() => {
            $(".game_container").empty();
            updateIsWaiting(true);
            render_waiting_room();
            db.ref(`/${game_state.session_id}/players/${index}`)
              .onDisconnect()
              .remove();
          })
          .catch((e) => console.log(e));
      });
      db.ref(`/${game_state.session_id}/isWaiting`).on("value", (snapshot) => {
        console.log(snapshot.val());
        let isWaiting = snapshot.val();
        if (!isWaiting) loadQuestions();
      });
    });
};

const render_questions = () => {
  let html = "";
  game_state.quizData.forEach((item, i) => {
    const { question, options, timer, type, image_url } = item;

    html += `
    <div id="${i}" class="container question_component question-${i} ${i}" style="display:${
      i === game_state.currentQIndex ? "block" : "none"
    }">
    <!-- breadcrumbs -->
    <div class="row mt-4 px-3">
      <div class="col">
        <h2>Question ${i + 1}/${game_state?.quizData.length}</h2>
      </div>
    </div>
    <!-- question -->
    <div class="row mt-3 px-3">
      <div class="col">
       <h1> ${question} <h1>
      </div>
    </div>
    `;
    switch (type) {
      case "match":
        html += `<div class="row mt-3 px-3">`;
        image_url.forEach((image) => {
          html += `
                  <div class="col-6 mb-3">
                      <img src="${image}" width="100%"/>
                  </div>
                `;
        });
        html += `</div>`;
        break;
      case "image":
        image_url.forEach((image) => {
          html += `
                  <div class="col-6 mb-3">
                      <img src="${image}" width="100%"/>
                  </div>
                `;
        });
        break;
      default:
        break;
    }
    html += `
    <div class="row mt-3 px-3">
      <div class="col">
        <hr class=""/>
        <hr class="selected"/>
      </div>
    </div>
    
    <div class="row mt-3">
      <div class="col answer">`;
    options.forEach((answer, i) => {
      html += `<button data-value="${i + 1}"><div class="number">${
        lettersArray[i]
      }</div> <p>${answer}</p></button>`;
    });
    // class correct for green.
    // class Selected for when clicked
    html += `
    </div>
    </div>
    <div class="row">
          <div class="col mt-4">
            <div class="center-div">
              <div class="c100 p0 small black timer_circle">
                    <span class="timer_numnber">${timer}</span>
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
  });

  $(".game_container")
    .append(html)
    .promise()
    .done(function () {
      $(".answer button").on("click", function (e) {
        // Addeds Class selected
        const button = e.target.closest("button");
        const buttonContainer = button.closest(".answer");
        Array.from(buttonContainer.children).forEach((b) => {
          b.classList.remove("selected");
        });
        button.classList.add("selected");

        // console.log("value ", button.dataset.value);
        // button.dataset.value
        // removes selected from all other buttons
        //
      });
    });
};

const render_result_page = () => {
  $(".game_container").empty();
  let html = `
  <div class="row px-3 pt-5 banner">
    <div class="col text-center">
     <h2 class="bold">Results<h2>
    </div>
  </div>
  <div class="row mt-3 px-3 mb-3 ">
    <div class="col text-center">
    <h1 class="bold">The results are as follows<h1>
    </div>
  </div>
  <div class="leaderboard_listing"></div>
`;

  $(".game_container")
    .append(html)
    .promise()
    .done(function () {
      setTimeout(() => {
        render_leaderboard();
      }, 5000);
    });
};

const render_leaderboard = () => {
  $(".leaderboard_listing").empty();
  let html = "";
  let leaderboard = [...game_state.players]
    .sort((a, b) => a.totalPoints + b)
    .reverse();
  console.log(leaderboard);
  leaderboard.forEach(({ name, avatar_uri, totalPoints }, i) => {
    html += `
    <div class="row align-items-center ${i === 0 ? "winner" : ""} mb-3">
    <div class="col text-center">
      <img src="${avatar_uri}" class="profile">
    </div>
    <div class="col text-center">
      <h3 class="bold">${name}<h3>
    </div>
    <div class="col text-right">
      <h3 class="mb-0 bold">${totalPoints}pts</h3>
    </div>
  </div>`;
  });

  $(".leaderboard_listing").html(html);
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

const loadQuestions = () => {
  $(".game_container").empty();
  render_questions();
};

const endOfGame = () => {
  calculateScore();
  render_result_page();
};

const calculateScore = () => {
  let playerID = clientPlayer.index;

  $("button.selected").each(function () {
    const { quizData, players, session_id } = game_state;
    let questionID = $(this).closest(".question_component").attr("id");
    let questionPoints = quizData[questionID].points;
    let selectedQuestion = parseInt($(this).attr("data-value"));
    if (selectedQuestion === quizData[questionID].correctAns) {
      console.log(players[playerID].totalPoints + questionPoints);
      db.ref(`/${session_id}/players/${playerID}/totalPoints`).set(
        players[playerID].totalPoints + questionPoints
      );
    }
  });
};
