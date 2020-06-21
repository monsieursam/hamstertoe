import React, {Component, useState} from 'react';
import {Button, Modal, ModalHeader, ModalBody, View, Text} from 'react-native';
import CreateSession from './createSession';
import JoinSession from './joinSession';

const Landing = props => {
  const [modal_create, setModal_create] = useState(false);
  const [modal_join, setModal_join] = useState(false);

  const create_toggle = () => setModal_create(!modal_create);
  const join_toggle = () => setModal_join(!modal_join);

  return (
    <View>
      <Text className="title">O Tic-Tac-Toe</Text>

      <Button
        title="Create Session"
        className="session-btn"
        size="md"
        onPress={create_toggle}
      />
      <Modal visible={modal_create} toggle={create_toggle}>
        <CreateSession toggle={create_toggle} />
      </Modal>

      <Button
        title="Join Session"
        className="session-btn"
        size="md"
        onPress={join_toggle}
      />
      <Modal visible={modal_join} toggle={join_toggle}>
        <JoinSession toggle={join_toggle} />
      </Modal>
    </View>
  );
};

export default Landing;
