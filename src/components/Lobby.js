import React, {Component, useState} from 'react';
import {Button, ActivityIndicator, View, Text} from 'react-native';
import Board from './Board';
import Stats from './Stats';
import Announcement from './Announcement';
import socket from './../apis/port';

export default class Lobby extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlayer_one: this.props.isPlayer_one,
      code: this.props.code,
      gamestate: this.props.gamestate,
    };
  }

  componentDidMount = () => {
    socket.on('update', gamestate => {
      this.setState({gamestate: gamestate});
    });
  };

  render = () => {
    const gamestate = this.state.gamestate;

    return (
      <View>
        {this.props.waiting && <Waiting code={this.state.code} />}
        {!this.props.waiting && (
          <Game gamestate={gamestate} isPlayer_one={this.props.isPlayer_one} />
        )}
      </View>
    );
  };
}

class Waiting extends Component {
  render() {
    return (
      <View>
        <Text>Waiting for someone to join</Text>
        <ActivityIndicator color="dark" />
        <Text>Click to Copy Session Code:</Text>
        <Button
          title={this.props.code}
          onPress={() => {
            navigator.clipboard.writeText(this.props.code);
          }}
        />
      </View>
    );
  }
}

class Game extends Component {
  state = {
    announcement: false,
    message: '',
    OpponentDisconnected: false,
  };

  componentDidMount = () => {
    socket.on('announcement', text => {
      switch (text) {
        case 'player_one':
          if (this.props.isPlayer_one) {
            this.setState({
              announcement: true,
              message: 'You Won!',
            });
          } else {
            this.setState({
              announcement: true,
              message: 'You Lost',
            });
          }
          break;
        case 'player_two':
          if (this.props.isPlayer_one) {
            this.setState({
              announcement: true,
              message: 'You Lost',
            });
          } else {
            this.setState({
              announcement: true,
              message: 'You Won!',
            });
          }
          break;
        case 'tie':
          this.setState({
            announcement: true,
            message: 'Tie',
          });
          break;
      }
      setTimeout(() => {
        this.setState({announcement: false});
      }, 1250);
    });

    socket.on('user-disconnected', () => {
      this.setState({OpponentDisconnected: true});
    });
  };

  render() {
    const gamestate = this.props.gamestate;

    return (
      <View
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}>
        {this.state.OpponentDisconnected && (
          <View>
            <Text>Opponent Disconnected : </Text>
          </View>
        )}
        {!this.state.OpponentDisconnected && (
          <View
            style={{
              backgroundColor: 'red',
            }}>
            <View
              style={{
                backgroundColor: 'blue',
                flex: 1,
              }}>
              <Board
                gamestate={gamestate}
                isPlayer_one={this.props.isPlayer_one}
              />
            </View>
            <View className="stats-container">
              {this.state.announcement && (
                <Announcement>{this.state.message}</Announcement>
              )}
              {!this.state.announcement && (
                <Stats
                  gamestate={gamestate}
                  isPlayer_one={this.props.isPlayer_one}
                />
              )}
            </View>
          </View>
        )}
      </View>
    );
  }
}
