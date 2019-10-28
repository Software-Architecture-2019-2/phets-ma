import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Image,Dimensions,} from "react-native";

import { Button, Input,  Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faFilter }from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class AdoptionAllScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <View style={styles.head}>
          <Text style={styles.titlePhets}>PHETS</Text>
          <View style={styles.contentHead}>
            <Text style={styles.titleAdopta}>Adopta una mascota</Text>
            <FontAwesomeIcon icon={faFilter} size={20} color={"#FFF"} />
          </View>
          <ScrollView horizontal={true}>
            <Text style={styles.itemMenu}>Gatos</Text>
            <Text style={styles.itemMenu}>Perros</Text>
            <Text style={styles.itemMenu}>Osos</Text>
            <Text style={styles.itemMenu}>Delfines</Text>
            <Text style={styles.itemMenu}>Leones</Text>
            <Text style={styles.itemMenu}>Loros</Text>
            <Text style={styles.itemMenu}>Canarios</Text>
          </ScrollView>
        </View>
        <ScrollView style={styles.Body}>
          <View style={styles.Cards}>
            {this.props.getAninals().map((item, index) => (
              <View style={styles.containerCardItem}>
                <View style={styles.cardItem}>
                  <Image source={item.image} style={styles.imageStyle} />
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={styles.descriptionCardItem}>{item.city}</Text>
                  <Button
                    onPress={() => this.props.selectAnimalView(item.id)}
                    buttonStyle={styles.button}
                    titleStyle={{color: '#FFF'}}
                    title= {"Adoptar"}
                  />
                </View>
              </View>
            ))}
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

  head:{
    paddingRight: 10,
    height: height*0.15,
    paddingLeft: 15,
    paddingRight: 15,
  },
  Body: {
    height: height*0.85,
    backgroundColor: '#EAEDED',
    paddingBottom: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  titlePhets:{
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
    width: width*0.5,
    minHeight: width*0.5
  },
  cardItem: {
    borderRadius: 6,
    paddingBottom: 10,
    alignContent: "center",
    backgroundColor: "#FFF"
  },
  imageStyle:{
    width: width*0.5-30,
    height: width*0.4,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  nameStyle:{
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    fontSize: width*0.03
  },
  descriptionCardItem: {
    textAlign: "center",
    fontSize: width*0.02
  },
  button: {
    marginTop: 10,
    width: width*0.3,
    marginLeft: width*0.1-16,
    height: 25,
  }
})

export default AdoptionAllScreen;