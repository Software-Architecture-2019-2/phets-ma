import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions} from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faFilter, faRedoAlt, faTimes, faHeart, faStar} from '@fortawesome/free-solid-svg-icons'
import { Image } from 'react-native';

const {height, width} = Dimensions.get('window');

class PhetsInitialScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <ScrollView>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 20}}>
            <View>
              <Text style ={styles.Titles}>Descubre</Text>
            </View>
            <View>
             <FontAwesomeIcon icon={ faFilter } size = { width*0.08 } color = {'#FFCCBC'} style={{marginTop: 15}}/>
            </View>
          </View>
          <View style = {{backgroundColor: "#FFF", borderRadius: 15, marginLeft: width*0.05, height: height*0.75, width: width*0.9}}>
            <View style={{position: "absolute", top: height*0.56, flex: 1, alignSelf: "center", flexDirection: 'row', justifyContent: 'space-around'}}>
              <View style={{width: 50, height: 50, borderRadius:25, zIndex: 100, padding: 12, backgroundColor: '#FFF', marginTop: 5,
            shadowColor: "#000", shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 5,}}>
                <FontAwesomeIcon icon={ faRedoAlt } size = { 26 } color = {'#FFCCBC'}/>
              </View>
              <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', padding: 10, zIndex: 100, marginLeft: 20,
            shadowColor: "#000", shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 5,}}>
                <FontAwesomeIcon icon={ faTimes } size = { 40 } color = {'gray'} />
              </View>
              <View style={{width: 60, height: 60, borderRadius: 30, backgroundColor: '#FFF', padding: 10, zIndex: 100, marginLeft: 20,
            shadowColor: "#000", shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 5,}}>
                <FontAwesomeIcon icon={ faHeart } size = { 40 } color = {'red'}/>
              </View>
              <View style={{width: 50, height: 50, borderRadius:25, zIndex: 100, padding: 12, backgroundColor: '#FFF', marginTop: 5, marginLeft: 20,
            shadowColor: "#000", shadowOpacity: 0.23, shadowRadius: 2.62, elevation: 5,}}>
                <FontAwesomeIcon icon={ faStar } size = { 26 } color = {'#00887A'}/>
              </View>
            </View>
            <Image
              source={require("../../Images/gato.png")}
              style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15, width: width*0.9, height: height*0.6 }}
            />
            <Text style={{marginTop:40, textAlign: "center", fontSize: width*0.06, fontWeight: 'bold'}}>Kiara, Tekir</Text>
            <Text style={{marginTop:5, textAlign: "center", fontSize: width*0.04, color: 'gray'}}>Bogotá. Cundinamarca</Text>
          </View>
          <View style={{height: height*0.015, width: width*0.84, marginLeft: width*0.08, backgroundColor: 'rgba(255,255,255,0.8)', 
          borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}></View>
          <View style={{height: height*0.015, width: width*0.78, marginLeft: width*0.11, backgroundColor: 'rgba(255,255,255,0.4)', 
          borderBottomLeftRadius: 15, borderBottomRightRadius: 15}}></View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#00887A"
  },
  Shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
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
    fontSize: width*0.1 ,
    color: '#FFF',
  },
  TextCenter: {
    alignItems: 'center',
  }

})

export default PhetsInitialScreen;