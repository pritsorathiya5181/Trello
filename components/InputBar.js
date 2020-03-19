import {
    Button,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Colors from '../constants/Colors';
import React from 'react';

const InputBar = props => {
    return (
        <View style={styles.inputContainer}>
            <Text style={{
                ...styles.textShadow, ...styles.text
            }}>What shall we call the board?</Text>
            <TextInput
                style={styles.inputText}
                value={props.todoInput}
                onChangeText={(todoInput) => props.textChange(todoInput)}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={props.showHideComponent}>
                    <Text style={{ ...styles.textShadow, ...styles.text }}>CANCEL</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={props.addNewToDo}>
                    <Text style={styles.buttonText}>CREATE</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 5
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontFamily: 'open-sans-bold'
    },
    inputContainer: {
        padding: 20
    },
    inputText: {
        height: 45,
        backgroundColor: 'white',
        borderRadius: 10,
        marginTop: 15,
        fontSize: 18,
        padding: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#f1f1f1',
        width: 114,
        height: 43,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: '#171717',
        fontWeight: '900',
        fontSize: 18
    }
});

export default InputBar;