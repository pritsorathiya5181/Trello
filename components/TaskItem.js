import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

export default class TaskItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const taskItem = this.props.taskItem;
        return (
            <View>
                {taskItem.done ?
                    <TouchableOpacity style={{ ...styles.taskItem, ...styles.shadow }}
                        activeOpacity={0.8} onPress={this.props.toggleDone}>
                        <Text style={{
                            ...styles.text, color: '#AAAAAA',
                            paddingLeft: 10, textDecorationLine: 'line-through'
                        }}>
                            {taskItem.id}.</Text>
                        <Text style={{
                            ...styles.text, color: '#AAAAAA', width: '76%',
                            textDecorationLine: 'line-through'
                        }}>
                            {taskItem.header}</Text>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={this.props.removeTaskHeader}>
                            <Text style={{
                                ...styles.text, color: '#AAAAAA',
                                textDecorationLine: 'line-through'
                            }}>x</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ ...styles.taskItem, ...styles.shadow }}
                        activeOpacity={0.8} onPress={() => {this.props.gotoTask()}}>
                        <Text style={{ ...styles.text, color: '#313131', paddingLeft: 10 }}>
                            {taskItem.id}.</Text>
                        <Text style={{ ...styles.text, color: '#313131', width: '76%' }}>
                            {taskItem.header}</Text>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={this.props.toggleDone}>
                            <Text style={{ ...styles.text, color: '#313131' }}>✓</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }

                {/* <Text style={(taskItem.done) ? { ...styles.text, color: '#AAAAAA' }
                    : { ...styles.text, color: '#313131', paddingLeft: 10 }}>
                    {taskItem.id}.</Text> */}
                {/* <Text style={(taskItem.done) ? { ...styles.text, color: '#AAAAAA' }
                    : { ...styles.text, color: '#313131' }}>
                    {taskItem.header}</Text> */}
                {/* <TouchableOpacity style={{ flex: 1, paddingLeft: '59%' }}>
                    {taskItem.done ?
                        <Text style={{
                            ...styles.text, textDecorationLine: 'line-through',
                            color: '#AAAAAA'
                        }}>x</Text> :
                        
                        <Text style={{ ...styles.text, color: '#313131' }}>✓</Text>
                    }
                </TouchableOpacity> */}
            </View >
        )
    }
}

const styles = StyleSheet.create({
    taskItem: {
        backgroundColor: 'white',
        width: '90%',
        height: 55,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#888',
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 17,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        elevation: 7,
    },
    text: {
        textTransform: 'uppercase',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    }
})