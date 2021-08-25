import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-elements';

export default Example = (props) => {
    const [count, setCount] = useState(0);
    const [count2, setCount2] = useState(0);

    useEffect(() => {
        console.log('Executa o effect na renderização');
        return () => {
            console.log('Executa antes de alterar o render');
        }
    })

    useEffect(() => {
        console.log('Executa o effect na montagem do componente - componentDidMount');
        return () => {
            console.log('Executa o effect na desmontagem do componente - componentDidUnMount');
        }
    }, [])

    useEffect(() => {
        console.log('Executa o effect na alteração do valor do count');
        return () => {
            console.log('Executa antes de alterar o render se o valor count for alterado');
        }
    }, [count])

    return (
        <View>
            <Text style={{fontSize: 30, marginBottom: 50, marginTop:50}}>
                Você clicou em {count} / {count2} 
            </Text>
            <Button title="click" onPress={() => setCount(count + 1)}/>
            <Button title="click 2" onPress={() => setCount2(count2 + 2)}/>
        </View>
    );
}