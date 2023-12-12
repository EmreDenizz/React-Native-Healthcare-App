/**
 * @file AddTestRecord.js
 * @author Emre Deniz (301371047)
 * @author Muindo Gituku (301372521)
 * @date Dec 13, 2023
 * @description React Native Project
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

export default function AddTestRecord({ route, navigation }) {
  // State hooks
  const [nurse_name, setnurse_name] = React.useState("");
  const [date, setdate] = React.useState("");
  const [type, settype] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [readings, setReadings] = React.useState("");

  // API server URL
  const apiUrl = "https://nodejs-healthcare-api-server.onrender.com"

  // Get patient id from navigation
  var patient_id = route.params.patient_id;

  // Add button function
  function onClickAddButton() {
    // POST request to API for adding new patient
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nurse_name: nurse_name,
        date: date,
        type: "Test",
        category: category,
        readings: readings,
        patient_id: patient_id,
      })
  };
  fetch(apiUrl+'/patients/'+patient_id+'/tests', options)
      .then(
              res => res.json(),
              navigation.navigate('PatientDetails', {patient_id: patient_id})
          )
      .catch((error) => {
          console.error(error);
      })
  }

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
          placeholder={"Test Date (DD/MM/YYYY)"}
        />
        <Text> </Text>
        <Text>Category:</Text>
        <Dropdown
          placeholder="Select a test category..."
          options={[
            { label: "Blood Pressure", value: "Blood Pressure" },
            { label: "Blood Oxygen Level", value: "Blood Oxygen Level" },
            { label: "Respiratory Rate", value: "Respiratory Rate" },
            { label: "Heart Beat Rate", value: "Heart Beat Rate" },
          ]}
          selectedValue={category}
          onValueChange={(value) => setcategory(value)}
          primaryColor={"green"}
          isMultiple={false}
        />
        <TextInput
          style={styles.inputStyle}
          value={readings.toString()}
          keyboardType="numeric"
          onChangeText={(text) => setReadings(Number(text))}
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
        alignItems: 'center'
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
