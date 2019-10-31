import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions,  TextInput, TouchableOpacity,} from "react-native";

import { Button, Image, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';  
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const { height, width } = Dimensions.get('window');

import { EventsStrings } from "./ListEventString";
import { GeneralStyles } from "../../styles/GeneralStyle";

class LobbyComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      showCalendar: false,
    }
  }

  handleOnOpenCalendar = () => {
    this.setState({ showCalendar: true })
  }

  onDate(date){
    this.setState({date: date,
      showCalendar: false})
  }

  _renderTitle() {
    if (this.props.getType()) {
      return <Text style={styles.titlePhets}>{EventsStrings.edit}</Text>
    }else{
      return <Text style={styles.titlePhets}>{EventsStrings.create}</Text>
    }
  }

  _renderOptions() {
    if (this.props.getType()) {
      /* Boton para guardar cambios de eventos */
      return <View style={styles.button}>
      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: '#FFF' }}
        buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width*0.5 }]}
        title={"Save"}
        onPress={() => this.props.editEvent()}
      />

      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: '#FFF' }}
        buttonStyle={[GeneralStyles.BlueColor, { marginTop: 20, width: width*0.5 }]}
        title={"Delete"}
        onPress={() => this.props.removeEvent()}
      />
    </View>
    }else{
      /* Boton para crear eventos */
      return <View style={styles.button}>
      <Button
        buttonStyle={styles.button}
        titleStyle={{ color: '#FFF' }}
        buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width*0.5 }]}
        title={"Create"}
        onPress={() => this.props.createEvent()}
      />
    </View>
    }
  }

  setDate = (_, date) => {
    if (date) {
      this.setState({ date: date.toISOString().substring(0, 10), showCalendar: false })
      this.props.setDate(date.toISOString().substring(0, 10))
    }
  }

  render(){
    return(
      <View style = {styles.Background}>
        <View style={styles.head}>
        {this._renderTitle()}
        </View>
        <ScrollView style={styles.Body}>
            <View Style={{paddingLeft: 20, paddingRight: 20}}>
              <Input
                name="username"
                placeholder={EventsStrings.subject}
                onChangeText={(subject) => this.props.setSubject(subject)}
                value={this.state.username}
                inputStyle={{width: width*0.5}}
                >
                {this.props.isEditionForm ? this._animal.breed : ''}
              </Input>

              <TextInput
                style={{ height: 100, borderColor: 'gray', borderWidth: 1, marginTop: 20, width: width*0.8,
                marginLeft: width*0.05 }}
                onChangeText={(description) => this.props.setDescription(description)}
                value={this.setState.description}
                placeholder="Description..."
              />
            </View>
            <TouchableOpacity onPress={this.handleOnOpenCalendar}>
              <Input
                placeholder="Fech"
                label="Fecha"
                disabled={true}
                leftIcon={
                  <FontAwesomeIcon icon={faCalendarAlt} />
                }
                >
                  {this.state.date}
                </Input>
            </TouchableOpacity>
            {this.state.showCalendar && <DateTimePicker
              value={new Date()}
              mode='date'
              display="calendar"
              onChange={this.setDate}
              minimumDate={new Date(1990, 0, 1)}
            />}
            {this._renderOptions()}
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
    backgroundColor: '#FFF',
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