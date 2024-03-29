import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input} from 'react-native-elements';
import {strings} from './SignUpStrings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faEnvelope, faKey } from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class SignUpScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      submitted: false,
      correct: false
    }
  }

  handleSubmit(){

    this.setState({
      submitted: true,
      correct: this.state.password != "" && (this.state.password == this.state.confirmPassword)
    });

    var user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      username: this.state.username,
      password: this.state.password,
      email: this.state.email
    };

    if(this.state.submitted && !this.state.correct){
      return;
    }

    this.props.tryRegister(user);
  }

  render(){
    return(
      <View style={styles.Background}>
        <ScrollView>
          <View style={styles.Superior}>
            <Text style={styles.Name}>{strings.name}</Text>
            <Text style={styles.Tagline}>{strings.tagline}</Text>
          </View>
          <View style={styles.Body}>
            <Text style={styles.Titles}>{strings.register}</Text>
            <Text style={styles.subTitles}>{strings.text}</Text>
            <View style={{marginTop: 25}}>
              <Input
                placeholder= {strings.first_name}
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                onChangeText={(firstName) => this.setState({firstName})}
                value={this.state.firstName}
                leftIcon={<FontAwesomeIcon icon={faUser} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.last_name}
                onChangeText={(lastName) => this.setState({lastName})}
                value={this.state.lastName}
                leftIcon={<FontAwesomeIcon icon={faUser} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.username}
                onChangeText={(username) => this.setState({username})}
                value={this.state.username}
                leftIcon={<FontAwesomeIcon icon={faUser} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.email}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                leftIcon={<FontAwesomeIcon icon={faEnvelope} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.password}
                secureTextEntry={true}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                leftIcon={<FontAwesomeIcon icon={faKey} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.confirm_password}
                secureTextEntry={true}
                onChangeText={(confirmPassword) => this.setState({confirmPassword})}
                value={this.state.confirmPassword}
                leftIcon={<FontAwesomeIcon icon={faKey} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            {this.state.submitted && !this.state.correct &&
            <Text style={{paddingLeft: 5, paddingRight: 5, marginTop:20, color:"red"}}>{strings.passwords_dont_match}</Text>}
            <View style={{paddingLeft: 75, paddingRight: 75, marginTop:20}}>
              <Button
                onPress={() => this.handleSubmit()}
                buttonStyle={{marginTop: 20, backgroundColor: '#77A6F7'}}
                title= {strings.register_title}
              />
            </View>
            <View>
              <Button
              onPress={() => this.props.chageToLogIn()}
                buttonStyle={{marginTop: 20}}
                titleStyle={{color: '#77A6F7'}}
                title= {strings.login}
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
    height: height*0.25,
    justifyContent: 'center',
    alignItems: "center",
  },
  Body: {
    minHeight: height*0.75,
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
    fontSize: width*0.05
  },
  subTitles: {
    marginTop: 5,
    fontSize: width * 0.04,
    textAlign: 'center',
  },

})

export default SignUpScreen;
