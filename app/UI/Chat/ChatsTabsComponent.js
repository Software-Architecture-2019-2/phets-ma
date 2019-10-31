import React, { Component } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import { ListItem } from 'react-native-elements';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

import { ChatStrings } from './ChatStrings';
import { FILES_MS_URI } from "../../services/utils";

const { height, width } = Dimensions.get('window');

export class ChatsTabsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Phets' },
        { key: 'second', title: ChatStrings.adoptionLabel },
      ],
    };
    this.username = "crdgonzalezca";
  }

  handleOnPressItem = (data) => {
    this.props.navigateToChatView(data);
  }
  getImageUri(media) {
    const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
    return media && media.length ? `${FILES_MS_URI}\\${media[0]}` : defaultImage;
  }

  renderAdoptionChatsItems(adoptionChats) {
    return adoptionChats.map((adoption, index) => {
      return <TouchableOpacity key={index} onPress={() => this.handleOnPressItem({
        from: adoption.from_entity,
        to: adoption.id,
        name: adoption.name,
        image: this.getImageUri(adoption.media)
      })}>
        <ListItem
          key={index}
          leftAvatar={{ source: { uri: this.getImageUri(adoption.media) } }}
          sty
          title={`${adoption.from_entity.name} - ${adoption.name}`}
          // subtitle={`${user} - ${user.breed}`}
          bottomDivider
          chevron={<FontAwesomeIcon icon={faChevronRight} size={20} color={"#77A6F7"} />}
        />
      </TouchableOpacity>
    })
  }

  renderPhetsChatsItems(phets) {
    return phets.map((phet, index) => {
      return <TouchableOpacity key={index} onPress={() => this.handleOnPressItem({
        from: phet.from_entity,
        to: phet.id,
        name: phet.name,
        image: this.getImageUri(phet.media)
      })}>
        <ListItem
          key={index}
          leftAvatar={{ source: { uri: this.getImageUri(phet.media) } }}
          title={`${phet.name} - ${phet.from_entity.name}`}
          bottomDivider
          chevron={<FontAwesomeIcon icon={faChevronRight} size={20} color={"#77A6F7"} />}
        />
      </TouchableOpacity>
    })
  }

  phetsChatsTab = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {this.renderPhetsChatsItems(this.props.phetsList)}
      </View>
    </ScrollView>
  );

  adoptionChatsTab = () => (
    <ScrollView>
      <View style={{ flex: 1 }}>
        {this.renderAdoptionChatsItems(this.props.adoptionList)}
      </View>
    </ScrollView>
  );

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.phetsChatsTab,
          second: this.adoptionChatsTab,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
        style={styles.Body}
        sceneContainerStyle={{ backgroundColor: "#f9f9f9" }}
        scrollEnabled="true"
        renderTabBar={(props) =>
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: 'black' }}
            labelStyle={{ color: 'black' }}
            style={{ backgroundColor: "white", height: 40, width: width }}
            renderIcon={this.renderIcon}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: "#FFCCBC",
  },
  Container: {
    padding: 15,
    paddingBottom: 0,
    flexDirection: "row",
  },
  Superior: {
    height: height * 0.3,
    justifyContent: 'center',
    alignItems: "center",
  },
  head: {
    paddingTop: 10,
    paddingRight: 10,
    height: height * 0.15
  },
  Body: {
    height: height * 0.85,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 60
  },
  Titles: {
    paddingLeft: 20,
    paddingTop: 10,
    fontSize: width * 0.1,
    color: '#fff',
  },
  TextCenter: {
    alignItems: 'center',
  },
  MarginRight: {
    marginRight: 20
  },
  scrollH: {
    paddingLeft: 20,
    paddingTop: width * 0.16 / 2
  },
  Chat: {
    flexDirection: "row",
    marginTop: 15
  },
  Data: {
    paddingLeft: 25,
  },
  NameChat: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginTop: 5
  },
  TextChat: {
    color: "gray",
    marginTop: 10,
  },
  BorderBottom: {
    paddingBottom: 10,
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
    width: width * 0.6
  }

})