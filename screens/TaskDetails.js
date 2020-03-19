import {
    Alert,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Colors from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import TaskItem from '../components/TaskItem';

class TaskDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            taskInput: '',
            tasks: []
        }
    }

    showHideComponent = () => {
        if (this.state.show === true) {
            this.setState({ show: false })
        } else {
            this.setState({ show: true })
        }
    }

    addNewTaskHeader = () => {
        let tasks = this.state.tasks;
        let header = this.state.taskInput;
        if (header === '') { }
        else {
            tasks.unshift({
                id: tasks.length + 1,
                header,
            })
        }
        this.setState({
            tasks: tasks,
            taskInput: ''
        })
        // console.log(this.state.tasks);
    }

    toggleDone(item) {
        let tasks = this.state.tasks;
        tasks = tasks.map((task) => {
            if (task.id === item.id) {
                task.done = !task.done
            }
            return task;
        })
        this.setState({ tasks })
    }

    removeTaskHeader(item) {
        Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes',
                style: 'destructive',
                onPress: () => {
                    let tasks = this.state.tasks;
                    tasks = tasks.filter((task) => task.id != item.id)
                    this.setState({ tasks });
                }
            }
        ])
    }

    gotoTaskList(item) {
        this.props.navigation.navigate('task', {
            header: item.header
        });
    }

    render() {
        const title = this.props.navigation.getParam('title')
        return (
            <View style={styles.container}>
                <View style={{ ...styles.titleContainer, ...styles.shadow }}>
                    <Text style={{
                        ...styles.mainText,
                        ...styles.textShadow, textTransform: 'uppercase'
                    }}>{title}</Text>
                </View>
                {!this.state.show ?
                    <TouchableOpacity style={styles.createList}
                        onPress={this.showHideComponent}>
                        <Text style={styles.mainText}>Add a list...</Text>
                    </TouchableOpacity> :
                    <View>
                        <View style={{ ...styles.addList, ...styles.shadow }}>
                            <View style={styles.addInput}>
                                <TextInput style={{ ...styles.input, ...styles.shadow }}
                                    placeholder="add a list"
                                    value={this.state.taskInput}
                                    onChangeText={taskInput => this.setState({ taskInput })}
                                    underlineColorAndroid="transparent"
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name={Platform.OS === 'android' ? 'md-done-all' : 'ios-done-all'}
                                    type="Ionicons"
                                    size={26}
                                    color={Colors.primary}
                                    onPress={this.addNewTaskHeader}
                                />
                                <Ionicons
                                    style={styles.icon}
                                    name={Platform.OS === 'android' ? 'md-close-circle' : 'ios-close-circle'}
                                    type="Ionicons"
                                    // type="materialcommunityIcons"
                                    size={26}
                                    color={Colors.primary}
                                    onPress={this.showHideComponent}
                                />
                            </View>
                        </View>
                    </View>
                }
                <View style={{ marginTop: 10 }}>
                    <FlatList
                        style={styles.list}
                        data={this.state.tasks.sort((a, b) => a.id > b.id ? 1 : -1)}
                        extraData={this.state}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TaskItem
                                    taskItem={item}
                                    toggleDone={() => this.toggleDone(item)}
                                    removeTaskHeader={() => this.removeTaskHeader(item)}
                                    gotoTask={() => this.gotoTaskList(item)}
                                />
                            )
                        }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    list: {
        height: '60%',
        padding: 10
    },
    addList: {
        margin: 20,
        borderWidth: 2,
        borderColor: '#edeef0',
        padding: 10,
        backgroundColor: '#f4f2f2',
    },
    addInput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingBottom: 30,
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
    input: {
        backgroundColor: 'white',
        width: '80%',
        padding: 11,
        borderRadius: 5,
        borderColor: '#edeef0',
    },
    container: {
        flex: 1,
    },
    createList: {
        backgroundColor: '#0a2c74',
        width: 200,
        height: 87,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginLeft: 20
    },
    titleContainer: {
        margin: 20,
        backgroundColor: Colors.accent,
        width: 170,
        height: 75,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    mainText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: -1 },
        textShadowRadius: 5
    },
    icon: {
        paddingLeft: 10,
    }
});

TaskDetails.navigationOptions = {
    headerTitle: 'Add List',
}

export default TaskDetails;

