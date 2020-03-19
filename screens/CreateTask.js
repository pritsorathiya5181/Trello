import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Colors from '../constants/Colors';
import InputBar from '../components/InputBar';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import TodoItem from '../components/TodoItem';

class Createtask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
            todoInput: '',
            todos: []
        };
    }

    showHideComponent = () => {
        if (this.state.show === true) {
            this.setState({ show: false })
        } else {
            this.setState({ show: true })
        }
    }

    addNewToDo() {
        // console.log('hellpo');
        let todos = this.state.todos;
        let title = this.state.todoInput;
        if (title === '') { }
        else {
            todos.unshift({
                id: todos.length + 1,
                title,
            })
        }
        this.setState({
            todos: todos,
            todoInput: ''
        })
        // console.log(this.state.todos);
    }

    toggleDone(item) {
        let todos = this.state.todos;
        todos = todos.map((todo) => {
            if (todo.id === item.id) {
                todo.done = !todo.done
            }
            return todo;
        })
        this.setState({ todos })
    }
    gotoDetailScreen(item) {
        this.props.navigation.navigate('detail', {
            title: item.title
        })
    }

    render() {
        return (
            <View>
                {this.state.show ?
                    <TouchableOpacity style={{ ...styles.createBoard, ...styles.border }}
                        onPress={this.showHideComponent}>
                        <Text style={{ ...styles.boardText, ...styles.textShadow }}>Create a new board...</Text>
                    </TouchableOpacity> :
                    <View>
                        <View style={styles.createBoard}>
                            <View style={styles.entryContainer}>
                                <Text style={{
                                    ...styles.boardText, ...styles.textShadow,
                                    width: '90%'
                                }}>Creating a board...</Text>
                                <Ionicons
                                    style={styles.icon}
                                    name='md-close-circle'
                                    type="Ionicons"
                                    type="materialcommunityIcons"
                                    size={26}
                                    color="white"
                                    onPress={this.showHideComponent}
                                />
                            </View>
                        </View>
                        <View style={styles.extraContainer}>
                            {/* <View style={styles.inputContainer}>
                                    <Text style={{
                                        ...styles.textShadow, ...styles.text
                                    }}>What shall we call the board?</Text>
                                    <TextInput
                                        style={styles.inputText}
                                        value={this.state.todoInput}
                                        onChangeText={todoInput => this.setState({ todoInput })}
                                    />
                                    <View style={styles.buttonContainer}>
                                        <TouchableOpacity onPress={this.showHideComponent}>
                                            <Text style={{ ...styles.textShadow, ...styles.text }}>CANCEL</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.button}
                                            onPress={this.addNewTodo}>
                                            <Text style={{ color: 'black', fontFamily: 'open-sans' }}>CREATE</Text>
                                        </TouchableOpacity>
                                    </View> 
                                </View> */}
                            <InputBar
                                addNewToDo={() => this.addNewToDo()}
                                todoInput={this.state.todoInput}
                                showHideComponent={() => this.showHideComponent()}
                                textChange={todoInput => this.setState({ todoInput })}
                            />
                        </View>
                        <FlatList
                            style={styles.list}
                            data={this.state.todos}
                            extraData={this.state}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TodoItem
                                        todoItem={item}
                                        toggleDone={() => this.toggleDone(item)}
                                        gotoDetail={() => this.gotoDetailScreen(item)}
                                    />
                                )
                            }}
                        />
                    </View>
                }
            </View>
        );
    }
}

Createtask.navigationOptions = {
    headerTitle: 'Create Task',
}

const styles = StyleSheet.create({
    list: {
        margin: 15,
        padding: 10,
        height: '65%',
    },
    border: {
        borderRadius: 10,
        height: 70
    },
    createBoard: {
        backgroundColor: Colors.accent,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
        height: '8%',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    extraContainer: {
        backgroundColor: Colors.accent,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 1,
        height: '23%',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    boardText: {
        color: 'white',
        fontFamily: 'open-sans-bold',
        fontSize: 18,
        padding: 10,
    },
    textShadow: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 0, height: -1 },
        textShadowRadius: 5
    },
    entryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 70,
    },
    icon: {
        width: '10%',
    },
});

export default Createtask;