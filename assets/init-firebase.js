var firebaseConfig = {
  apiKey: "AIzaSyCuM9hjkt6DhclvDvB7YY4gAUVje25OtCQ",
  authDomain: "buzzquiz.firebaseapp.com",
  databaseURL: "https://buzzquiz.firebaseio.com",
  projectId: "buzzquiz",
  storageBucket: "buzzquiz.appspot.com",
  messagingSenderId: "306738703111",
  appId: "1:306738703111:web:3f90a94f6731e7cc9c73a2",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const createRoomFirebase = (id) => {
  db.ref(`/${id}`).set({
    session_id: id, //  {string } room_id
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
    quizData: 1,
  });
};
// update state in Firebase
const updateRoomFirebase = () => {};

const removeRoomFromFirebase = (id) => {
  db.ref(`/${id}`).remove();
};

// quizData = [
//   [
//     {
//       id: "", // {string} for ref
//       type: "", // {string} Avalible types: "Image", "text", "match"
//       question: "", //  {string}
//       correct: "", // {string}
//       hasTimer: true, //  {boolean}
//       timer: 10, // {number} in seconds
//       points: null, // Number
//     },
//   ],
// ]
