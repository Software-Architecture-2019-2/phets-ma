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
                    this.props.phetsList.map((phet, index) => (
                        <ListItem
                            key={index}
                            leftAvatar={{ source: { uri: phet.avatar_url } }}
                            title={phet.name}
                            subtitle={phet.subtitle}
                            bottomDivider
                            chevron
                        />
                    ))
                }
            </View>
        </ScrollView>
    );

    adoptionRoute = () => (
        <ScrollView>
            <View style={{ flex: 1 }}>
                {
                    this.props.adoptionList.map((pet, index) => (
                        <ListItem
                            key={index}
                            leftAvatar={{ source: { uri: pet.avatar_url } }}
                            title={pet.name}
                            subtitle={pet.subtitle}
                            bottomDivider
                            chevron
                        />
                    ))
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
                style={{ flex: 1, height: 250 }}
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