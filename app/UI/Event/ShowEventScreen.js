import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, TouchableOpacity,} from "react-native";

import { Button, Image } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const { height, width } = Dimensions.get('window');

import { EventsStrings } from "./ListEventString";

class LobbyComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      
    }
  }

  render(){
    return(
      <View style = {styles.Background}>
        <View style={styles.head}>
          <Text style={styles.titlePhets}>{EventsStrings.events}</Text>
        </View>
        <ScrollView style={styles.Body}>
           
            
            
            <View style={styles.button}>
              <Button buttonStyle={{ width: 35, paddingTop:5 }}
                icon={
                  <FontAwesomeIcon icon={faPlus} size={35} color={"#77A6F7"} />
                }
                type="clear"
                onPress={() => this.props.createEvent()}
              />
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
    height: height * 0.1,
    display: "flex",
    alignContent: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  Body: {
    minHeight: height * 0.9,
    backgroundColor: '#EAEDED',
    paddingBottom: 60,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingLeft: 15,
    paddingRight: 15,
  },
  titlePhets: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 10,
    color: "#fff",
  },
  title: {
    fontSize: 21,
    fontWeight: "bold",
    color:"#FFCCBC"
  },
  titleBlack:{
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 15
  },
  titleBack: {
    borderRadius: 10,
    backgroundColor: "#FFF",
    borderColor: "#FFCCBC",
    borderWidth: 3,
    padding: 10,
    marginTop: 10
  },
  titleEvent: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15
  },
  bodyEvent: {
    fontSize: 14,
    marginLeft: 15
  },
  row: {
    flexDirection: "row",
  },
  rowBetween:{
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#FFF",
    marginTop: 10,
    justifyContent: "space-between"
  },
  button: {
    marginTop: 50,
    marginBottom: 60,
    alignItems: "center"
    
  }
})

export default LobbyComponent;