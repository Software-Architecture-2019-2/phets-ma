import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, } from "react-native";

import { Button } from 'react-native-elements';
import { SliderBox } from 'react-native-image-slider-box';
import DialogInput from 'react-native-dialog-input';

import { FILES_MS_URI } from "../../services/utils";
import { AnimalStrings } from "./AnimalViewStrings";
import { GeneralStyles } from "../../styles/GeneralStyle";

const { height, width } = Dimensions.get('window');

class AnimalViewScreen extends Component {
  constructor(props) {
    super(props);
    this.animal = this.props.animal;
    this.state = {
      isDialogVisible: false
    }
  }

  _getPhotosUris(media) {
    return media.map((photo, _) => {
      return `${FILES_MS_URI}\\${photo}`
    })
  }

  _renderImagesCarousel() {
    if (this.animal.media) {
      return <View>
        <SliderBox
          images={this._getPhotosUris(this.animal.media)}
          sliderBoxHeight={height * 0.5}
          parentWidth={width - 30}
        />
      </View>
    }
  }

  _getAnimalAge(birthdate) {
    const year = parseInt(birthdate.slice(0, 4));
    const month = parseInt(birthdate.slice(5, 7));
    const day = parseInt(birthdate.slice(8, 10));
    const now = new Date();
    return {
      years: Math.abs(year - now.getFullYear()),
      months: Math.abs(month - (now.getMonth() + 1)),
      days: Math.abs(day - now.getDate()),
    };
  }

  _renderAge(birthdate) {
    if (birthdate) {
      const age = this._getAnimalAge(birthdate);
      return `${age.years} ${AnimalStrings.years}, ${age.months} ${AnimalStrings.months}, ${age.days} ${AnimalStrings.days}`;
    } else return AnimalStrings.unknown;
  }

  _renderGender(gender) {
    return gender ? AnimalStrings.female : AnimalStrings.male;
  }

  renderOptions() {
    if (this.props.showEditButton) {
      return <View>
        <Button
          buttonStyle={styles.button}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width * 0.5, marginLeft: width * 0.2 }]}
          title={AnimalStrings.edit}
          onPress={() => this.props.navigateToEdit()}
        />

        <Button
          buttonStyle={[styles.button, { marginTop: 20 }]}
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10, width: width * 0.5, marginLeft: width * 0.2 }]}
          title={AnimalStrings.event}
          onPress={() => this.props.navigateToListEvents()}
        />
      </View>
    } else {
      return <View>
        <Text style={styles.Title}>Una mascota</Text>
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
          titleStyle={{ color: '#FFF' }}
          buttonStyle={[GeneralStyles.BlueColor, { marginTop: 10 }]}
          title={AnimalStrings.contact}
          onPress={() => this.showDialog(true)}
        />
        <DialogInput
          isDialogVisible={this.state.isDialogVisible}
          title={"Get in touch to adopt"}
          message={"Start talking"}
          hintInput={"Message"}
          submitInput={(inputText) => { this.props.submitMessageAndNavigate(inputText) }}
          closeDialog={() => { this.showDialog(false) }}>
        </DialogInput>
      </View>
    }
  }

  showDialog = (value) => {
    this.setState({ isDialogVisible: value })
  }


  render() {
    return (
      <View style={styles.Background}>
        <View style={styles.Image}>
          {this._renderImagesCarousel()}
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.nameStyle}>{this.animal.name}</Text>
          <Text>{this.animal.city}</Text>
          <Text style={styles.Title}>Datos</Text>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>{`${AnimalStrings.age}:`}</Text>
            <Text>{this._renderAge(this.animal.birthdate)}</Text>
          </View>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>{`${AnimalStrings.gender}:`}</Text>
            <Text>{this._renderGender(this.animal.gender)}</Text>
          </View>
          <View style={styles.ContentData}>
            <Text style={styles.NameData}>{`${AnimalStrings.breed}:`}</Text>
            <Text>{this.animal.breed || AnimalStrings.unknown}</Text>
          </View>
          {this.renderOptions()}
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
    width: width - 30,
    height: height * 0.5,
    borderRadius: 10
  },
  content: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  nameStyle: {
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  Title: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: width * 0.04,
    fontWeight: "bold"
  },
  ContentData: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5
  },
  NameData: {
    fontWeight: "bold",
    fontSize: width * 0.03
  },
  button: {
    marginTop: 10,
    marginBottom: 20,
    width: width * 0.5,
    marginLeft: width * 0.25 - 20
  }
})

export default AnimalViewScreen;