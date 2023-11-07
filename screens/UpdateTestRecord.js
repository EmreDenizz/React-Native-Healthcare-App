/**
 * @file UpdateTestRecord.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from "react";
import { Text, View, Button, StyleSheet, TouchableOpacity, SafeAreaView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Dropdown from 'react-native-input-select';

export default function UpdateTestRecord({route, navigation}) {
// State hooks
  const [nurse_name, setnurse_name] = React.useState("");
  const [date, setdate] = React.useState("");
  const [type, settype] = React.useState("");
  const [category, setcategory] = React.useState("");
  const [readings, setreadings] = React.useState("");

  // Get patient id from navigation
  var patient_id = route.params.patient_id;
  var test_id = route.params.test_id;

  const getAllTestDetailsFromAPI = async() => {
    await fetch("http://192.168.17.11:3000/tests/"+test_id).
    then((response) => response.json()).
    then((json) => {
        setnurse_name(json.nurse_name)
        setdate(json.date)
        settype(json.type)
        setcategory(json.category)
        setreadings(json.readings)
    })
    .catch((error) => {
        console.error(error);
    })
}

  // Update button function
  function onClickUpdateButton() {
    // PUT request to API for updating patient
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patient_id: patient_id,
        date: date,
        nurse_name: nurse_name,
        type: type,
        category: category,
        readings: readings,
      })
      
  };
  fetch('http://192.168.17.11:3000/patients/'+patient_id+'/tests/'+test_id, options)
          .then(
                  res => res.json(),
                  navigation.navigate('PatientDetails', {testUpdated: "Successful"})
              )
          .catch((error) => {
              console.error(error);
          })
  }

  // Call while page loading to fetch patient details
  useEffect(() => {
    getAllTestDetailsFromAPI();
}, []);

    return (
        <View><Text><SafeAreaView style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.header}>Update Test</Text>
    
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
              placeholder={"Test Date (YYYY-MM-DD)"}
            />
            <Text> </Text>
            <Text>Type:</Text>
            <Dropdown
              placeholder="Select a test type..."
              options={[
                { label: "Test", value: "Test" },
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
              onChangeText={(text) => setreadings(Number(text))}
              placeholder={"Reading"}
            />
    
            {/* Add button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#3B80C8" }]}
              onPress={onClickUpdateButton}
            >
              <Text
                style={[
                  { color: "white" },
                  { fontSize: 22 },
                  { fontWeight: "bold" },
                  { textAlign: "center" }
                ]}
              >
                Update
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
        // justifyContent: 'center',
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
