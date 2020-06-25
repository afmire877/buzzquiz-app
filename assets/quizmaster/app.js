function initQuizMaster() {
  // Before redirect, setup the game code gen
  // Create new Game state
  // Add to LocalStorage
  // Redirect to quizmaster.html
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

initialState = {
  session_id: "", //  {string } room_id
  isPlaying: false, // {boolean}
  totalRounds: 0, // {number}
  currentQIndex: 0,
  player: [
    {
      name: "Player 1",
      avatar_uri: "https://avatarfiles.alphacoders.com/165/165274.png",
      totalPoints: 0,
    },
    {
      name: "Player 2",
      avatar_uri: "https://avatarfiles.alphacoders.com/165/165274.png",
      totalPoints: 0,
    },
    {
      name: "Player 3",
      avatar_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
      totalPoints: 0,
    },
  ],
  quizData: [
    // Example of a question
    {
      id: shortid.generate(), // {string} for ref
      type: "text", // {string} Avalible types: "Image", "text", "match"
      question: "Who said Craig was not a designer", //  {string}
      correctAns: "Trevor", // {string}
      options: [
        // Array<string>
        "Ahmed",
        "PJ",
        "Trevor",
        "Tom",
      ],
      hasTimer: true, //  {boolean}
      timer: 10, // {number} in seconds
      points: null, // Number
    },
    {
      id: shortid.generate(), // {string} for ref
      type: "Image", // {string} Avalible types: "Image", "text", "match"
      image_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
      question: "What city is this?", //  {string}
      correctAns: "Mogadhisu", // {string}
      options: [
        // Array<string>
        "Paris",
        "Mogadhisu",
        "London",
        "Nairobi",
      ],
      hasTimer: true, //  {boolean}
      timer: 10, // {number} in seconds
      points: null, // Number
    },
    {
      id: shortid.generate(), // {string} for ref
      type: "Image", // {string} Avalible types: "Image", "text", "match"
      image_uri: "https://avatarfiles.alphacoders.com/165/162274.png",
      question: "What city is this?", //  {string}
      correctAns: "Mogadhisu", // {string}
      options: [
        // Array<string>
        "Paris",
        "Mogadhisu",
        "London",
        "Nairobi",
      ],
      hasTimer: true, //  {boolean}
      timer: 10, // {number} in seconds
      points: null, // Number
    },
  ],
};

// EventListners

$(document).ready(function () {
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
