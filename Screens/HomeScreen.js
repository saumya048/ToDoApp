import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  StatusBar 
} from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default function HomeScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const [fcmToken, setFcmToken] = useState('');

  useEffect(() => {
    async function getToken() {
      const token = await messaging().getToken();
      setFcmToken(token);
    }
    getToken();
  }, []);

  async function sendTestNotification() {
    if (!message.trim()) {
      Alert.alert('Error', 'Please enter a message');
      return;
    }

    try {
      await fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `key=YOUR_SERVER_KEY_HERE`, 
        },
        body: JSON.stringify({
          to: fcmToken,
          notification: {
            title: 'New Message',
            body: message,
          },
          data: { message },
        }),
      });

      Alert.alert('Success', 'Notification sent!');


      navigation.navigate('Notification', { message });

      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to send notification');
    }
  }

  return (
    <View style={styles.container}>
      
      <StatusBar backgroundColor="#007BFF" barStyle="light-content" />

      
      <Text style={styles.header}>Send Push Notification</Text>

     
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type your message..."
        placeholderTextColor="#aaa"
        style={styles.input}
      />

      
      <TouchableOpacity style={styles.button} onPress={sendTestNotification}>
        <Text style={styles.buttonText}>Send Notification</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    elevation: 2, 
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 3, 
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
  },
};


