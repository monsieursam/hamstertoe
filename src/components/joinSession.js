import React, {Component} from 'react';
import {InputGroup, TextInput, Button, Text, View} from 'react-native';
import socket from './../apis/port';

export default class joinSession extends Component {
  state = {
    code: '',
    name: '',
    invalid: false,
  };
  updateForm = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  submitForm = () => {
    if (this.state['code'] !== '' && this.state['name'] !== '') {
      console.log(this.state['code']);
      socket.emit('join-session', this.state.code, this.state.name);
    }
    // TODO: else give a prompt
  };

  componentDidMount() {
    socket.on('invalid-code', () => {
      this.setState({invalid: true});
    });
  }

  render() {
    return (
      <View className="session-page">
        <View style={{width: '95%', margin: 100}}>
          <TextInput
            onChangeText={name => this.setState({name})}
            value={this.state.name}
            placeholder="username"
          />
        </View>
        <View style={{width: '95%', margin: 0}}>
          <TextInput
            onChangeText={code => this.setState({code})}
            value={this.state.code}
            placeholder="session code"
          />
        </View>
        <Button
          title="Join Session"
          onPress={() => this.submitForm()}
          className="session-btn"
        />

        {this.state.invalid && (
          <Text style={{color: 'red'}}>Invalid Session Code</Text>
        )}
      </View>
    );
  }
}
