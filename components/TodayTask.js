import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import React from 'react';

export default class TodayTask extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        const todayItem = this.props.todayItem;
        return (
            // <TouchableOpacity style={{ ...styles.container, ...styles.shadow }}>
            //     <Text style={{...styles.text, width:'90%'}}>{todayItem.input}</Text>
            //     <TouchableOpacity style={{ flex: 1 }}
            //         onPress={this.props.toggleDone}>
            //         <Text style={{ ...styles.text, color: '#313131' }}>✓</Text>
            //     </TouchableOpacity>
            // </TouchableOpacity>
            <View>
                {todayItem.done ?
                    <TouchableOpacity style={{ ...styles.container, ...styles.shadow }}
                        activeOpacity={0.8} onPress={this.props.toggleDone}>
                        <Text style={{
                            ...styles.text, width: '90%', color: '#AAAAAA',
                            textDecorationLine: 'line-through'
                        }}>
                            {todayItem.input}</Text>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={this.props.removeWork}>
                            <Text style={{
                                ...styles.text, color: '#AAAAAA',
                                textDecorationLine: 'line-through'
                            }}>x</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={{ ...styles.container, ...styles.shadow }}
                        activeOpacity={0.8}>
                        <Text style={{ ...styles.text, width: '90%', color: '#313131' }}>
                            {todayItem.input}</Text>
                        <TouchableOpacity style={{ flex: 1 }}
                            onPress={this.props.toggleDone}>
                            <Text style={{ ...styles.text, color: '#313131' }}>✓</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
            </View >

        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#caffde',
        height: 48,
        marginTop: 5,
        marginLeft: 10,
        marginRight: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#888',
        marginVertical: 10,
        flexDirection: 'row',
        marginHorizontal: 17,
        paddingLeft: 10,
        borderRadius: 5
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
        textTransform: 'capitalize',
        fontFamily: 'open-sans',
        fontSize: 18,
    }
})