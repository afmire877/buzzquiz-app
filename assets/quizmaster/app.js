let questions = [];
let game_state = {
  currentQIndex: 0,
  isPlaying: false,
  isWaiting: true,
  quizData: [],
  session_id: shortid.generate(),
  totalRounds: 0,
};
const timer = new Timer({
  tick: 1,
  ontick: function (ms) {
    console.log(ms + " milliseconds left");
  },
  onstart: function () {
    console.log("timer started");
  },
  onstop: function () {
    console.log("timer stop");
  },
  onpause: function () {
    console.log("timer set on pause");
  },
});

function initQuizMaster() {
  // EventListners for Question buttons
  $(".add_textquestion").on("click", addTextQuestion);
  $(".add_imagequestion").on("click", addImageQuestion);
  $(".add_matchquestion").on("click", addMatchQuestion);
  // $("#submitquiznow").on("click", submitQuizToFirebase);

  $("#join_room_button").on("click", function () {
    let room_id = $("#join_room_id").val();
    console.log(room_id);
    if (!room_id) return;
    // Gets game state and adds a Eventlistners
    db.ref(`/${room_id}`).once("value", (snapshot) => {
      console.log(snapshot.val());
      if (snapshot.val()) {
        game_state = snapshot.val();
        $(".join_room_form").remove();
        gameSetup();
      } else {
        alert("This game room does not exist");
      }
    });

    $(".start_game_btn").on("click", startGamePlay);
    $(".reset_game_btn").on("click", resetGamePlay);
  });
}

const gameSetup = () => {
  db.ref(`/${game_state.session_id}/players`).on("value", (snapshot) => {
    render_player_list(snapshot.val());
  });
  db.ref(`/${game_state.session_id}`).on("value", (snapshot) =>
    snapshot.val() ? (game_state = snapshot.val()) : null
  );
};

const startGamePlay = () => {
  db.ref(`/${game_state.session_id}/isWaiting`)
    .set(false)
    .then((data) => $(".start_game_btn").remove());
  db.ref(`/${game_state.session_id}/currentQIndex`)
    .set(0)
    .then((data) => $(".start_game_btn").remove());

  timer.start(10).on("end", function () {
    moveToNextQuestion();
  });
};

const render_player_list = (playersArray = null) => {
  let players;
  if (!playersArray) return;
  if (playersArray !== null) {
    players = playersArray;
  } else {
    players = game_state.players;
  }
  let ContainerHTML = "";
  players.forEach(({ name, avatar_uri, totalPoints }) => {
    ContainerHTML += `
      <li>
          <img height="10px" width="10px" src="${avatar_uri}" alt="${name}" />
          <p>${name}</p>
          <p>Points: ${totalPoints} </p>
      <li>
      `;
  });
  // render waiting room
  $(".players_list ul").empty().html(ContainerHTML);
};

function addTextQuestion() {
  let id = Date.now();
  let index = questions.length;
  questions.push({
    id, // {string} for ref
    type: "text", // {string} Avalible types: "Image", "text", "match"
    question: null,
    correctAns: null, // {string}
    options: [],
    hasTimer: true, //  {boolean}
    timer: null, // {number} in seconds
    points: null, // Number
  });
  let question = ` 
  <div class="textquestiondiv questiondiv question-${id} ${index}"  >
      <a class="text-right" class="remove remove-${id}">remove</a>
        <h3>${questions[index]?.question || "Question"}</h3>
       <form>
              <div class="form-group">
                 <input type="text" class="form-control text-question" id="question" placeholder="Question">
              </div>

               <div class="form-group">
               <label class="text-left d-block"> Option 1 </label>
                  <input type="text" class="form-control option option-1 "  data-option="1" id="otheranswer1" placeholder="Answer option 1">
               </div>
               <div class="form-group">
               <label class="text-left d-block"> Option 2 </label>
                  <input type="text" class="form-control option option-2" data-option="2" id="otheranswer2" placeholder="Answer option 2">
               </div>
               <div class="form-group">
                <label class="text-left d-block"> Option 3 </label>
                  <input type="text" class="form-control option option-3" data-option="3" id="otheranswer3" placeholder="Answer option 3">
               </div>
               <div class="form-group">
                <input type="number" class="form-control correctAns" id="correctanswer" placeholder="Enter the option Number  1 - 3" min="1" max="3" >
              </div>
              <div class="form-group">
              <input type="number" class="form-control" id="points" placeholder="How many points" />
             </div>
               <div class="col-auto my-1">
                      <label class="mr-sm-2" for="selecttime">set time</label>
                      <select class="custom-select mr-sm-2" id="selecttime">
                        <option selected>Set time</option>
                        <option value="5">5 sec</option>
                        <option value="10">10 sec</option>
                        <option value="15">15 sec</option>
                      </select>
                    </div> 
            </form>
      </div>`;
  $("#game_creator_container")
    .append(question)
    .promise()
    .done(function () {
      // Event listners  "change" on all inputs to add to questions
      $(`.question-${id} .text-question`).on("change", function () {
        questions[index].question = $(this).val();
      });
      $(`.question-${id} .correctAns`).on("change", function () {
        questions[index].correctAns = parseInt($(this).val());
      });
      $(`.question-${id} #points`).on("change", function () {
        questions[index].points = parseInt($(this).val());
      });
      $(`.question-${id} .option`).on("change", function () {
        let option = $(this).attr("data-option");
        questions[index].options[option - 1] = $(this).val();
      });
      $(`.question-${id} #selecttime`).on("change", function () {
        questions[index].timer = parseInt($(this).val());
      });
    });
}

function addImageQuestion() {
  let id = Date.now();
  let index = questions.length;
  questions.push({
    id, // {string} for ref
    type: "image", // {string} Avalible types: "Image", "text", "match"
    question: null,
    correctAns: null, // {string}
    image_url: [], // {array} file_name with extention
    options: [],
    hasTimer: true, //  {boolean}
    timer: null, // {number} in seconds
    points: null, // Number
  });
  let question = ` 
    <div class="imagequestiondiv questiondiv question-${id} ${index}">
    <a class="text-right" class="remove remove-${id}">remove</a>
    <form>
        <div class="form-group">
            <label for="img">Select 1 image: </label>
            <input type="file" id="img" name="img" accept="image/*" onchange="handleFiles(this.files)" >
           </div>
        <div class="form-group">
           <input type="text" class="form-control image-question" placeholder="Question">
        </div>
        <div class="form-group">
        <label class="text-left d-block"> Option 1 </label>
           <input type="text" class="form-control option option-1 "  data-option="1" id="otheranswer1" placeholder="Answer option 1">
        </div>
        <div class="form-group">
        <label class="text-left d-block"> Option 2 </label>
           <input type="text" class="form-control option option-2" data-option="2" id="otheranswer2" placeholder="Answer option 2">
        </div>
        <div class="form-group">
         <label class="text-left d-block"> Option 3 </label>
           <input type="text" class="form-control option option-3" data-option="3" id="otheranswer3" placeholder="Answer option 3">
        </div>
        <div class="form-group">
         <input type="number" class="form-control correctAns" id="correctanswer" placeholder="Enter the option Number  1 - 3" min="1" max="3" />
       </div>
       <div class="form-group">
        <input type="number" class="form-control" id="points" placeholder="How many points" />
       </div>
         <div class="row my-1">
          <div class="col-6">
            <label class="mr-sm-2" for="selecttime">set time</label>
            <select class="custom-select mr-sm-2" id="selecttime">
              <option selected>Set time</option>
              <option value="5">5 sec</option>
              <option value="10">10 sec</option>
              <option value="15">15 sec</option>
            </select>
          </div>
        </div> 
       </form>
</div>`;
  $("#game_creator_container")
    .append(question)
    .promise()
    .done(function () {
      // Event listners  "change" on all inputs to add to questions
      $(`.question-${id} .image-question`).on("change", function () {
        questions[index].question = $(this).val();
      });
      $(`.question-${id} #img`).on("change", function () {
        let arr = Array.from(
          document.querySelector(`.question-${id} #img`).files
        );
        questions[index].image_url = arr.map((i) => i.name);
      });
      $(`.question-${id} .correctAns`).on("change", function () {
        questions[index].correctAns = parseInt($(this).val());
      });
      $(`.question-${id} #points`).on("change", function () {
        questions[index].points = parseInt($(this).val());
      });

      $(`.question-${id} .option`).on("change", function () {
        let option = $(this).attr("data-option");
        questions[index].options[option - 1] = $(this).val();
      });
      $(`.question-${id} #selecttime`).on("change", function () {
        questions[index].timer = parseInt($(this).val());
      });
    });
}

function addMatchQuestion() {
  let id = Date.now();
  let index = questions.length;
  questions.push({
    id, // {string} for ref
    type: "match", // {string} Avalible types: "image", "text", "match"
    question: null,
    correctAns: null, // {string}
    image_url: [], // {array} file_name with extention
    options: [],
    hasTimer: true, //  {boolean}
    timer: null, // {number} in seconds
    points: null, // Number
  });
  let question = ` 
    <div class="matchquestiondiv questiondiv question-${id} ${index}">
    <a class="text-right" class="remove remove-${id}">remove</a>
    <form> 
        <div class="form-group">
           <label for="files">Select 4 images:</label>
                <input type="file" id="img" name="files" multiple onchange="handleFiles(this.files)">
                
                <br><br>
            
           </div>
        <div class="form-group">
           <input type="text" class="form-control" id="matchquestion" placeholder="Question">
        </div>
         <div class="form-group">
            <input type="text" class="form-control option option-1"  data-option="1" id="matchotheranswer1" placeholder="Add another answer 1">
         </div>
         <div class="form-group">
            <input type="text" class="form-control option option-2"   data-option="2" id="matchotheranswer2" placeholder="Add another answer 2">
         </div>
         <div class="form-group">
            <input type="text" class="form-control option option-3"  data-option="3" id="matchotheranswer3" placeholder="Add another answer 3">
         </div>
         <div class="form-group">
            <input type="number" class="form-control correctAns" id="correctanswer" placeholder="Enter the option Number  1 - 3" min="1" max="3" />
          </div>
         <div class="form-group">
          <input type="number" class="form-control" id="points" placeholder="How many points" />
         </div>
         <div class="col-auto my-1">
                <label class="mr-sm-2" for="selecttime">set time</label>
                <select class="custom-select mr-sm-2" id="selecttime">
                  <option selected>Set time</option>
                  <option value="1">5 sec</option>
                  <option value="2">10 sec</option>
                  <option value="3">15 sec</option>
                </select>
              </div> 
      </form>
    </div>`;
  $("#game_creator_container")
    .append(question)
    .promise()
    .done(function () {
      // Event listners  "change" on all inputs to add to questions
      $(`.question-${id} #matchquestion`).on("change", function () {
        questions[index].question = $(this).val();
      });
      $(`.question-${id} #img`).on("change", function () {
        let arr = Array.from(
          document.querySelector(`.question-${id} #img`).files
        );
        questions[index].image_url = arr.map((i) => i.name);
      });
      $(`.question-${id} .correctAns`).on("change", function () {
        questions[index].correctAns = parseInt($(this).val());
      });
      $(`.question-${id} #points`).on("change", function () {
        questions[index].points = parseInt($(this).val());
      });

      $(`.question-${id} .option`).on("change", function () {
        let option = $(this).attr("data-option");
        questions[index].options[option - 1] = $(this).val();
      });
      $(`.question-${id} #selecttime`).on("change", function () {
        questions[index].timer = parseInt($(this).val());
      });
    });
}

// Healper Functions

const handleFiles = (files) => {
  [...files].forEach(uploadFile);
};

function uploadFile(file) {
  const ref = storage.ref().child(file.name);
  ref.put(file).then(function (snapshot) {
    console.log(snapshot);
    console.log("Uploaded a blob or file!");
  });
}

// EventListners

$(document).ready(function () {
  initQuizMaster();
  //   $(".quizmaster-btn").on("click", function (e) {
  //     e.preventDefault();
  //     let room_id = shortid.generate(); // generate a unique ID for the room
  //     console.log(room_id);
  //     createRoomFirebase(room_id);
  //     db.ref(`/${room_id}`).on("value", (snapshot) => {
  //       console.log("value changed", snapshot.val());
  //     });
  //   });
});
const getDownLoadLinks = async (files) => {
  try {
    let imagesURL = files.map((image) => {
      const imageRef = storage.refFromURL("gs://buzzquiz.appspot.com/" + image);
      return imageRef.getDownloadURL();
    });
    return Promise.all(imagesURL);
  } catch (e) {
    console.log(e);
  }
};
const resetGamePlay = () => {
  db.ref(`/${game_state.session_id}/isWaiting`).set(true);
  db.ref(`/${game_state.session_id}/currentQIndex`).set(false);
  db.ref(`/${game_state.session_id}/players`).remove();
  db.ref(`/${game_state.session_id}/gameEnded`).set(false);
};

const endofGame = () => {
  return db
    .ref(`/${game_state.session_id}/gameEnded`)
    .set(true)
    .then(console.log);
};

const moveToNextQuestion = () => {
  timer.off();
  let newValue = game_state.currentQIndex + 1;
  if (game_state.currentQIndex === game_state.quizData.length - 1) {
    endofGame();
    return;
  }
  return db
    .ref(`/${game_state.session_id}/currentQIndex`)
    .set(newValue)
    .then((data) => {
      timer.start(10).on("end", function () {
        moveToNextQuestion();
      });
    });
};
