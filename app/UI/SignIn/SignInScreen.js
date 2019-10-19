import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input} from 'react-native-elements';

const {height, width} = Dimensions.get('window');

class SignInScreen extends Component{
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
            <Text style={styles.Titles}>Registrarse</Text>
          </View>
          <View style={styles.Body}>
            <Input
              placeholder='Name'
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder='Email'
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder='Password'
              secureTextEntry={true}
            />
            <Input
              inputStyle={{marginTop: 20}}
              placeholder='Confirm password'
              secureTextEntry={true}
            />
            <View style={{paddingLeft: 75, paddingRight: 75, marginTop:20}}>
              <Button
                onPress={() => this.props.changeToLobby()}
                buttonStyle={{marginTop: 20, backgroundColor: '#CD0B25'}}
                title="Registrarse"
              />
            </View>
            <View>
              <Button
              onPress={() => this.props.chageToLogIn()}
                buttonStyle={{marginTop: 20}}
                titleStyle={{color: '#CD0B25'}}
                title="Iniciar Sesión"
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
    backgroundColor: "#CD0B25"
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

export default SignInScreen;
