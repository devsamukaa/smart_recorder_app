import React, {useState, useEffect} from 'react';
import DetailsPlaceView from '../View/DetailsPlacesView'
import DefaultHeader from '../../../components/DefaultHeader';
import DetailsPlaceModel from '../Model/DetailsPlacesModel';

const DetailsPlaceController = (props) => {
  const [photo, setPhoto] = useState(require('../../../assets/images/noPhoto.jpg'));
  const [item, setItem] = useState(props.navigation.getParam('item', '-1'));
  let detailsPlaceModel = null;

  //Executando no inicio do metodo (Colchetes vazios, equivalente ao ComponentDidMount)
  useEffect(() => {
    //inicializando o state
    detailsPlaceModel = new DetailsPlaceModel();//inicializando o view     

    //Altera o titulo da pagina
    props.navigation.setParams({titlePage: "Detalhe"});
    //Buscando a foto do lugar
    detailsPlaceModel.getPhotosFoursquare(item.id, returnPhoto);
  }, [])

  const returnPhoto = (status, photo) => {
    //Ao retornar a foto, altera o state
    setPhoto(photo);
  }

  return (
    //Chamando o View e passando o props item e photo
    <DetailsPlaceView
      item={item}
      photo={photo}
        />
  )
}

//Customizando nosso header
DetailsPlaceController.navigationOptions = ({ navigation }) => {
  return DefaultHeader(navigation);
};

export default DetailsPlaceController;
