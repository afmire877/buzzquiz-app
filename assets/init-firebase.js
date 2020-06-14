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
    new: "hell",
  });
};
// update state in Firebase
const updateRoomFirebase = () => {};

const removeRoomFromFirebase = (id) => {
  db.ref(`/${id}`).remove();
};
