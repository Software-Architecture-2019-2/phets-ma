import React, { Component } from "react";
import { Text, View, Image, Dimensions, Modal, TouchableHighlight, Picker } from "react-native";
import CardStack, { Card } from "react-native-card-stack-swiper";
import styles from "./PhetsStyles";
import { connect } from "react-redux";
import { Button, Input,  Avatar } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTimes, faHeart, faSadTear } from '@fortawesome/free-solid-svg-icons'
import { FILES_MS_URI } from "../../services/utils";
import {strings} from './PhetsStrings';

const { height, width } = Dimensions.get('window');

class PhetsInitialScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: undefined,
      animals: this.props.animals
    }
    this.swiperCallback = this.swiperCallback.bind(this);
  }

  _renderDefaultCard() {
    return (
      // <Card>
      <View style={[styles.containerCardItem, { height: 300, alignContent: 'center' }]}>
        <Text style={{ fontSize: 30 }}>{strings.no_more_phets}</Text>
        <Text style={{ fontSize: 30 }}>{strings.come_back_later}</Text>
        <FontAwesomeIcon icon={faSadTear} size={80} color={'gray'} />
        {/* <Image source={{ uri: `${FILES_MS_URI}\\${animal.media[0]}` }} style={styles.imageStyle} /> */}
        {/* <Text style={styles.nameStyle}>{animal.name}</Text> */}
        {/* <Text style={styles.descriptionCardItem}>{animal.breed}</Text> */}
        {/* <View style={{ position: "absolute", top: height * 0.71, flex: 1, alignSelf: "center", flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={[styles.button, { marginRight: 25 }]}>
              <FontAwesomeIcon icon={faTimes} size={40} color={'gray'} onPress={() => this.swiper.swipeLeft()} />
            </View>
            <View style={[styles.button, { marginLeft: 25 }]}>
              <FontAwesomeIcon icon={faHeart} size={40} color={'red'} onPress={() => this.swiper.swipeRight()} />
            </View>
          </View> */}
      </View>
      // </Card>
    );
  }

  _renderAnimalCard(animal, index) {
    return (
      <Card onSwipedLeft={() => this.swiperCallback(false, animal)} onSwipedRight={() => this.swiperCallback(true, animal)} key={index}>
        <View style={styles.containerCardItem}>
          <Image source={{ uri: `${FILES_MS_URI}\\${animal.media[0]}` }} style={styles.imageStyle} />
          <Text style={styles.nameStyle}>{animal.name}</Text>
          <Text style={styles.descriptionCardItem}>{animal.breed}</Text>
          <View style={{ position: "absolute", top: height * 0.71, flex: 1, alignSelf: "center", flexDirection: 'row', justifyContent: 'space-around' }}>
            <View style={[styles.button, { marginRight: 25 }]}>
              <FontAwesomeIcon icon={faTimes} size={40} color={'gray'} onPress={() => this.swiper.swipeLeft()} />
            </View>
            <View style={[styles.button, { marginLeft: 25 }]}>
              <FontAwesomeIcon icon={faHeart} size={40} color={'red'} onPress={() => this.swiper.swipeRight()} />
            </View>
          </View>
        </View>
      </Card>
    );
  }

  _renderPhet(animal){
    return (
      <Picker.Item label={animal.name} value={animal} />
    );
  }

  swiperCallback(state, animal) {
    this.props.onSwiped(state, animal);
  }

  selectDefaultPhet(animal){
    this.props.selectDefaultPhet(animal);
  }

  componentWillReceiveProps(){
    this.setState({animals: this.props.animals});
    this.forceUpdate();
  }

  render() {
    return (
      <View style={styles.phetsbg}>
        <Picker
            selectedValue={this.props.defaultPhet}
            style={styles.contentHead}
            onValueChange={(itemValue, itemIndex) => this.selectDefaultPhet(itemValue) }>
            {this.props.phets.map((animal, index) => this._renderPhet(animal))} 
        </Picker>
        <View style={styles.phetscard}>
          <CardStack
            loop={false}
            verticalSwipe={false}
            renderNoMoreCards={() => this._renderDefaultCard()}
            onSwipedLeft={() => this.props.onSwiped('left')}
            onSwipedRight={() => this.props.onSwiped('right')}
            ref={swiper => (this.swiper = swiper)}
          >
            {this.state.animals.map((animal, index) => this._renderAnimalCard(animal, index))}
          </CardStack>
        </View>
        {this.props.isMatch && (
          <View
            style={{position: "absolute", zIndex: 10, width: width*0.8, marginLeft: width*0.1, backgroundColor: "#FFF", borderColor: "gray", borderWidth: 1,
            borderRadius: 10, marginTop: height*0.3}}
            >
            <View>
              <Text style={{fontSize: 20, fontWeight: "bold", textAlign: "center",marginTop: 20}}>{strings.match}</Text>
              <Text style={{fontSize: 16, textAlign: "center", marginTop: 20}}>{strings.you_matched}</Text>
              <Text style={{fontSize: 16, textAlign: "center"}}>{this.props.matchedAnimal.name}!</Text>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-around", marginTop: 20, marginBottom: 30}}>
              <Button
                buttonStyle={styles.button}
                titleStyle={{ color: '#FFF' }}
                buttonStyle={{ marginTop: 10, width: width*0.3 }}
                title={strings.chat}
                onPress={() => this.props.startChat()}
              />
              <Button
                buttonStyle={styles.button}
                titleStyle={{ color: '#FFF' }}
                buttonStyle={{ marginTop: 10, width: width*0.3 }}
                title={strings.close}
                onPress={() => this.props.closeModal()}
              />
            </View>
        </View>
        )}
      </View>
    );
  }
};

export default PhetsInitialScreen;