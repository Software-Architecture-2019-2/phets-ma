import React, { Component } from "react";
import {
  View,
  Dimensions,
  Picker,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

import { SliderBox } from 'react-native-image-slider-box';
import Spinner from 'react-native-loading-spinner-overlay';
import DateTimePicker from '@react-native-community/datetimepicker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCalendarAlt, faUpload } from '@fortawesome/free-solid-svg-icons';

import { AnimalFormStrings } from './AnimalFormStrings';
import { GeneralStyles } from "../../styles/GeneralStyle";
import PhotosModal from "./PhotosModalComponent";
import { FILES_MS_URI } from "../../services/utils";
import { AnimalFormStyles } from "./AnimalFormStyles";

class AnimalFormScreen extends Component {
  constructor(props) {
    super(props);
    this._animal = this.props.animalToEdit;

    this.state = {
      name: this.props.isEditionForm ? this._animal.name : '',
      breed: this.props.isEditionForm ? this._animal.breed : '',
      gender: this.props.isEditionForm ? this._animal.gender : false,
      adoption: this.props.isEditionForm ? this._animal.adoption : false,
      birthdate: this.props.isEditionForm ? this._animal.birthdate : null,
      selectedAnimalTypeValue: this.props.isEditionForm && this._animal.animal_type ? `${this._animal.animal_type.id}` : "-1",
      selectedAnimalTypeIndex: this.props.isEditionForm && this._animal.animal_type ? `${this._animal.animal_type.id - 1}` : -1,

      showCalendar: false,
      modalVisible: false,
      mediaUris: this.props.isEditionForm ? this.parseMediaToUris(this._animal.media) : [],
      media: this.props.isEditionForm ? this._animal.media : [],
      selectedImages: [],
    }
    this.user = this.props.user.usename;
  }

  parseMediaToUris(media) {
    if (media.length) {
      return media.map((photo, _) => {
        return this.getImageUri(photo);
      });
    } else return [];
  }

  getImageUri(image) {
    return `${FILES_MS_URI}/${image}`;
  }

  _renderDatePicker() {
    return (
      <View style={{ width: Dimensions.get('window').width / 2 }}>
        <TouchableOpacity onPress={this.handleOnOpenCalendar}>
          <Input
            placeholder={AnimalFormStrings.birthdate}
            label={AnimalFormStrings.birthdate}
            disabled={true}
            leftIcon={
              <FontAwesomeIcon icon={faCalendarAlt} />
            }
          >
            {this.state.birthdate}
          </Input>
        </TouchableOpacity>
        {this.state.showCalendar && <DateTimePicker
          value={new Date()}
          mode='date'
          display="calendar"
          onChange={this.setBirthdate}
          minimumDate={new Date(1990, 0, 1)}
        />}
      </View>
    )
  }

  _handleOnChangePicker = (itemValue, itemIndex) => {
    this.setState({ selectedAnimalTypeValue: itemValue, selectedAnimalTypeIndex: itemIndex - 1 })
  };

  _renderAnimalTypesPicker() {
    return (
      <Picker
        style={{ height: 100, width: Dimensions.get('window').width / 2 }}
        chan
        onValueChange={this._handleOnChangePicker}
        selectedValue={this.state.selectedAnimalTypeValue}
        prompt={AnimalFormStrings.animalType}>
        <Picker.Item label={AnimalFormStrings.pickerDefault} value="-1" key="-1" />
        {
          this.props.animalTypes.map((type) => {
            return <Picker.Item label={type.value} value={`${type.id}`} key={`${type.id}`} />
          })
        }
      </Picker>
    )
  }

  _checkMandatoryFields() {
    const state = this.state;
    return state.name && state.selectedAnimalTypeValue !== "-1";
  }

  handleSubmit = async () => {
    if (!this._checkMandatoryFields()) {
      Alert.alert(AnimalFormStrings.mandatoryFields, AnimalFormStrings.mandatoryFielsdMsg);
      return;
    }

    this.setState({ submitting: true });

    const animal = {
      name: this.state.name,
      breed: this.state.breed,
      user: this.user,
      gender: this.state.gender,
      adoption: this.state.adoption,
      birthdate: this.state.birthdate,
      media: this.state.media
    };

    animal.animal_type = this.state.selectedAnimalTypeValue !== "-1" ? {
      id: this.state.selectedAnimalTypeValue,
      value: this.props.animalTypes[this.state.selectedAnimalTypeIndex].value
    } : null;

    const uploaded = await this._uploadSelectedImages();
    animal.media = animal.media.concat(uploaded);

    if (this.props.isEditionForm) {
      this.props.updateAnimal(this._animal.id, animal)
    } else this.props.createAnimal(animal);
  }

  async _uploadSelectedImages() {
    const alreadyUploaded = [];

    for (let i = 0; i < this.state.selectedImages.length; i++) {
      const file = await this.props.uploadPhoto(this.state.selectedImages[i]);
      alreadyUploaded.push(file.file_id);
    }
    return alreadyUploaded;
  }


  handleOnToggleGender = () => {
    this.setState({ gender: !this.state.gender })
  }

  handleOnToggleAdoption = () => {
    this.setState({ adoption: !this.state.adoption })
  }

  handleOnOpenCalendar = () => {
    this.setState({ showCalendar: true })
  }

  setBirthdate = (_, date) => {
    if (date) {
      this.setState({ birthdate: date.toISOString().substring(0, 10), showCalendar: false })
    }
  }

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  setNewImage = (image) => {
    this.state.mediaUris.push(image.uri)
    this.state.selectedImages.push(image);
    this.setState({ mediaUris: this.state.mediaUris, selectedImages: this.state.selectedImages })
    this.setModalVisible(false);
  }

  _removeImage(index) {
    if (index < this.state.media.length) {
      this.state.media.splice(index, index + 1);
    } else {
      this.state.selectedImages.splice(index, index + 1);
    }
    this.state.mediaUris.splice(index, index + 1);
    this.setState({
      media: this.state.media,
      selectedImages: this.state.selectedImages,
      mediaUris: this.state.mediaUris
    })
  }

  _handleOnCurrentImagePressed = (index) => {
    Alert.alert(
      AnimalFormStrings.deletePhoto,
      AnimalFormStrings.deletePhotoMsg,
      [
        {
          text: AnimalFormStrings.cancel,
          style: 'cancel',
        },
        { text: AnimalFormStrings.confirmDelete, onPress: () => this._removeImage(index) },
      ],
      { cancelable: false },
    )
  }

  _renderImagesCarousel() {
    if (this.state.mediaUris.length) {
      return <View>
        <SliderBox
          images={this.state.mediaUris}
          sliderBoxHeight={Dimensions.get('window').height - 300}
          parentWidth={Dimensions.get('window').width - 40}
          onCurrentImagePressed={this._handleOnCurrentImagePressed}
        />
      </View>
    }
  }

  render() {
    return (
      <View>
        <Spinner
          visible={this.state.submitting}
          textContent={AnimalFormStrings.savingLabel}
        />
        <ScrollView>
          <View style={[GeneralStyles.Body, { flex: 1, justifyContent: 'flex-start' }]}>
            {this._renderImagesCarousel()}
            <TouchableOpacity onPress={() => this.setModalVisible(true)}>
              <View style={[AnimalFormStyles.UploadImageView, { backgroundColor: "#f9f9f9", alignItems: 'center', justifyContent: 'center' }]}>
                <Text style={[GeneralStyles.Bold, GeneralStyles.Text]}>{AnimalFormStrings.uploadPhoto}</Text>
                <FontAwesomeIcon icon={faUpload} size={50} />
              </View>
            </TouchableOpacity>
            <View>
              <Input
                placeholder={AnimalFormStrings.name}
                label={AnimalFormStrings.name}
                onChangeText={(name) => this.setState({ name })}
              >
                {this.props.isEditionForm ? this._animal.name : ''}
              </Input>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                <View style={{ width: Dimensions.get("window").width / 5, alignItems: 'center' }}>
                  <Text style={[GeneralStyles.Text, GeneralStyles.Bold]} >
                    {this.state.gender ? AnimalFormStrings.female : AnimalFormStrings.male}
                  </Text>
                  <Switch
                    value={this.state.gender}
                    onValueChange={this.handleOnToggleGender}
                  />
                </View>
                <View style={{ width: Dimensions.get("window").width / 5, alignItems: 'center' }}>
                  <Text style={[GeneralStyles.Text, GeneralStyles.Bold]} >{AnimalFormStrings.adoption}</Text>
                  <Switch
                    value={this.state.adoption}
                    onValueChange={this.handleOnToggleAdoption}
                  />
                </View>
                {this._renderDatePicker()}
              </View>
              <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingTop: 8 }}>
                {this._renderAnimalTypesPicker()}
                <Input
                  placeholder={AnimalFormStrings.breed}
                  label={AnimalFormStrings.breed}
                  containerStyle={{ height: 80, width: Dimensions.get('window').width / 2 - 40 }}
                  onChangeText={(breed) => this.setState({ breed })}
                >
                  {this.props.isEditionForm ? this._animal.breed : ''}
                </Input>
              </View>
            </View>
            <View>
              <Button
                title={AnimalFormStrings.save}
                onPress={this.handleSubmit}
                buttonStyle={GeneralStyles.BlueColor}
              />
            </View>
          </View>
        </ScrollView>
        <PhotosModal
          setModalVisible={this.setModalVisible}
          visible={this.state.modalVisible}
          savePhoto={this.setNewImage}
        />
      </View>
    )
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
const connectedAnimalFormScreen = connect(mapStateToProps)(AnimalFormScreen);
export default connectedAnimalFormScreen;