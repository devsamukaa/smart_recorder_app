import React, {useState, useEffect} from 'react';
import { Text, View, Button } from 'react-native';

const HomeTest = () => {
    //Iniciando o local state e recebemos um array por desconstrução
    const [count, setCount] = useState(0); 
    const [count2, setCount2] = useState(0); 

    //Esse useEffect é invocado sempre que há uma renderização
    useEffect(() => {
        console.log("Executa o effect na renderização");  
        return () => {
            console.log("Executa antes de alterar o render");
        }      
    });

    //Esse useEffect é invocado sempre que o componente é montado
    useEffect(() => {
        console.log("Executa o effect na montagem do componente - componentDidMount");
        return () => {
            //Aqui ele é executado na desmontagem do componente
            console.log("Executa o effect na desmontagem do componente - componentDidUnMount");
        };
    }, []);

    //Esse useEffect é invocado sempre que o valor do count é alterado
    useEffect(() => {        
        console.log("Executa o effect na alteração do valor count");
        return () => {
            console.log("Executa antes de alterar o render se o valor count for alterado");
        }      
    }, [count]);    
    return (
        <View>
            {/*  Aqui exibimos as variáveis */ }
            <Text >Você clicou {count} / {count2} </Text>            
            {/*  Alteramos valores do state ao clicar no botão */ }
            <Button title="Click" onPress={()=> setCount(count + 1)}></Button>                        
            <Button title="Click 2" onPress={()=> setCount2(count2 + 1)}></Button>                        
        </View>
        
      );    
}
export default HomeTest;