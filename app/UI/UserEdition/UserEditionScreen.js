import React, { Component } from "react";
import { View, Dimensions, ActivityIndicator, Picker, Button } from "react-native";
import { Input, Image, Header } from "react-native-elements";

// import ImagePicker from 'react-native-image-picker'

import { UserEditionStyles } from './UserEditionStyle';
import { UserEditionStrings } from './UserEditionStrings';

class UserEditionScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: '',
    }
  }

  render() {
    return (
      <View>
        <Header
          barStyle="light-content"
          leftComponent={{
            text: UserEditionStrings.editProfile,
            onPress: () => { },
            style: { fontSize: 15, color: '#fff' }
          }}
          leftContainerStyle={{ flex: 3 }}
          rightComponent={{ icon: 'home', color: '#fff' }}
          containerStyle={{
            backgroundColor: 'rgb(0, 100, 0)',
            justifyContent: 'space-around',
            paddingTop: 2,
            height: 50,
          }}
        />
        <View style={[UserEditionStyles.Body, { flex: 1, justifyContent: 'space-between' }]}>
          <View style={{ maxWidth: Dimensions.get('window').width / 2, alignItems: 'center' }}>
            <Image
              // source={{ uri: image }}
              style={UserEditionStyles.ProfileImage}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'space-around' }}>
            <Input
              placeholder={UserEditionStrings.name}
              label={UserEditionStrings.name}
            />
            <Input
              placeholder={UserEditionStrings.lastName}
              label={UserEditionStrings.lastName}
            />
            <Input
              placeholder={UserEditionStrings.description}
              label={UserEditionStrings.description}
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <Picker
                selectedValue={this.state.language}
                style={{ height: 100, width: Dimensions.get('window').width / 2 }}
                onValueChange={(itemValue, _) =>
                  this.setState({ language: itemValue })
                }
                prompt={UserEditionStrings.country}>
                <Picker.Item label="Colombia" value="co" />
                <Picker.Item label="Peru" value="pe" />
              </Picker>
              <Input
                placeholder={UserEditionStrings.city}
                label={UserEditionStrings.city}
                containerStyle={{ height: 100, width: Dimensions.get('window').width / 2 - 50 }}
              />
            </View>
          </View>
          <View style={{ height: 60, paddingTop: 40 }}>
            <Button
              title={UserEditionStrings.save}
              onPress={() => { }}
            />
          </View>
        </View>
      </View>
    )
  }
}

export default UserEditionScreen;