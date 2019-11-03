import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";

import { Button, Input } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

import { EventsStrings } from "./ListEventString";
import { GeneralStyles } from "../../styles/GeneralStyle";

const { height, width } = Dimensions.get('window');

class EventFormScreen extends Component {
  constructor(props) {
    super(props);
    this.event = this.props.event;
    this.state = {
      subject: this.event ? this.event.subject : '',
      description: this.event ? this.event.description : '',
      date: this.event ? this.event.date : '',
      showCalendar: false,
    }
  }

  _renderTitle() {
    if (this.props.isEdition) {
      return <Text style={styles.titlePhets}>{EventsStrings.edit}</Text>
    } else {
      return <Text style={styles.titlePhets}>{EventsStrings.create}</Text>
    }
  }

  _renderOptions() {
    if (this.props.isEdition) {
      return <View style={styles.button}>
        <Button
          buttonStyle={styles.button}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width * 0.5 }]}
          title={EventsStrings.save}
          onPress={this.handleOnSave}
        />
        <Button
          buttonStyle={styles.button}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 20, width: width * 0.5 }]}
          title={EventsStrings.delete}
          onPress={this.props.removeEvent}
        />
      </View>
    } else {
      return <View style={styles.button}>
        <Button
          buttonStyle={styles.button}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width * 0.5 }]}
          title={EventsStrings.save}
          onPress={this.handleOnSave}
        />
      </View>
    }
  }

  handleOnOpenCalendar = () => {
    this.setState({ showCalendar: true })
  }

  handleOnSave = () => {
    if (this.state.subject && this.state.description && this.state.date) {
      const event = {
        subject: this.state.subject,
        description: this.state.description,
        date: this.state.date
      }
      if (this.props.isEdition) this.props.editEvent(event);
      else this.props.createEvent(event);
    }
  }

  setDate = (_, date) => {
    if (date) {
      this.setState({ date: date.toISOString().substring(0, 10), showCalendar: false })
    }
  }

  setSubject = (subject) => {
    this.setState({ subject })
  }

  setDescription = (description) => {
    this.setState({ description })
  }

  render() {
    return (
      <View style={styles.Background}>
        <View style={styles.head}>
          {this._renderTitle()}
        </View>
        <ScrollView style={styles.Body}>
          <View Style={{ paddingLeft: 20, paddingRight: 20 }}>
            <Input
              name={EventsStrings.subject}
              label={EventsStrings.subject}
              placeholder={EventsStrings.subject}
              onChangeText={this.setSubject}
              inputStyle={{ width: width * 0.5 }}
            >
              {this.state.subject}
            </Input>
            <Input
              onChangeText={this.setDescription}
              label={EventsStrings.description}
              placeholder={EventsStrings.description}
              multiline={true}
            >
              {this.state.description}
            </Input>
          </View>
          <TouchableOpacity onPress={this.handleOnOpenCalendar}>
            <Input
              placeholder={EventsStrings.date}
              label={EventsStrings.date}
              disabled={true}
              leftIcon={
                <FontAwesomeIcon icon={faCalendarAlt} />
              }
            >
              {this.state.date}
            </Input>
          </TouchableOpacity>
          {this.state.showCalendar && <DateTimePicker
            value={this.state.date ? new Date(this.state.date) : new Date()}
            mode='date'
            display="calendar"
            onChange={this.setDate}
            minimumDate={new Date()}
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
    color: "#FFCCBC"
  },
  titleBlack: {
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
  rowBetween: {
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

export default EventFormScreen;