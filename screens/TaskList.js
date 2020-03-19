import {
    Alert,
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import TodayTask from '../components/TodayTask';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todayTask: '',
            works: []
        }
    }
    addNewTask = () => {
        let works = this.state.works;
        let input = this.state.todayTask;
        if (input === '') { }
        else {
            works.unshift({
                id: works.length + 1,
                input,
            })
        }
        this.setState({
            works: works,
            todayTask: ''
        });
        console.log(this.state.works);
    }

    toggleDone(item) {
        let works = this.state.works;
        works = works.map((work) => {
            if (work.id === item.id) {
                work.done = !work.done
            }
            return work;
        })
        this.setState({ works })
    }

    removeWork(item) {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    let works = this.state.works;
                    works = works.filter((work) => work.id != item.id)
                    this.setState({ works });
                }
            }
        ])
    }

    render() {
        const header = this.props.navigation.getParam('header');
        return (
            <View style={styles.screen}>
                <View style={{ ...styles.mainContainer, ...styles.shadow }}>
                    <View style={styles.headerContainer}>
                        <Text style={{ ...styles.headerFont, textTransform: "uppercase" }}>{header}</Text>
                    </View>
                    <View style={{
                        ...styles.inputContainer, ...styles.addList,
                        ...styles.shadow
                    }}>
                        <TextInput style={{ width: '90%', fontSize: 18 }}
                            value={this.state.todayTask}
                            onChangeText={todayTask => this.setState({ todayTask })}
                            underlineColorAndroid="transparent"
                        />
                        <Ionicons
                            style={{ width: '10%' }}
                            name={Platform.OS === 'android' ? 'md-done-all' : 'ios-done-all'}
                            type="Ionicons"
                            size={26}
                            color={Colors.primary}
                            onPress={this.addNewTask}
                        />
                    </View>
                    <FlatList
                        style={{ marginTop: 5, height: '84%' }}
                        data={this.state.works.sort((a, b) => a.id > b.id ? 1 : -1)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TodayTask
                                    todayItem={item}
                                    toggleDone={() => this.toggleDone(item)}
                                    removeWork={() => this.removeWork(item)}
                                />
                            )
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    mainContainer: {
        margin: 10,
        backgroundColor: '#f5f5f5',
    },
    headerContainer: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        backgroundColor: 'white',
        height: 43,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerFont: {
        fontFamily: 'open-sans-bold',
        fontSize: 18
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 48
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 5
    },
    addList: {
        marginTop: 3,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: 'white',
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});

TaskList.navigationOptions = {
    headerTitle: 'Task List',
}

export default TaskList;