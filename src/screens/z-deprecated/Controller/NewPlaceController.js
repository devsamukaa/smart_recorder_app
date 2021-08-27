import React, {useState, useEffect} from 'react';

import DefaulHeader from '../../../components/DefaultHeader';

const NewPlaceController = (props) => {

  //inicializa o state
  const [newImageCaptured, setNewImageCaptured] = useState(null);
  
  return (
    //Chamando o View e passando o props count_info
    <View></View>
  )
}
//Customizando nosso header
NewPlaceController.navigationOptions = ({ navigation }) => {
  return DefaulHeader(navigation);
};

export default NewPlaceController;
