const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


    // Previously loaded Firebase SDKs


    // TODO: Replace the following with your app's Firebase project configuration
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field

    var firebaseConfig = {
      // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
        apiKey: "AIzaSyBrcxA0DYPuLKCWJQsSQqmCcZzJTu0arT0",
        authDomain: "prueba1-15e19.firebaseapp.com",
        projectId: "prueba1-15e19",
        storageBucket: "prueba1-15e19.appspot.com",
        messagingSenderId: "761590234520",
        appId: "1:761590234520:web:b151f36024bb477f757fed",
        measurementId: "G-M1JGH8TW7R"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //firebase.analytics();

    db.collection("users").add({
        first: "Ada",
        last: "Lovelace",
        born: 1815
    })
    .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch((error) => {
        console.error("Error adding document: ", error);
    });

