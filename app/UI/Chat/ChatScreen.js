import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input,  Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faSearch }from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class ChatScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <View style={styles.head}>
          <View style={styles.Chat}>
            <View style={styles.DirectionRow}>
              <Avatar
                rounded
                size={height*0.06}
                source={{
                  uri:
                    'https://66.media.tumblr.com/0dcc9f67fe31f5bae734f15fa1ad9f59/tumblr_n9mwvn1Zwn1qi5069o1_400.png',
                }}
              />
              <View style={styles.Data}>
                <Text style={styles.NameChat}>Mateito</Text>
              </View>
            </View>

          </View>
        </View>
        <View style = {styles.Body}>
          <ScrollView>
          <View style={{height: height*0.75}}>
            
          </View>
            <View style={{}}>
            <Input
                name="username"
                placeholder={"Escribe..."}
              />
          </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#FFCCBC",
  },

  head:{
    paddingTop: height*0.02,
    paddingRight: 10,
    height: height*0.1
  },
  Body: {
    height: height*0.9,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 60
  },
  Titles: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: width*0.1,
    color: '#fff',
  },
  TextCenter: {
    alignItems: 'center',
  },
  MarginRight: {
    marginRight: 20
  },
  scrollH: {
    paddingLeft: 20,
    paddingTop: width*0.16/2
  },
  Chat: {
    flexDirection: "row", 
    marginTop: 5,
    marginLeft: 15,
  },
  Data: {
    paddingLeft: 20,
  },
  NameChat: {
    fontSize: width*0.06,
    marginTop: height*0.01,
  },
  TextChat: {
    color: "gray",
    marginTop: 10,
  },
  BorderBottom:{
    paddingBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: width*0.6
  },
  DirectionRow:{
    flexDirection: "row",
  }

})

export default ChatScreen;