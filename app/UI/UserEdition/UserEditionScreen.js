import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, Picker, ScrollView } from "react-native";
import { Input, Image, Button } from "react-native-elements";

import ImagePicker from 'react-native-image-picker'

import { UserEditionStyles } from './UserEditionStyle';
import { UserEditionStrings } from './UserEditionStrings';
import { GeneralStyles } from "../../styles/GeneralStyle";

class UserEditionScreen extends Component {
  constructor(props) {
    super(props);
    this._user = this.props.user;
    this.state = {
      selectedCountryValue: this._user.country ? `${this._user.country.id}` : "-1",
      selectedCountryIndex: this._user.country ? this._user.country.id - 1 : -1,
      firstName: this._user.firstName,
      lastName: this._user.lastName,
      description: this._user.description,
      city: this._user.city,
      photoUri: this.props.photoUri,
      selectedPhoto: undefined,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChoosePhoto = () => {
    const options = {
      title: 'Select Avatar',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, response => {
      if (response.uri) {
        this.setState({ photoUri: response.uri, selectedPhoto: response })
      }
    })
  }

  _renderImage() {
    return <Image
      source={{ uri: this.state.photoUri }}
      style={UserEditionStyles.ProfileImage}
      PlaceholderContent={<ActivityIndicator />}
    />
  }

  _handleOnChangePicker = (itemValue, itemIndex) => {
    this.setState({ selectedCountryValue: itemValue, selectedCountryIndex: itemIndex - 1 })
  };

  _renderCountriesPicker() {
    return (
      <Picker
        style={{ height: 100, width: Dimensions.get('window').width / 2 }}
        chan
        onValueChange={this._handleOnChangePicker}
        selectedValue={this.state.selectedCountryValue}
        prompt={UserEditionStrings.country}>
        <Picker.Item label={UserEditionStrings.pickerDefault} value="-1" key="-1" />
        {
          this.props.countries.map((country) => {
            return <Picker.Item label={country.name} value={`${country.id}`} key={`${country.id}`} />
          })
        }
      </Picker>
    )
  }

  async handleSubmit() {
    const userToUpdate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this._user.email,
      username: this._user.username,
      password: this._user.password,
      description: this.state.description,
      city: this.state.city,
    };

    userToUpdate.country = this.state.selectedCountryValue !== "-1" ? {
      id: this.state.selectedCountryValue,
      name: this.props.countries[this.state.selectedCountryIndex].name
    } : this._user.country;

    if (this.state.selectedPhoto) {
      userToUpdate.media = (await this.props.uploadPhoto(this.state.selectedPhoto)).file_id
    }
    this.props.updateUser(userToUpdate);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={[UserEditionStyles.Body, { flex: 1, justifyContent: 'space-around' }]}>
            <View style={{ maxWidth: Dimensions.get('window').width, alignItems: 'center' }}>
              {this._renderImage()}
              <Button
                buttonStyle={[GeneralStyles.BlueColor, ]}
                title={UserEditionStrings.choosePhotoButton}
                onPress={this.handleChoosePhoto}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Input
                placeholder={UserEditionStrings.name}
                label={UserEditionStrings.name}
                onChangeText={(firstName) => this.setState({ firstName })}
              >
                {this._user.firstName}
              </Input>
              <Input
                placeholder={UserEditionStrings.lastName}
                label={UserEditionStrings.lastName}
                onChangeText={(lastName) => this.setState({ lastName })}
              >
                {this._user.lastName}
              </Input>
              <Input
                placeholder={UserEditionStrings.description}
                label={UserEditionStrings.description}
                onChangeText={(description) => this.setState({ description })}
                multiline={true}
              >
                {this._user.description}
              </Input>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {this._renderCountriesPicker()}
                <Input
                  placeholder={UserEditionStrings.city}
                  label={UserEditionStrings.city}
                  containerStyle={{ height: 100, width: Dimensions.get('window').width / 2 - 50 }}
                  onChangeText={(city) => this.setState({ city })}
                />
              </View>
            </View>
            <View style={{ height: 60, paddingTop: 20 }}>
              <Button
                title={UserEditionStrings.save}
                onPress={this.handleSubmit}
                buttonStyle={GeneralStyles.BlueColor}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default UserEditionScreen;