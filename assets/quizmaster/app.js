function initQuizMaster() {
  // Before redirect, setup the game code gen
  // Create new Game state
  // Add to LocalStorage
  // Redirect to quizmaster.html

  $(".add_question").on("click", function () {
    console.log("yolo");
    addQuestion();
  });
}

// initialState = {
//     session_id: '', //  {string } UUID
//     isPlaying: false, // {boolean}
//     totalRounds: null, // {number}
//     quizData: [
//         [
//              Example of a question
//             {
//                 id: '', // {string} for ref
//                 type: '', // {string} Avalible types: "Image", "text", "match"
//                 question: '', //  {string}
//                 correct: '', // {string}
//                 hasTimer: true, //  {boolean}
//                 timer: 10, // {number} in seconds
//                 points: null, // Number
//             },
//         ],
//     ],
// }

// export const initialState = {
//   session_id: 0, //  {string } UUID
//   isPlaying: false, // {boolean}
//   totalRounds: 0, // {number}
//   quizData: [],
//   quizmasterData: {},
// };

// initialState = {
//   session_id: "", //  {string } room_id
//   isPlaying: false, // {boolean}
//   totalRounds: 0, // {number}
//   currentQIndex: 0,
//   player: [
//     {
//       name: "Player 1",
//       avatar_uri: "https://avatarfiles.alphacoders.com/165/165274.png",
//       totalPoints: 0,
//     },
//     {
//       name: "Player 2",
//       avatar_uri: "https://avatarfiles.alphacoders.com/165/165274.png",
//       totalPoints: 0,
//     },
//     {
//       name: "Player 3",
//       avatar_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
//       totalPoints: 0,
//     },
//   ],
//   quizData: [
//     // Example of a question
//     {
//       id: shortid.generate(), // {string} for ref
//       type: "text", // {string} Avalible types: "Image", "text", "match"
//       question: "Who said Craig was not a designer", //  {string}
//       correctAns: "Trevor", // {string}
//       options: [
//         // Array<string>
//         "Ahmed",
//         "PJ",
//         "Trevor",
//         "Tom",
//       ],
//       hasTimer: true, //  {boolean}
//       timer: 10, // {number} in seconds
//       points: null, // Number
//     },
//     {
//       id: shortid.generate(), // {string} for ref
//       type: "Image", // {string} Avalible types: "Image", "text", "match"
//       image_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
//       question: "What city is this?", //  {string}
//       correctAns: "Mogadhisu", // {string}
//       options: [
//         // Array<string>
//         "Paris",
//         "Mogadhisu",
//         "London",
//         "Nairobi",
//       ],
//       hasTimer: true, //  {boolean}
//       timer: 10, // {number} in seconds
//       points: null, // Number
//     },
//     {
//       id: shortid.generate(), // {string} for ref
//       type: "Image", // {string} Avalible types: "Image", "text", "match"
//       image_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
//       question: "What city is this?", //  {string}
//       correctAns: "Mogadhisu", // {string}
//       options: [
//         // Array<string>
//         "Paris",
//         "Mogadhisu",
//         "London",
//         "Nairobi",
//       ],
//       hasTimer: true, //  {boolean}
//       timer: 10, // {number} in seconds
//       points: null, // Number
//     },
//   ],
// };

function addQuestion() {
  let question = ` <div class="container question_container">
  <ul class="nav nav-tabs">
    <li class="tabitem active">
      <a data-toggle="tab" href="#menu">Text</a>
    </li>
    <li class="tabitem"><a data-toggle="tab" href="#menu1">Image</a></li>
    <li class="tabitem"><a data-toggle="tab" href="#menu2">Match</a></li>
  </ul>

  <div class="tab-content">
    <div id="menu" class="tab-pane active">
      <div class="questiondiv">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="question"
              placeholder="Question"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="correctanswer"
              placeholder="Correct answer"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="otheranswer1"
              placeholder="Add another answer 1"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="otheranswer2"
              placeholder="Add another answer 2"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="otheranswer3"
              placeholder="Add another answer 3"
            />
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
      </div>
    </div>
    <div id="menu1" class="tab-pane fade">
      <div class="questiondiv">
        <form>
          <div class="form-group">
            <label for="img">Select image:</label>
            <input type="file" id="img" name="img" accept="image/*" />
            <input type="submit" />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="imagequestion"
              placeholder="Question"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="imgcorrectanswer"
              placeholder="Correct answer"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="imgotheranswer1"
              placeholder="Add another answer 1"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="imgotheranswer2"
              placeholder="Add another answer 2"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="imgotheranswer3"
              placeholder="Add another answer 3"
            />
          </div>
          <div class="col-auto my-1">
            <label class="mr-sm-2" for="imgselecttime">set time</label>
            <select class="custom-select mr-sm-2" id="imgselecttime">
              <option selected>Set time</option>
              <option value="1">5 sec</option>
              <option value="2">10 sec</option>
              <option value="3">15 sec</option>
            </select>
          </div>
        </form>
      </div>
    </div>

    <div id="menu2" class="tab-pane fade">
      <div class="questiondiv">
        <form>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="matchquestion"
              placeholder="Question"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="matchcorrectanswer"
              placeholder="Correct answer"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="matchotheranswer1"
              placeholder="Add another answer 1"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="matchotheranswer2"
              placeholder="Add another answer 2"
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              id="matchotheranswer3"
              placeholder="Add another answer 3"
            />
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
      </div>
    </div>
  </div>
</div>`;
  $("#game_creator_container").append(question);
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
