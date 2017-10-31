import React from "react";
import ReactDOM from "react-dom";
import * as firebase from "firebase";

const config = {
  apiKey: "AIzaSyAn7rix-ze5tnmPgbiS7pFd_8BX2RZokJE",
  authDomain: "chat-bot-demo-527f3.firebaseapp.com",
  databaseURL: "https://chat-bot-demo-527f3.firebaseio.com",
  projectId: "chat-bot-demo-527f3",
  storageBucket: "chat-bot-demo-527f3.appspot.com",
  messagingSenderId: "1093023322539"
};
firebase.initializeApp(config);

const database = firebase.database();
const user = database.ref("user");

class UserMessage extends React.Component {
  constructor() {
    super();
    this.state = { avatar: "", username: "", message: "" };
  }
  componentDidMount() {
    let firebaseAvatar;
    let firebaseUsername;
    let firebaseMessage;

    let promise1 = new Promise((resolve, reject) => {
      user.on("value", function(snapshot) {
        firebaseAvatar = snapshot.val().avatar;
        resolve(firebaseAvatar);
      });
    });

    let promise2 = new Promise((resolve, reject) => {
      user.on("value", function(snapshot) {
        firebaseUsername = snapshot.val().username;
        resolve(firebaseUsername);
      });
    });

    let promise3 = new Promise((resolve, reject) => {
      user.on("value", function(snapshot) {
        firebaseMessage = snapshot.val().message;
        resolve(firebaseMessage);
      });
    });

    Promise.all([promise1, promise2, promise3]).then(values => {
      this.setState({
        avatar: values[0],
        username: values[1],
        message: values[2]
      });
    });

    setTimeout(() => {
      this.setState({ showComponent: true });
    }, 3000);
  }

  render() {
    const showComponent = this.state.showComponent;

    return (
      <div>
        {showComponent ? (
          //render component
          <div className="user-message">
            <div
              style={{ background: this.state.avatar }}
              className="user-avatar"
            />
            <div className="username">{this.state.username}</div>
            <div className="message">{this.state.message}</div>
          </div>
        ) : (
          //render nothing
          <div />
        )}
      </div>
    );
  }
}

module.exports = UserMessage;
