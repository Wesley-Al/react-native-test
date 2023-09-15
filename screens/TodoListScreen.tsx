import * as React from 'react';
import {useState} from 'react';
import {Button, StyleSheet, TextInput} from 'react-native';
import {Text, View} from '../components/Themed';

export type Task = {
  title: string
  completed: boolean
}

export default function TodoListScreen() {
  return (
    <View style={styles.container}>
      <Todo/>
    </View>
  );
}

function Task(props: { task: Task, index: number, onCompleted: (index: number) => void }) {
  return (
    <View>
      💡<Text style={{textDecorationLine: props.task.completed ? "line-through" : "none"}}>{props.task.title}</Text>
      <Button onPress={() => (props.onCompleted(props.index))} title={props.task.completed ? "Undone" : "Done"}/>
    </View>
  );
}

function Todo() {
  const [tasks, setTasks] = useState([
    {
      title: "Grab some Pizza",
      completed: true
    },
    {
      title: "Do your workout",
      completed: true
    },
    {
      title: "Hangout with friends",
      completed: false
    }
  ]);

  const addTask = (title: string) => {
    const newTasks = [...tasks, {title, completed: false}];
    setTasks(newTasks);
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <View>
      <div>
        {tasks.map((task, index) => (
          <Task
            onCompleted={completeTask}
            task={task}
            index={index}
            key={index}
          />
        ))}
      </div>
      <View>
        <CreateTask addTask={addTask}/>
      </View>
    </View>
  );
}

function CreateTask(props: { addTask: (value: string) => void }) {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    props.addTask(value);
    setValue("");
  }

  return (
    <View>
      <TextInput
        style={{backgroundColor: '#ffffff', padding: 10, color: '#000000'}}
        value={value}
        placeholder="Add a new task"
        onChangeText={e => setValue(e)}
      />
      <Button onPress={handleSubmit} title={"Add"}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
