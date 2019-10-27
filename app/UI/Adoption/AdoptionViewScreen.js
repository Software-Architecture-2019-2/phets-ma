import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Image,Dimensions,} from "react-native";

import { Button, Input,  Avatar } from 'react-native-elements';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faFilter }from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class AdoptionViewScreen extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  render(){
    return(
      <View style={styles.Background}>
        <View style={styles.Image}>
          <Image source={this.props.getAninals().image} style={styles.ImageStyle} />
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.nameStyle}>{this.props.getAninals().name}</Text>
          <Text>{this.props.getAninals().city}</Text>
          <Text style={styles.Title}>Acerca de mi</Text>
          <Text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
          </Text>
          <Text style={styles.Title}>Datos</Text>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>Edad:</Text>
            <Text>2 años</Text>
          </View>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>Peso:</Text>
            <Text>10K</Text>
          </View>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>Raza:</Text>
            <Text>No se</Text>
          </View>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>Dato:</Text>
            <Text>Respuesta</Text>
          </View>
          <Text style={styles.Title}>Un mascota</Text>
          <Text>
          Incorpora una mascota en tu vida puede ser una decisión muy gratificante para ambos. Las mascotas son excelentes compañeros, independientes, inquietos, curiosos,
          y ansiosos por recibir tu mimos y caricias.
          </Text>
          <Text style={styles.Title}>Comunicate para adoptar</Text>
          <Text>
          Si estas seguro de adoptar esta mascota, haz click a continuación para crear el canal de comunicación donde podras saber los paso que tienes que seguir para adptar la mascota.
          </Text>
          <Button
            buttonStyle={styles.button}
            titleStyle={{color: '#FFF'}}
            title= {"Contactar"}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  Image: {
    padding: 15
  },
  ImageStyle: {
    width: width-30,
    height: height*0.5,
    borderRadius: 10
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameStyle: {
    fontSize: width*0.06,
    fontWeight: "bold",
  },
  Title:{
    marginTop: 10,
    marginBottom: 5,
    fontSize: width*0.04,
    fontWeight: "bold"
  },
  ContentData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  NameData: {
    fontWeight: "bold",
    fontSize: width*0.03
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: width*0.5,
    marginLeft: width*0.25-20
  }
})

export default AdoptionViewScreen;