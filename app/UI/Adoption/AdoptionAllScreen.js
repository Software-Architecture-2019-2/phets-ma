import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Image, Dimensions, TouchableOpacity, } from "react-native";

import { Button } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

import { FILES_MS_URI } from "../../services/utils";
import { AdoptionStrings } from "./AdoptionStrings";

const { height, width } = Dimensions.get('window');

class AdoptionAllScreen extends Component {
  constructor(props) {
    super(props);
  }

  getAnimalImageUri(animal) {
    const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
    return animal.media && animal.media.length ? `${FILES_MS_URI}\\${animal.media[0]}` : defaultImage;
  }

  _renderAnimals() {
    return this.props.animals.map((animal, index) => {
      return <View style={styles.containerCardItem} key={index}>
        <TouchableOpacity onPress={() => this.props.navigateToAdoptionView({ animal, showEdit: false })}>
          <View style={styles.cardItem}>
            <Image source={{ uri: this.getAnimalImageUri(animal) }} style={styles.imageStyle} />
            <Text style={styles.nameStyle}>{animal.name}</Text>
            <Text style={styles.descriptionCardItem}>{animal.breed}</Text>
          </View>
        </TouchableOpacity>
      </View>
    });
  }

  render() {
    return (
      <View style={styles.Background}>
        <View style={styles.head}>
          <Text style={styles.titlePhets}>PHETS</Text>
          <View style={styles.contentHead}>
            <Text style={styles.titleAdopta}>{AdoptionStrings.title}</Text>
            <FontAwesomeIcon icon={faFilter} size={20} color={"#FFF"} />
          </View>
        </View>
        <ScrollView style={styles.Body}>
          <View style={styles.Cards}>
            {this._renderAnimals()}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#77A6F7",
  },

  head: {
    paddingRight: 10,
    height: height * 0.15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Body: {
    height: height * 0.85,
    backgroundColor: '#EAEDED',
    paddingBottom: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titlePhets: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: "#fff",
  },
  titleAdopta: {
    fontSize: 20,
    color: "#FFF"
  },
  contentHead: {
    paddingTop: 5,
    flexDirection: "row",
    justifyContent: "space-between"
  },
  itemMenu: {
    fontSize: 17,
    marginTop: 8,
    color: "#FFF",
    marginRight: 20
  },
  Cards: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 10
  },
  containerCardItem: {
    borderRadius: 10,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    width: width * 0.5,
    minHeight: width * 0.5
  },
  cardItem: {
    borderRadius: 6,
    paddingBottom: 10,
    alignContent: "center",
    backgroundColor: "#FFF"
  },
  imageStyle: {
    width: width * 0.5 - 30,
    height: width * 0.4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nameStyle: {
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: width * 0.03
  },
  descriptionCardItem: {
    textAlign: "center",
    fontSize: width * 0.02
  },
  button: {
    marginTop: 10,
    width: width * 0.3,
    marginLeft: width * 0.1 - 16,
    height: 25,
  }
})

export default AdoptionAllScreen;