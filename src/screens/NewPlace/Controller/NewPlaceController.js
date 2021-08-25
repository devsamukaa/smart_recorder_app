import React, {useState, useEffect} from 'react';
import NewPlacesView from '../View/NewPlacesView'

import DefaulHeader from '../../../components/DefaultHeader';
import ImagePickerController from '../../../utils/ImagePickerController';

const NewPlaceController = (props) => {

  //inicializa o state
  const [newImageCaptured, setNewImageCaptured] = useState(null);
  
  //inicializa o ImagePickerController
  let pickerController = new ImagePickerController(); 
  
  //Gerencia o Click da camera
  const onCameraClicked = () => {
    console.log("Camera Clicked");
    setTimeout(() => {      
        console.log(pickerController);
        //Abre o picker
        pickerController.openImagePicker((source) => {
            //Chama o método quando escolheu imagem
            if (source === null) {
              return;
            }
            //Altera o local state
            setNewImageCaptured(source);
        })
    }, 1000);
  }
  return (
    //Chamando o View e passando o props count_info
    <NewPlacesView
      item_id={props.navigation.getParam('itemId', '-1')}
      newImageCaptured={newImageCaptured}
      onCameraClicked={onCameraClicked}
      />
  )
}
//Customizando nosso header
NewPlaceController.navigationOptions = ({ navigation }) => {
  return DefaulHeader(navigation);
};

export default NewPlaceController;
