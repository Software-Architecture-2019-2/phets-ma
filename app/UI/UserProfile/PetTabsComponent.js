import React, { Component } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { ListItem } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { UserProfileStrings } from './UserProfileStrings';
import { FILES_MS_URI } from "../../services/utils";


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

  handleOnPressItem = (animal) => {
    this.props.navigateToEditAnimal({ animal, editionForm: true });
  }

  getImageUri(imageId) {
    return `${FILES_MS_URI}\\${imageId}`;
  }

  getAnimalItemsList(animals) {
    return animals.map((animal, index) => {
      const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
      const photo = animal.media.length ? this.getImageUri(animal.media[0]) : defaultImage;

      return <TouchableOpacity key={animal.id} onPress={() => this.handleOnPressItem(animal)}>
        <ListItem
          key={index}
          leftAvatar={{ source: { uri: photo } }}
          title={animal.name}
          subtitle={`${animal.animal_type.value} - ${animal.breed}`}
          bottomDivider
          chevron={<FontAwesomeIcon icon={faChevronRight} size={20} color={"#77A6F7"} />}
        />
      </TouchableOpacity>
    })
  }

  phetsRoute = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {this.getAnimalItemsList(this.props.phetsList)}
      </View>
    </ScrollView>
  );

  adoptionRoute = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {this.getAnimalItemsList(this.props.adoptionList)}
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