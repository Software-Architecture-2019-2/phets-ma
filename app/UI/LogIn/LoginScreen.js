import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions } from "react-native";

import Spinner from 'react-native-loading-spinner-overlay';
import { Button, Input } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';
import { strings } from './LoginStrings';

const { height, width } = Dimensions.get('window');

class LogInScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false,
      correct: false,
      incomplete: false
    }
  }

  handleSubmit() {
    if (this.state.username.trim().length != 0 && this.state.password.trim().length != 0) {
      var user = {
        username: this.state.username,
        password: this.state.password
      };

      if (this.state.submitted && !this.state.correct) {
        return;
      }

      this.setState({
        username: "",
        password: "",
      });

      const result = this.props.tryLogin(user);
      if (result) {
        this.setState({
          submitted: true,
          correct: user.username.length != 0 && user.password.length != 0
        });
      }
    } else {
      this.setState({
        incomplete: true
      });
    }
  }

  renderLoadingSpinner() {
    if (this.props.isLoggingIn) {
      return <Spinner
        visible={true}
        textContent={"Loading..."}
        animation='slide'
      />
    }
    return null
  }

  setUsername(username) {
    this.setState({
      username: username,
      incomplete: false
    })
    this.props.setInvalidUser()
  }

  setPassword(password) {
    this.setState({
      password: password,
      incomplete: false
    })
    this.props.setInvalidUser()
  }

  render() {
    return (
      <View style={styles.Background}>
        {this.renderLoadingSpinner()}
        <ScrollView>
          <View style={styles.Superior}>
            <Text style={styles.Name}>{strings.name}</Text>
            <Text style={styles.Tagline}>{strings.tagline}</Text>
          </View>
          <View style={styles.Body}>
            <Text style={styles.Titles}>{strings.login}</Text>
            <Text style={styles.subTitles}>{strings.text}</Text>
            <View style={{ marginTop: 25 }}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder={strings.username}
                onChangeText={(username) => this.setUsername(username)}
                value={this.state.username}
                leftIcon={<FontAwesomeIcon icon={faUser} size={18} color={"gray"}
                  style={{ marginLeft: -5, marginRight: 10, }} />}
                inputContainerStyle={{ borderWidth: 1, borderColor: "gray", borderRadius: 5 }}
                leftIconContainerStyle={{ borderRightWidth: 1, borderColor: "gray" }}
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder={strings.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setPassword(password)}
                value={this.state.password}
                leftIcon={<FontAwesomeIcon icon={faKey} size={18} color={"gray"}
                  style={{ marginLeft: -5, marginRight: 10, }} />}
                inputContainerStyle={{ borderWidth: 1, borderColor: "gray", borderRadius: 5 }}
                leftIconContainerStyle={{ borderRightWidth: 1, borderColor: "gray" }}
              />
            </View>
            {this.props.getInvalidUser() &&
              <Text style={{ paddingLeft: 5, paddingRight: 5, marginTop: 20, color: "red" }}>{strings.invalid}</Text>}
            {this.state.incomplete &&
              <Text style={{ paddingLeft: 5, paddingRight: 5, marginTop: 20, color: "red" }}>{strings.fill_all}</Text>}
            <View style={{ paddingLeft: 75, paddingRight: 75, marginTop: 20 }}>
              <Button
                onPress={() => this.handleSubmit()}
                buttonStyle={{ marginTop: 20, backgroundColor: '#77A6F7' }}
                title={strings.login}
              />
            </View>
            <View>
              <Button
                onPress={() => this.props.changeToSignUp()}
                buttonStyle={{ marginTop: 20 }}
                titleStyle={{ color: '#77A6F7' }}
                title={strings.register}
                type="clear"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#77A6F7"
  },
  Superior: {
    height: height * 0.25,
    justifyContent: 'center',
    alignItems: "center",
  },
  Body: {
    minHeight: height * 0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingLeft: 30,
    paddingRight: 30
  },
  Name: {
    fontSize: width * 0.12,
    fontWeight: "bold",
    color: '#fff',
  },
  Titles: {
    fontSize: width * 0.08,
    textAlign: 'center',
    fontWeight: "bold",
    color: '#77A6F7',
  },
  Tagline: {
    color: '#FFCCBC',
    fontSize: width * 0.05
  },
  subTitles: {
    marginTop: 5,
    fontSize: width * 0.04,
    textAlign: 'center',
  },
})

export default LogInScreen;