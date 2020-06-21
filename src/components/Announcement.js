import React, {Component} from 'react';
// import {AnimatePresence, motion} from 'framer-motion';
import {Text} from 'react-native';

export default class Announcement extends Component {
  render() {
    return (
      //   <AnimatePresence>
      //     <motion.div
      //       initial={{opacity: 0}}
      //       animate={{opacity: 1}}
      //       exit={{opacity: 0}}>
      <Text>{this.props.children}</Text>
      //     </motion.div>
      //   </AnimatePresence>
    );
  }
}
