import React, {Component} from 'react';
import socket from './../apis/port';
import {View, Text} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';

export default class Square extends Component {
  renderValue = val => {
    //converts a value index to a string
    if (val === '1') {
      //return "✖"
      return '✕';
    } else if (val === '-1') {
      return '◯';
      //return "○"
    } else {
      return '';
    }
  };

  playerMove = () => {
    if (
      this.props.gamestate.p1_turn === this.props.gamestate.isPlayer_one &&
      this.props.gamestate.grid[this.props.index] === 0
    ) {
      if (this.props.gamestate.isPlayer_one) {
        socket.emit('player-move', this.props.index, 1);
        console.log('X');
      } else {
        socket.emit('player-move', this.props.index, -1);
        console.log('O');
      }
    }
  };

  render() {
    return (
      <TouchableHighlight
        style={{
          color: 'black',
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          fontSize: 13,
          borderColor: 'black',
          borderWidth: 1,
          height: 100,
          width: 100,
        }}
        onPress={this.playerMove}>
        <Text>{this.renderValue(this.props.val)}</Text>
      </TouchableHighlight>
    );
  }
}
