import React, { Component } from "react";
import { View, StyleSheet, ScrollView, Text, Dimensions, Picker} from "react-native";

import { Button, Input} from 'react-native-elements';
import {strings} from './SignUpStrings';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGlobeAmericas, faCity, faMapMarkerAlt} from '@fortawesome/free-solid-svg-icons';

const {height, width} = Dimensions.get('window');

class SignUpInitialScreen extends Component{
  constructor(props){
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      country: "",
      city: "",
      address: "",
      selectedCountryValue: "-1",
      selectedCountryIndex: -1,
      incomplete: false
    }
  }

  handleSubmit(){
    let temp = false
    if(this.state.firstName.trim().length == 0)temp = true
    if(this.state.lastName.trim().length == 0)temp = true
    if(this.state.country.trim().length == 0)temp = true
    if(this.state.city.trim().length == 0)temp = true
    if(this.state.address.trim().length == 0)temp = true
    if(temp){
      this.setState({incomplete: true})
      return
    }
    var user={
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      country: this.state.country,
      city: this.state.city,
      address: this.state.address
    }
    this.props.setUser(user)
    
  }

  _handleOnChangePicker = (itemValue, itemIndex) => {
    this.setState({ selectedCountryValue: itemValue, selectedCountryIndex: itemIndex - 1 })
  };

  _renderCountriesPicker() {
    return (
      <View style={{borderWidth: 1, borderColor: "gray", padding: 0, marginLeft: 10, marginRight: 10,
      borderRadius: 5, flexDirection: "row", alignItems: "center", marginTop: 25}}>
        <View style={{borderRightWidth: 1, borderColor: "gray", alignItems: "center", height: 40, width: 39,
      justifyContent: 'center'}}>
          <FontAwesomeIcon icon={faGlobeAmericas} size={18} color={"gray"}/>
        </View>
        <Picker
          style={{ height: 40, width: Dimensions.get('window').width / 1.5, margin: 0 }}
          chan
          onValueChange={this._handleOnChangePicker}
          selectedValue={this.state.selectedCountryValue}
          prompt={strings.country}>
          <Picker.Item label={strings.pickerDefault} value="-1" key="-1" />
          {
            this.props.countries.map((country) => {
              return <Picker.Item label={country.name} value={`${country.id}`} key={`${country.id}`} />
            })
          }
        </Picker>
      </View>
    )
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
                onChangeText={(firstName) => this.setState({firstName: firstName, incomplete: false})}
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
                onChangeText={(lastName) => this.setState({lastName: lastName, incomplete: false})}
                value={this.state.lastName}
                leftIcon={<FontAwesomeIcon icon={faUser} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            {this._renderCountriesPicker()}
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.city}
                onChangeText={(city) => this.setState({city: city, incomplete: false})}
                value={this.state.city}
                leftIcon={<FontAwesomeIcon icon={faCity} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            <View style={{marginTop: 25}}>
              <Input
                inputStyle={{ padding: 0, paddingLeft: 10 }}
                placeholder= {strings.address}
                onChangeText={(address) => this.setState({address: address, incomplete: false})}
                value={this.state.address}
                leftIcon={<FontAwesomeIcon icon={faMapMarkerAlt} size={18} color={"gray"} 
                style={{marginLeft: -5, marginRight: 10,}}/>}
                inputContainerStyle={{borderWidth: 1, borderColor: "gray", borderRadius: 5}}
                leftIconContainerStyle={{borderRightWidth: 1, borderColor: "gray"}}
              />
            </View>
            {this.state.incomplete &&
            <Text style={{paddingLeft: 5, paddingRight: 5, marginTop:20, color:"red"}}>{strings.fill_all}</Text>}
            <View style={{paddingLeft: 75, paddingRight: 75, marginTop:20}}>
              <Button
                onPress={() => this.handleSubmit()}
                buttonStyle={{marginTop: 20, backgroundColor: '#77A6F7'}}
                title= {strings.continue}
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
    minHeight: height*0.8,
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

export default SignUpInitialScreen;
