// HomeScreen.js
import React from 'react';
import { Button, View, Text } from 'react-native';

const DetailsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Home Screen"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

export default DetailsScreen;
