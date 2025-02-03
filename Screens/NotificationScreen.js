import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NotificationScreen({ route }) {
  const { message } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Received</Text>
      <Text style={styles.message}>
        {message || 'No message received'}
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 20,
  },
  message: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderColor: '#007BFF',
    borderWidth: 1,
    elevation: 3, 
  },
});
