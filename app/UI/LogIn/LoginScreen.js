import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input} from 'react-native-elements';
import {strings} from './LoginStrings';

const {height, width} = Dimensions.get('window');

class LogInScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      submitted: false,
      correct: false
    }
  }

  handleSubmit(){

    var user = {
      username: this.state.username,
      password: this.state.password
    };

    if(this.state.submitted && !this.state.correct){
      return;
    }

    this.setState({
      username: "",
      password: "",
      correct: user.username.length != 0 && user.password.length != 0
    });

    const result = this.props.tryLogin(user);

    if(result){
      this.setState({
        submitted: true,
        correct: user.username.length != 0 && user.password.length != 0
      });
    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <ScrollView>
          <View style={styles.Superior}>
            <Text style={styles.Titles}>{strings.login_title}</Text>
          </View>
          <View style={styles.Body}>
           <Input
              name="username"
              placeholder={strings.username}
              onChangeText={(username) => this.setState({username})}
              value={this.state.username}
            />
            <Input
              name="password"
              inputStyle={{marginTop: 20}}
              placeholder= {strings.password}
              secureTextEntry={true}
              onChangeText={(password) => this.setState({password})}
              value={this.state.password}
            />
            {this.state.submitted && !this.state.correct &&
            <Text style={{paddingLeft: 5, paddingRight: 5, marginTop:20, color:"red"}}>{strings.fill_all}</Text>}
            <View style={{paddingLeft: 75, paddingRight: 75, marginTop:20}}>
              <Button
                onPress={() => this.handleSubmit()}
                buttonStyle={{marginTop: 20, backgroundColor: '#77A6F7'}}
                title= {strings.login}
              />
            </View>
            <View>
              <Button
              onPress={() => this.props.changeToSignUp()}
                buttonStyle={{marginTop: 20}}
                titleStyle={{color: '#77A6F7'}}
                title= {strings.register}
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
    height: height*0.3,
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

export default LogInScreen;