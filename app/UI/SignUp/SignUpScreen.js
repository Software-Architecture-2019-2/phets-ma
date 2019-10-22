import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input} from 'react-native-elements';
import {strings} from './strings';

const {height, width} = Dimensions.get('window');

class SignUpScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
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
              placeholder= {strings.name}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.username}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.email}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.password}
              secureTextEntry={true}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.confirm_password}
              secureTextEntry={true}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.country}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder= {strings.city}
            />
            <View style={{paddingLeft: 75, paddingRight: 75, marginTop:20}}>
              <Button
                onPress={() => this.props.changeToLobby()}
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
    height: height*0.15,
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
