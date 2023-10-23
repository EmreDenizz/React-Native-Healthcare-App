import * as React from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react'

export default function Patients({navigation}) {
    return (
        <View> 
            <Button 
                title="Add Patient" 
                onPress={() => navigation.navigate('AddPatient')}
            />
        </View> 
    );
}
