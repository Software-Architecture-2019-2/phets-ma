import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input} from 'react-native-elements';
import {strings} from './SignUpStrings';

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
            <Text style={styles.Titles}>{strings.register_title}</Text>
          </View>
          <View style={styles.Body}>
            <Input
              placeholder= {strings.first_name}
              onChangeText={(firstName) => this.setState({firstName})}
              value={this.state.firstName}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.last_name}
              onChangeText={(lastName) => this.setState({lastName})}
              value={this.state.lastName}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.username}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.email}
              onChangeText={(email) => this.setState({email})}
              value={this.state.email}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.password}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.confirm_password}
              secureTextEntry={true}
              onChangeText={(confirmPassword) => this.setState({confirmPassword})}
              value={this.state.confirmPassword}
            />
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
    height: height*0.2,
    justifyContent: 'center',
    alignItems: "center",
  },
  Body: {
    minHeight: height*0.7,
    backgroundColor: '#fff',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 50,
    paddingLeft: 40,
    paddingRight: 40
  },
  Titles: {
    fontSize: width*0.1,
    color: '#fff',
  },

})

export default SignUpScreen;
