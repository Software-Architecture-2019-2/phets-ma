import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, TouchableOpacity,} from "react-native";

import { Button, Image } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircle, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';

const { height, width } = Dimensions.get('window');

import { EventsStrings } from "./ListEventString";

class ListEventScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      events: [
        {
          "id": "1",
          "subject": "Cita de rutinas para vacunas",
          "description": "Asistir a la cita de vacunas pendiente",
          "date": "2019-11-21 14:20",
          "animal_id": "1",
          "created_at": "2019-10-08",
          "updated_at": "2019-10-08"
        },
        {
          "id": "1",
          "subject": "Cita Veterinario",
          "description": "Asistir a la cita para la ultima vacuna",
          "date": "2019-12-21 07:20",
          "animal_id": "1",
          "created_at": "2019-10-20",
          "updated_at": "2019-10-20"
        }
      ]
    }
  }

  render(){
    return(
      <View style = {styles.Background}>
        <View style={styles.head}>
          <Text style={styles.titlePhets}>{EventsStrings.events}</Text>
        </View>
        <ScrollView style={styles.Body}>

            <View style={styles.titleBack}>
              <Text style={styles.title}>{EventsStrings.upcoming}</Text>
            </View>
            {this.state.events.map((event) => (
              <View style={styles.rowBetween}>
                <View style={styles.row}>
                  <View style={{justifyContent: "center"}}>
                    <FontAwesomeIcon icon={faCircle} size={20} color={"#77A6F7"} />
                  </View>
                  <View>
                    <Text style={styles. titleEvent}>{event.subject}</Text>
                    <Text style={styles.bodyEvent}>{event.description}</Text>
                  </View>
                </View>
                <View>
                  <FontAwesomeIcon icon={faChevronRight} size={20} color={"#77A6F7"} onPress = {() => this.props.showEvent({event})} />
                </View>
              </View>
            ))}
            
            
            <View style={styles.button}>
              <Text style={styles.titleBlack}>{EventsStrings.create}</Text>
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

export default ListEventScreen;