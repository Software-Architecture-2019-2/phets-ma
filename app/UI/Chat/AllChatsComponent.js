import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";

import AllChatsScreen from "./AllChatsScreen"
import { matchHistoryService } from "../../services/InteractionServices";
import { getUserAnimals } from "../../services/UserServices";
import { ChatStrings } from "./ChatStrings";
import { getAnimalByIDService } from "../../services/AnimalServices";
import {
  getAdoptionChatsService,
  getNotificationsService
} from "../../services/ChatServices";

class AllChatsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      adoptionChats: null,
      phetsChats: null
    }
    this.adoptionAnimals = [];
    this.phetsAnimals = [];
    this.countPhets = 0;
    this.countAdoption = 0;
    this.username = this.props.user.username;
    this.loadingChats = false;
  }

  componentDidMount() {
    this.loadChats();
    this._registerDidFocusListener();
  }

  getAdoptionChats(animals) {
    getAdoptionChatsService(this.username, (chats) => {
      this._getAnimals(chats, { name: this.username, id: this.username }, this.adoptionAnimals, () => {
        animals.forEach(animal => {
          getAdoptionChatsService(animal.id, (chats) => {
            chats.forEach(chat => {
              animal.from_entity = { name: chat, id: chat };
              this.adoptionAnimals.push(animal);
            })
            this.countAdoption++;
            if (this.countAdoption === animals.length) {
              this._loadNotifications(this.adoptionAnimals, () => this.setState({ adoptionChats: this.adoptionAnimals }));
            }
          })
        });
        if (!animals) this.setState({ adoptionChats: this.adoptionAnimals });
      });
    })
  }

  getPhetsChats(animals) {
    animals.forEach((animal, _) => {
      matchHistoryService(animal.id, matches => {
        const animalsIds = matches.map(match => match.idSecondary);
        this._getAnimals(animalsIds, { name: animal.name, id: animal.id }, this.phetsAnimals, () => {
          this.countPhets++;
          if (this.countPhets === animals.length) {
            this._loadNotifications(this.phetsAnimals, () => { this.setState({ phetsChats: this.phetsAnimals }) })
          }
        });
      })
    });
  }

  _loadNotifications(animals, callback) {
    let count = 0;
    if (!animals.length) callback();
    animals.forEach(animal => {
      getNotificationsService(animal.id, this.username, (data) => {
        count++;
        animal.unread = data.total
        if (count === animals.length) callback();
      });
    });
  }

  loadChats() {
    this.adoptionAnimals = [];
    this.phetsAnimals = [];
    this.countPhets = 0;
    this.countAdoption = 0;
    this.loadingChats = true;
    this.setState({ adoptionChats: null, phetsChats: null })

    getUserAnimals(this.username, (animals) => {
      const phetsIds = animals ? animals
        .filter(animal => !animal.adoption) : [];
      const adoption = animals ? animals
        .filter(animal => animal.adoption) : [];
      this.getAdoptionChats(adoption);
      this.getPhetsChats(phetsIds);
    });
  }

  _getAnimals(animalIds, data, target, callback) {
    if (!animalIds.length) callback();
    for (let index = 0; index < animalIds.length; index++) {
      getAnimalByIDService(animalIds[index], (animal) => {
        animal.from_entity = data;
        target.push(animal);
        if (index + 1 === animalIds.length) {
          callback();
        }
      })
    }
  }

  _registerDidFocusListener() {
    this.props.navigation.addListener(
      'didFocus',
      () => {
        if (!this.loadingChats) this.loadChats();
      }
    );
  }

  navigateToChatView = (params) => {
    this.props.navigation.navigate("ChatView", params)
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    if (this.state.adoptionChats && this.state.phetsChats) {
      this.loadingChats = false;
      return <AllChatsScreen
        changeToBack={() => this.changeToBack()}
        navigateToChatView={this.navigateToChatView}
        phetsChats={this.state.phetsChats}
        adoptionChats={this.state.adoptionChats}
        currentPhet={this.currentPhet}
        username={this.username}
      />
    } else {
      return <Spinner
        visible={true}
        textContent={ChatStrings.loadingLabel}
      />
    }
  }
}

function mapStateToProps(state) {
  const user = state.login.user;
  const phets = state.setPhetsList.phets;
  const defaultPhet = state;
  return {
    user,
    phets,
    defaultPhet
  };
}
const connectedAllChatsComponent = connect(mapStateToProps)(AllChatsComponent);
export default connectedAllChatsComponent;