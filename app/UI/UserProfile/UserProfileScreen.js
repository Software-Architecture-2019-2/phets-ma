import React, { Component } from "react";
import { View, ScrollView, Text, Dimensions, ActivityIndicator } from "react-native";
import { ProfileStyles } from './UserProfileStyle';
import { Button, Image } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

import { PetTabsComponent } from './PetTabsComponent'
import { UserProfileStrings } from './UserProfileString';

const { height, width } = Dimensions.get('window');

const list = [
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
  {
    name: 'Amy Farha',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: 'Vice President'
  },
  {
    name: 'Chris Jackson',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: 'Vice Chairman'
  },
]
class UserProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View style={[ProfileStyles.Body, { flex: 1, justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', minHeight: height / 4, }}>
              <View style={[{ flexDirection: 'column', justifyContent: 'space-between', maxWidth: width / 2, paddingBottom: 20 }]}>
                <Text style={[ProfileStyles.Text, ProfileStyles.TextBold]} h1> Pepito perez</Text>
                <Text style={ProfileStyles.Text}>Soy un apasionado por los animales.Bendecido y afortunado.</Text>
                <Text style={ProfileStyles.Text}> Bogota - Colombia</Text>
              </View>
              <View style={{ maxWidth: width / 2 }}>
                <Image
                  // source={{ uri: image }}
                  style={ProfileStyles.ProfileImage}
                  PlaceholderContent={<ActivityIndicator />}
                />
              </View>
            </View>
            <View style={{ paddingBottom: 5 }}>
              <Button
                onPress={() => this.props.changeToUserEdition()}
                type="solid"
                title={UserProfileStrings.editProfileButton}
              />
            </View>
            <PetTabsComponent phetsList={list} adoptionList={list} />
            <View style={{ paddingTop: 0 }}>
              <Button
                icon={
                  <Icon
                    name="arrow-right"
                    size={15}
                    color="white"
                  />
                }
                title={UserProfileStrings.addPetButton}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default UserProfileScreen;