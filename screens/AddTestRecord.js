/**
 * @file AddTestRecord.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from "react";
import {
  Text,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView, TextInput
} from "react-native";
import { useState } from "react";
import Dropdown from 'react-native-input-select';

export default function AddTestRecord({ navigation }) {
  // State hooks
  const [nurse_name, setnurse_name] = React.useState("");
  const [date, setdate] = React.useState("");
  const [type, settype] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [reading, setreading] = React.useState("");

  // Add button function
  function onClickAddButton() {}

  return (
    <View><Text><SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.header}>Add New Test</Text>

        {/* Text Input fields and Dropdowns */}
        <TextInput
          style={styles.inputStyle}
          value={nurse_name}
          onChangeText={(text) => setnurse_name(text)}
          placeholder={"Nurse Name"}
        />
        <TextInput
          style={styles.inputStyle}
          value={date}
          onChangeText={(text) => setdate(text)}
          placeholder={"Test Daate"}
        />
        <Text> </Text>
        <Text>Type:</Text>
        <Dropdown
          placeholder="Select a test type..."
          options={[
            { label: "Test", value: "Test" },
            { label: "Second Opinion", value: "Second Opinion" },
            { label: "Confirmatory", value: "Confirmatory" },
            { label: "Learning", value: "Learning" },
            { label: "Diagnosis", value: "Diagnosis" },
          ]}
          selectedValue={type}
          onValueChange={(value) => settype(value)}
          primaryColor={"green"}
          isMultiple={false}
        />
        <Text>Category:</Text>
        <Dropdown
          placeholder="Select a test category..."
          options={[
            { label: "Blood Pressure", value: "Blood Pressure" },
            { label: "Blood Oxygen Level", value: "Blood Oxygen Level" },
            { label: "Respiratory Rate", value: "Respiratory Rate" },
            { label: "Heartbeat Rate", value: "Heartbeat Rate" },
          ]}
          selectedValue={category}
          onValueChange={(value) => setcategory(value)}
          primaryColor={"green"}
          isMultiple={false}
        />
        <TextInput
          style={styles.inputStyle}
          value={reading}
          onChangeText={(text) => setreading(text)}
          placeholder={"Reading"}
        />

        {/* Add button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#3B80C8" }]}
          onPress={onClickAddButton}
        >
          <Text
            style={[
              { color: "white" },
              { fontSize: 22 },
              { fontWeight: "bold" },
              ,
              { textAlign: "center" },
            ]}
          >
            Add
          </Text>
        </TouchableOpacity>

        {/* Cancel button */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red" }]}
          onPress={() => navigation.pop()}
        >
          <Text
            style={[
              { color: "white" },
              { fontSize: 22 },
              { fontWeight: "bold" },
              { textAlign: "center" },
            ]}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView></Text></View>
  );
}

// Style definitions
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: "white"
    },
    wrapper: {
        padding: 30,
    },
    header: {
        fontSize: 26,
        marginBottom: 5,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    inputStyle: {
        fontSize: 20,
        padding: 10,
        marginTop: 10,
        height: 55,
        width: 330,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 0
    },
    button: {
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        textAlign: 'center',
        borderRadius: 0,
        width: 330
    },
    output: {
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 10
    },
    explanations: {
        fontSize: 20,
        marginTop: 5
    }
});
