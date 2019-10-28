import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import { Image, Button } from "react-native-elements";

import ImagePicker from 'react-native-image-picker'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

import { AnimalFormStyles } from './AnimalFormStyles';
import { AnimalFormStrings } from './AnimalFormStrings';
import { GeneralStyles } from "../../styles/GeneralStyle";

export default class PhotosModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photoUri: '',
      selectedPhoto: null,
      submitting: false,
    };
  }

  handleChoosePhoto = () => {
    const options = {
      title: AnimalFormStrings.selectPhoto,
      storageOptions: {
        skipBackup: true,
        path: 'phets/images',
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.uri) {
        this.setState({ photoUri: response.uri, selectedPhoto: response })
      }
    })
  }

  _renderImage() {
    if (this.state.photoUri) {
      return <Image
        source={{ uri: this.state.photoUri }}
        style={AnimalFormStyles.AnimalImage}
        PlaceholderContent={<ActivityIndicator />}
      />
    } else {
      return <TouchableOpacity onPress={this.handleChoosePhoto}>
        <View style={[
          AnimalFormStyles.AnimalImage,
          { backgroundColor: "#f4f4f4", alignItems: 'center', justifyContent: 'center' }
        ]}>
          <Text style={[GeneralStyles.Bold, GeneralStyles.Text]}>{AnimalFormStrings.uploadPhoto}</Text>
          <FontAwesomeIcon icon={faUpload} size={50} />
        </View>
      </TouchableOpacity>
    }
  }

  clearModal() {
    this.setState({ photoUri: null, selectedPhoto: null, submitting: false })
  }

  handleCloseModal = () => {
    this.props.setModalVisible(false);
    this.clearModal();
  }

  handleSave = () => {
    if (!this.state.selectedPhoto) {
      Alert.alert(AnimalFormStrings.selectPhoto, AnimalFormStrings.selectPhotoAlertMsg);
      return;
    }
    this.props.savePhoto(this.state.selectedPhoto);
    this.clearModal();
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.props.visible}
          onRequestClose={() => {
            this.props.setModalVisible(false);
          }}
          style={GeneralStyles.Body}
        >
          <View style={GeneralStyles.Body}>
            {this._renderImage()}
            <View style={{ marginTop: 20 }}>
              <Button
                buttonStyle={[GeneralStyles.BlueColor]}
                title={AnimalFormStrings.save}
                onPress={this.handleSave} />
              <Button
                buttonStyle={{ backgroundColor: "#FE6848" }}
                title={AnimalFormStrings.cancel}
                onPress={this.handleCloseModal} />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}