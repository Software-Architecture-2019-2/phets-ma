import React, { Component }  from "react";
import { Text, View, Image,Dimensions, Modal, TouchableHighlight,} from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import styles from "./PhetsStyles";
import Demo from "./Demo";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faHeart,} from '@fortawesome/free-solid-svg-icons'
const {height, width} = Dimensions.get('window');

class PhetsInitialScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }
    
  render(){
    return (
      <View style={styles.phetsbg}>
        <CardStack
          loop={true}
          verticalSwipe={false}
          renderNoMoreCards={() => null}
          onSwipedLeft={() => this.props.onSwiped('left')}
          onSwipedRight={() => this.props.onSwiped('right')}
          ref={swiper => (this.swiper = swiper)}
        >
          {this.props.getAnimals().map((item, index) => (
            <View style={styles.containerCardItem}>
              <Image source={item.image} style={styles.imageStyle} />
              <Text style={styles.nameStyle}>{item.name}</Text>
              <Text style={styles.descriptionCardItem}>{item.city}</Text>
              <View style={{position: "absolute", top: height*0.71, flex: 1, alignSelf: "center", flexDirection: 'row', justifyContent: 'space-around'}}>
                <View style={[styles.button, {marginRight: 25}]}>
                  <FontAwesomeIcon icon={ faTimes } size = { 40 } color = {'gray'} onPress={() => this.swiper.swipeLeft()}/>
                </View>
                <View style={[styles.button, {marginLeft: 25}]}>
                  <FontAwesomeIcon icon={ faHeart } size = { 40 } color = {'red'} onPress={() => this.swiper.swipeRight()} />
                </View>
              </View>
            </View>
          ))}
        </CardStack>
      </View>
    );
  }
};

export default PhetsInitialScreen;