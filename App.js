import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ScrollView,
  FlatList,
  Pressable,
  Keyboard,
} from "react-native";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [inputText, setInputText] = useState("");
  const [goalsList, setGoalsList] = useState([]);

  function handleText(values) {
    setInputText(values);
  }

  function submitGoal() {
    if (inputText.length > 0)
      setGoalsList((goalsList) => [
        ...goalsList,
        {
          text: inputText,
          id: uuidv4(),
        },
      ]);
    setInputText("");
    Keyboard.dismiss();
  }

  function removeGoal(id) {
    setGoalsList((currentGoalsList) => {
      return currentGoalsList.filter((goal) => goal.id !== id);
    });
  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          place
          holder="Your goal"
          onChangeText={handleText}
          value={inputText}
        />
        <Button title="Add Goal" onPress={submitGoal} />
      </View>
      <View style={styles.goalsContainer}>
        <FlatList
          data={goalsList}
          renderItem={(goal) => {
            return (
              <Pressable onPress={removeGoal.bind(this, goal.item.id)}>
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{goal.item.text}</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    // backgroundColor: "#5e0acc",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#0079f2",
  },
  goalText: {
    color: "white",
  },
});
