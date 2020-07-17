let questions = [];
function initQuizMaster() {
  // Before redirect, setup the game code gen
  // Create new Game state
  // Add to LocalStorage
  // Redirect to quizmaster.html

  $(".add_textquestion").on("click", function () {
    console.log("text");
    addTextQuestion();
  });

  $(".add_imagequestion").on("click", function () {
    console.log("image");
    addImageQuestion();
  });

  $(".add_matchquestion").on("click", function () {
    console.log("match");
    addMatchQuestion();
  });
}

const submitQuizToFirebase = () => {
  // Grab all the questions
  //
};

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
//                 answers: [],
//                 correctAns: '', // {string}
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
        questions[index].correctAns = $(this).val();
      });

      $(`.question-${id} .option`).on("change", function () {
        let option = $(this).attr("data-option");
        questions[index].options[option - 1] = $(this).val();
      });
      $(`.question-${id} #selecttime`).on("change", function () {
        questions[index].timer = $(this).val();
      });
    });
}

function addImageQuestion() {
  let question = ` 
    
    <div class="imagequestiondiv questiondiv">
    <form>
        <div class="form-group">
            <label for="img">Select 1 image: </label>
            <input type="file" id="img" name="img" accept="image/*">
           </div>
        <div class="form-group">
           <input type="text" class="form-control" id="imagequestion" placeholder="Question">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="imgcorrectanswer" placeholder="Correct answer">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="imgotheranswer1" placeholder="Add another answer 1">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="imgotheranswer2" placeholder="Add another answer 2">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="imgotheranswer3" placeholder="Add another answer 3">
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
</div>`;
  $("#game_creator_container").append(question);
}

function addMatchQuestion() {
  let question = ` 
    <div class="matchquestiondiv questiondiv">
    <form> 
        <div class="form-group">
           <label for="files">Select 4 images:</label>
                <input type="file" id="files" name="files" multiple><br><br>
            
           </div>
        <div class="form-group">
           <input type="text" class="form-control" id="matchquestion" placeholder="Question">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" id="matchcorrectanswer" placeholder="Correct answer">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="matchotheranswer1" placeholder="Add another answer 1">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="matchotheranswer2" placeholder="Add another answer 2">
         </div>
         <div class="form-group">
            <input type="text" class="form-control" id="matchotheranswer3" placeholder="Add another answer 3">
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
