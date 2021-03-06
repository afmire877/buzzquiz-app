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
const storage = firebase.storage();

const createRoomFirebase = (id, game_state) => {
  return db.ref(`/${id}`).set(game_state);
};
// update state in Firebase
const updateRoomFirebase = () => {};

const removeRoomFromFirebase = (id) => {
  db.ref(`/${id}`).remove();
};

const updateState = (newState) => {
  return db.ref(`/${game_state.session_id}`).set(newState);
};

const updateIsWaiting = (value) => {
  return db.ref(`/${game_state.session_id}/isWaiting`).set(value);
};
