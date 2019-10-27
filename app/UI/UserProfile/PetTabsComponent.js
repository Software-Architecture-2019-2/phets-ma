import React, { Component } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { ListItem } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { UserProfileStrings } from './UserProfileStrings';

export class PetTabsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Phets' },
        { key: 'second', title: UserProfileStrings.adoptionLabel },
      ],
    };
  }
  phetsRoute = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {
          this.props.phetsList.map((phet, index) => {
            const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
            const photo = phet.media.length ? phet.media[0] : defaultImage;
            return <ListItem
              key={index}
              leftAvatar={{ source: { uri: photo } }}
              title={phet.name}
              subtitle={`${phet.animal_type.value} - ${phet.breed}`}
              bottomDivider
              chevron
            />
          })
        }
      </View>
    </ScrollView>
  );

  adoptionRoute = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {
          this.props.adoptionList.map((adoption, index) => {
            const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
            const photo = adoption.media.length ? adoption.media[0] : defaultImage;
            return <ListItem
              key={index}
              leftAvatar={{ source: { uri: photo } }}
              title={adoption.name}
              subtitle={`${adoption.animal_type.value} - ${adoption.breed}`}
              bottomDivider
              chevron
            />
          })
        }
      </View>
    </ScrollView>
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.phetsRoute,
          second: this.adoptionRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={{ flex: 1, height: 300 }}
        sceneContainerStyle={{ backgroundColor: "#f9f9f9" }}
        scrollEnabled="true"
        renderTabBar={(props) =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            labelStyle={{ color: 'black' }}
            style={{ backgroundColor: "white", height: 40 }}
            renderIcon={this.renderIcon}
          />
        }
      />
    )
  }
}