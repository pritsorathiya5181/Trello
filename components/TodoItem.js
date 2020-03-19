import { Button, StyleSheet, Text, TouchableOpacity } from 'react-native';

import React from 'react';

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const todoItem = this.props.todoItem;
        return (
            <TouchableOpacity style={styles.todoItem} activeOpacity={0.8}
                onPress={() => this.props.gotoDetail()}>
                <Text style={(todoItem.done) ? 
                    {...styles.text, color: '#AAAAAA' } : 
                    {...styles.text, color: '#313131' }}>{todoItem.title}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    todoItem: {
        width: 100,
        height: 75,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        margin: 10,
        overflow: 'hidden',
    },
    text: {
        textTransform: 'uppercase',
        fontFamily:'open-sans-bold',
        fontSize:18
    }
})