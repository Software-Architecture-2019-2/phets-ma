import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { ProfileStyles } from './UserProfileStyle';
import { Button, Image } from 'react-native-elements';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { PetTabsComponent } from './PetTabsComponent'
import { UserProfileStrings } from './UserProfileStrings';
import { GeneralStyles } from "../../styles/GeneralStyle";

const { height, width } = Dimensions.get('window');

class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
    this._user = this.props.user;
  }

  _renderDescription() {
    if (this._user.description) {
      return (<Text style={GeneralStyles.Text} h1>{this._user.description}</Text>);
    } else return null;
  }

  _renderLocation() {
    if (this._user.city || this._user.country) {
      const city = this._user.city;
      const country = this._user.country;
      let location = city || '';
      if (country)
        location += city ? `, ${country.name}` : country.name;
      return (
        <Text
          style={[GeneralStyles.Text, GeneralStyles.Bold, GeneralStyles.Italic, { fontFamily: 'monospace' }]} h1>
          {location}
        </Text>);
    } else return null;
  }

  _renderImage() {
    return <Image
      source={{ uri: this.props.photoUri() }}
      style={ProfileStyles.ProfileImage}
      PlaceholderContent={<ActivityIndicator />}
    />
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={[GeneralStyles.Body, { flex: 1, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', minHeight: height / 4, }}>
              <View style={[{ flexDirection: 'column', justifyContent: 'space-between', width: width / 2, paddingBottom: 20 }]}>
                <Text style={[GeneralStyles.Text, GeneralStyles.Bold, { fontSize: 20 }]} h1>{this._user.firstName} {this._user.lastName}</Text>
                {this._renderDescription()}
                {this._renderLocation()}
              </View>
              <View style={{ maxWidth: width / 2 }}>
                {this._renderImage()}
              </View>
            </View>
            <View style={{ paddingBottom: 5 }}>
              <Button
                onPress={() => this.props.changeToUserEdition()}
                type="solid"
                title={UserProfileStrings.editProfileButton}
                buttonStyle={GeneralStyles.BlueColor}
              />
            </View>
            <PetTabsComponent
              phetsList={this.props.phets}
              adoptionList={this.props.adoption}
              navigateToAnimalView={(data) => this.props.navigateToAnimalView(data)}
            />
            <View style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Button buttonStyle={{ width: 35, paddingTop: 5 }}
                icon={
                  <FontAwesomeIcon icon={faPlus} size={35} color={"#77A6F7"} />
                }
                type="clear"
                onPress={() => this.props.navigateToCreateAnimal({ animal: {}, editionForm: false })}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', paddingTop: 50 }}>
              <Button
                onPress={() => this.props.logout()}
                title={UserProfileStrings.logout}
                buttonStyle={{ width: width * 0.5 }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default UserProfileScreen;