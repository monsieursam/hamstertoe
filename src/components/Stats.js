import React, {Component} from 'react';
import {Text, View} from 'react-native';

export default class Stats extends Component {
  centeredStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  render() {
    const gamestate = this.props.gamestate;
    const isPlayer_one = this.props.isPlayer_one;
    const opponent_name = isPlayer_one ? gamestate.p2_name : gamestate.p1_name;
    const wins = isPlayer_one ? gamestate.p1_score : gamestate.p2_score;
    const losses = isPlayer_one ? gamestate.p2_score : gamestate.p1_score;
    const ties = gamestate.ties;

    return (
      <View>
        {gamestate.p1_turn === isPlayer_one && (
          <View className="turn">
            <Text>Your Turn</Text>
          </View>
        )}

        {gamestate.p1_turn !== isPlayer_one && (
          <View className="turn" style={{display: 'flex'}}>
            <Text>{opponent_name}'s Turn</Text>

            <View
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
          </View>
        )}

        <View>
          <View style={this.centeredStyle}>
            <Text>Wins</Text>
          </View>
          <View style={this.centeredStyle}>
            <Text>Ties</Text>
          </View>
          <View style={this.centeredStyle}>
            <Text>Losses</Text>
          </View>

          <View style={this.centeredStyle}>
            <Text>{wins}</Text>
          </View>
          <View style={this.centeredStyle}>
            <Text>{ties}</Text>
          </View>
          <View style={this.centeredStyle}>
            <Text>{losses}</Text>
          </View>
        </View>
      </View>
    );
  }
}
