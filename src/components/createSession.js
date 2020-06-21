import React, {Component} from 'react';
import {Button, View, TextInput} from 'react-native';

import socket from './../apis/port';

export default class createSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1_name: '',
    };
  }

  updateForm = e => {
    this.setState({
      player1_name: e.target.value,
    });
  };

  createSession = e => {
    if (this.state.player1_name !== '') {
      socket.emit('create-session', this.state.player1_name);
    }
  };

  render() {
    return (
      <View className="session-page">
        <View style={{width: '95%', marginTop: 100}}>
          <TextInput placeholder="username" onChange={this.updateForm} />
        </View>

        <Button
          title="Create & Join"
          className="session-btn"
          onPress={this.createSession}
        />
      </View>
    );
  }
}
