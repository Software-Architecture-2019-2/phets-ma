import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { Button, Input,  Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faSearch }from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class ChatInitialScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <View style={styles.head}>
          <View styles={styles.Container}>
            <View>
              <Text style={styles.Titles}>Phets</Text>
            </View>
            <View>
              {/*<FontAwesomeIcon icon={faSearch} size={20} color={"black"} />*/}
            </View>
          </View>
          <ScrollView horizontal={true} style={styles.scrollH}>
            <View style={styles.MarginRight}>
              <Avatar
                rounded
                size={width*0.17}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
            </View>
            <View style={styles.MarginRight}>
              <Avatar
                rounded
                size={width*0.17}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
                }}
              />
            </View>
            <View style={styles.MarginRight}>
              <Avatar
                rounded
                size={width*0.17}
                source={{
                  uri:
                    'https://pbs.twimg.com/media/D0jV-y3X0AAcnJj.jpg',
                }}
              />
            </View>
            <View style={styles.MarginRight}>
              <Avatar
                rounded
                size={width*0.17}
                source={
                  require('../../Images/08.jpg')
                }
              />
            </View>
          </ScrollView>
        </View>
        <View style = {styles.Body}>
          <ScrollView>
            <View style={styles.Chat}>
              <Avatar
                rounded
                size={width*0.15}
                source={{
                  uri:
                    'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                }}
              />
              <View style= {styles.Data}>
                <View style={styles.BorderBottom}>
                  <Text style={styles.NameChat}>Lady</Text>
                  <Text style={styles.TextChat}>Hola</Text>
                </View>
              </View>
            </View>
            <View style={styles.Chat}>
              <Avatar
                rounded
                size={width*0.15}
                source={{
                  uri:
                    'https://pbs.twimg.com/media/D0jV-y3X0AAcnJj.jpg',
                }}
              />
              <View style= {styles.Data}>
                <View style={styles.BorderBottom}>
                  <Text style={styles.NameChat}>JK Simmons</Text>
                  <Text style={styles.TextChat}>Quiero fotos del hombre araña!</Text>
                  </View>
              </View>
            </View>
            <View style={styles.Chat}>
              <Avatar
                rounded
                size={width*0.15}
                source={{
                  uri:
                    'https://66.media.tumblr.com/0dcc9f67fe31f5bae734f15fa1ad9f59/tumblr_n9mwvn1Zwn1qi5069o1_400.png',
                }}
              />
              <View style= {styles.Data}>
                <View style={styles.BorderBottom}>
                  <Text style={styles.NameChat}>Mateito</Text>
                  <Text style={styles.TextChat}>Lo veo paila mi perro</Text>
                </View>
              </View>
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
  Container: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: "row",
  },
  Superior: {
    height: height*0.3,
    justifyContent: 'center',
    alignItems: "center",
  },
  head:{
    paddingTop: 10,
    paddingRight: 10,
    height: height*0.25
  },
  Body: {
    height: height*0.75,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
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
    marginTop: 15
  },
  Data: {
    paddingLeft: 25,
  },
  NameChat: {
    fontSize: width*0.04,
    fontWeight:"bold",
    marginTop: 5
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
  }

})

export default ChatInitialScreen;