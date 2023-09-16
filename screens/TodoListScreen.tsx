import * as React from 'react';
import { useState, useEffect } from 'react';
import { TouchableOpacity as Button, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { ScrollView } from 'react-native-gesture-handler';
import ButtonTask from '../components/ButtonTask'
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Task = {
  title: string;
  completed: boolean;
}

export default function TodoListScreen() {
  return (
    <View>
      <Todo />
    </View>
  );
}

function Task(props: { task: Task, index: number, onCompleted: (index: number) => void, onRemove: (index: number) => void }) {
  const colorStatus = props.task.completed ? "#4B1469" : "#F6550F";
  
  return (
    <View style={styles.contentTask} >
      <View>
        <Text style={{ textDecorationLine: props.task.completed ? "line-through" : "none" }}>{props.task.title}</Text>
        <View style={[styles.badgeStatus, { borderColor: colorStatus}]} >
          <Text style={[styles.badgeStatusText, { color: colorStatus}]}>
            {props.task.completed ? "Done" : "Undone"}
          </Text>
        </View>
      </View>
      <View style={{ display: "flex", flexDirection: "row", gap: 5 }}>
        <ButtonTask
          onPress={props.onCompleted}
          text='Done/Undone'
          index={props.index}
          width={90}
          backGroundColor='#4B1469'
        />

        <ButtonTask
          onPress={props.onRemove}
          text='Remove'
          index={props.index}
          width={55}
          backGroundColor='red'
        />
      </View>
    </View>
  );
}

function Todo() {
  const [tasks, setTasks] = useState([] as Array<Task>);

  const handleRemoveAll = () => {
    setTasks([]);
    AsyncStorage.clear();
  }

  const addTask = (title: string) => {
    const newTasks = [...tasks, { title, completed: false }];
    setTasks(newTasks);

    AsyncStorage.setItem("listToDo", JSON.stringify(newTasks));
  };

  const completeTask = (index: number) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const removeTask = (index: number) => {
    let arrayTasks = [...tasks];
    arrayTasks.splice(index, 1);

    setTasks(arrayTasks);
    AsyncStorage.setItem("listToDo", JSON.stringify(arrayTasks));
  }

  useEffect(() => {
    AsyncStorage.getItem("listToDo").then((list) => {
      setTasks(list == null ? [] : JSON.parse(list));
    });
  }, []);

  return (
    <View style={styles.container}>
      <Button disabled={tasks.length == 0} onPress={handleRemoveAll} style={[styles.buttonRemoveAll, { opacity: tasks.length > 0 ? 1 : 0 }]}><Text style={{ fontSize: 10, textTransform: "uppercase", color: "white", textAlign: "center" }}>Remove All</Text></Button>
      <ScrollView style={{ height: "82%" }} >
        {tasks.sort((a, b) => {
          if (a.completed) {
            return -1;
          } else {
            return 1;
          }
        }).map((task, index) => (
          <Task
            onCompleted={completeTask}
            onRemove={removeTask}
            task={task}
            index={index}
            key={index}
          />
        ))}
      </ScrollView>
      <View>
        <CreateTask addTask={addTask} />
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
        style={{ backgroundColor: '#ffffff', padding: 10, color: '#000000' }}
        value={value}
        placeholder="Add a new task"
        onChangeText={e => setValue(e)}
      />
      <Button style={{ backgroundColor: "#4b1469", borderRadius: 6, padding: 6 }} onPress={handleSubmit}><Text style={{ textTransform: "uppercase", textAlign: "center", color: "white", fontWeight: "500" }} >Add</Text></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    alignSelf: "center",
    gap: 4
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
  buttonRemoveAll: {
    alignSelf: "flex-end",
    backgroundColor: "red",
    width: 90,
    borderRadius: 60,
    padding: 2
  },
  contentTask: {
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  badgeStatus: {
    width: 50,
    borderWidth: 1,
    borderRadius: 10
  },
  badgeStatusText: {
    fontWeight: "500",
    textAlign: 'center',
    fontSize: 10
  }
});
