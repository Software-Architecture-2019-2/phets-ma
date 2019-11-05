import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, Picker, ScrollView, StyleSheet } from "react-native";
import { Input, Image, Button } from "react-native-elements";

import ImagePicker from 'react-native-image-picker'
import Spinner from 'react-native-loading-spinner-overlay';

import { SignUpStrings } from './SignUpStrings';
import { GeneralStyles } from "../../styles/GeneralStyle";

class SignUpAditionalScreen extends Component {
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
      submitting: false,
    }
  }

  handleChoosePhoto = () => {
    const options = {
      title: SignUpStrings.profilePhotoMsg,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photoUri: response.uri, selectedPhoto: response })
      }
    })
  }

  _renderImage() {
    return <Image
      source={{ uri: this.state.photoUri }}
      style={styles.ProfileImage}
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
        prompt={SignUpStrings.country}>
        <Picker.Item label={SignUpStrings.pickerDefault} value="-1" key="-1" />
        {
          this.props.countries.map((country) => {
            return <Picker.Item label={country.name} value={`${country.id}`} key={`${country.id}`} />
          })
        }
      </Picker>
    )
  }

  handleSubmit = async () => {
    this.setState({ submitting: true })
    const userToUpdate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this._user.email,
      username: this._user.username,
      password: this._user.password,
      description: this.state.description,
      city: this.state.city,
      media: this._user.media
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
        <Spinner
          visible={this.state.submitting}
          textContent={SignUpStrings.savingLabel}
        />
        <ScrollView>
          <View style={[GeneralStyles.Body, { flex: 1, justifyContent: 'space-around' }]}>
            <View style={{ maxWidth: Dimensions.get('window').width, alignItems: 'center' }}>
              {this._renderImage()}
              <Button
                buttonStyle={[GeneralStyles.BlueColor]}
                title={SignUpStrings.choosePhotoButton}
                onPress={this.handleChoosePhoto}
              />
            </View>
            <View style={{ flex: 1, justifyContent: 'space-around' }}>
              <Input
                placeholder={SignUpStrings.name}
                label={SignUpStrings.name}
                onChangeText={(firstName) => this.setState({ firstName })}
              >
                {this._user.firstName}
              </Input>
              <Input
                placeholder={SignUpStrings.lastName}
                label={SignUpStrings.lastName}
                onChangeText={(lastName) => this.setState({ lastName })}
              >
                {this._user.lastName}
              </Input>
              <Input
                placeholder={SignUpStrings.description}
                label={SignUpStrings.description}
                onChangeText={(description) => this.setState({ description })}
                multiline={true}
              >
                {this._user.description}
              </Input>
              <View style={{ flex: 1, flexDirection: 'row' }}>
                {this._renderCountriesPicker()}
                <Input
                  placeholder={SignUpStrings.city}
                  label={SignUpStrings.city}
                  containerStyle={{ height: 80, width: Dimensions.get('window').width / 2 - 50 }}
                  onChangeText={(city) => this.setState({ city })}
                >
                  {this.state.city}
                </Input>
              </View>
            </View>
            <View style={{}}>
              <Button
                title={SignUpStrings.save}
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

export const styles = StyleSheet.create({
  ProfileImage: {
      width: 150,
      height: 150,
      borderRadius: 150 / 2
  }
});

export default SignUpAditionalScreen;