import './App.css';
import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyA8VA5lETYBAJuK3Ewxyl1AapLIPWPeFS0",
  authDomain: "superchat-4164d.firebaseapp.com",
  projectId: "superchat-4164d",
  storageBucket: "superchat-4164d.appspot.com",
  messagingSenderId: "845292735645",
  appId: "1:845292735645:web:b8aca44a9838e944dd9874"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  //const [user] = useAuthState(auth);
  return (
    <div className="App">
      <header>

      </header>
      <section>
        {/* { {user ? <ChatRoom /> : <SignIn />} } */<ChatRoom/>}
      </section>
    </div>
  );
}

function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <button onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  return (
    <>
      <div>
        {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      </div>
    </>
  )
}

function ChatMessage(props) {
  const { text, uid } = props.message;
  return <p>{text}</p>
}
export default App;
