/**
 * @file App.js -> React Native Healthcare App
 * @author Emre Deniz
 * @author Muindo Gituku
 */

import * as React from 'react';
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import PatientsScreen from './screens/Patients'
import AddPatientScreen from './screens/AddPatient'
import PatientDetailsScreen from './screens/PatientDetails'
import UpdatePatientScreen from './screens/UpdatePatient'
import AddTestRecordScreen from './screens/AddTestRecord'
import UpdateTestRecordScreen from './screens/UpdateTestRecord'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <NavigationContainer> 
            <Stack.Navigator> 
                <Stack.Screen name="Patients" component = {PatientsScreen} /> 
                <Stack.Screen name="AddPatient" component = {AddPatientScreen} /> 
                <Stack.Screen name="PatientDetails" component = {PatientDetailsScreen} /> 
                <Stack.Screen name="UpdatePatient" component = {UpdatePatientScreen} /> 
                <Stack.Screen name="AddTestRecord" component = {AddTestRecordScreen} /> 
                <Stack.Screen name="UpdateTestRecord" component = {UpdateTestRecordScreen} /> 
            </Stack.Navigator> 
        </NavigationContainer> 
    );
}
