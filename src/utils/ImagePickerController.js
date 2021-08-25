
import ImagePickerCropper from 'react-native-image-crop-picker';
import { ActionSheetIOS, Alert, Platform, Dimensions } from 'react-native'


export default class ImagePickerController {

    constructor() {
        //Busca as dimensoes da tela
        const width = Dimensions.get('screen').width;
        const height = Dimensions.get('screen').height;
        //Seta as opções do retorno da foto
        this.options = {
            compressImageMaxWidth: width, //Diminui a foto até o mínimode 1280px
            height: 200, //Altura da foto quando a opção cropping está ativa
            width: width,//Largura da foto quando a opção cropping está ativa
            includeBase64: true, //Quando ativo, a foto retorna em base64
            compressImageQuality: 1, //Diminui a qualidade da imagem
            cropping: true, //Corta a imagem para se adequar ao height e width informado
        }
    }
    
    //Gerencia a abertura da imagem
    openGallery = (callback) => {
        //Abre o picker 
        ImagePickerCropper.openPicker(this.options).then(image => {
            //recebe a imagem e retorna para a função informada
            if (image) {
                callback(image.data);
            } else {
                callback(null);
            }
        }).catch(error => {
            callback(null)
        })

    }

    //Gerencia a abertura de câmera
    openCamera = (callback) => {
        //Abertura de câmera
        ImagePickerCropper.openCamera(this.options).then(image => {
            //recebe a imagem e retorna para a função informada
            if (image) {
                callback(image.data);
            } else {
                callback(null);
            }
        }).catch(error => {
            callback(null)
        })
    }

    //Gerencia o picker para escolher entre câmera e a galeria de imagem
    openImagePicker = (callback) => {

        //Checa a plataforma
        if (Platform.OS == "ios") {
            //Exibe um ActionSheet com as opções abaixo
            ActionSheetIOS.showActionSheetWithOptions(
                {
                    options: ['Abrir Câmera', 'Abrir Galeria', 'Cancelar'],
                    cancelButtonIndex: 2,
                },
                (buttonIndex) => {
                    if (buttonIndex === 0) {
                        //Abre a camera
                        this.openCamera(callback);
                    } else if (buttonIndex === 1) {
                        //Abre a galeria de imagem
                        this.openGallery(callback);
                    } else {
                        callback(null);
                    }
                },
            );
        } else {
            //Exibe um Alert com as opções abaixo
            Alert.alert(
                "Escolher Imagem",
                "",
                [{
                    text: "Cancelar",
                    style: 'destructive',
                    onPress: () => {
                        callback(null);
                    }
                },
                {
                    text: "Abrir Câmera",
                    onPress: () => {
                        //Abre a camera
                        this.openCamera(callback);
                    }
                },
                {
                    text: "Abrir Galeria",
                    onPress: () => {
                        //Abre a galeria de image
                        this.openGallery(callback);
                    },
                },
                ],
                { cancelable: false },
            );
        }
    }
}
