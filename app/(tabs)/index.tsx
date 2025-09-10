import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { makeChatRequest } from '../../utils/chat';

export default function HomeScreen() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);

  const sendMessage = async () => {
    if (!message.trim()) return;
    const userMsg = { role: 'user', content: message };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setMessage('');
    try {
      const response = await makeChatRequest(newMessages);
      const aiMsg = { role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset={80}>
      <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          style={styles.textBox}
          placeholder='Type a message...'
        />
        <TouchableOpacity onPress={sendMessage}>
          <Feather style={styles.sendIcon} name="send" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          msg.role === 'user' ? (
            <View key={index} style={styles.userMessage}>
              <Text style={{ color: '#fff' }}>{msg.content}</Text>
            </View>
          ) : (
            <View key={index} style={styles.AIMessage}>
              <Text style={{ color: '#1e1e1e' }}>{msg.content}</Text>
            </View>
          )
        ))}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    backgroundColor: '#000',
  },
  userMessage: {
    color: '#fff',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    alignSelf: 'flex-end',
    maxWidth: '80%',
  },
  AIMessage: {
    color: '#1e1e1eff',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messagesContainer: {
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1
  },
  textBox: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    flex: 1,
    color: '#fff'
  },
  sendIcon: {
    marginLeft: 8,
    color: '#fff',
  }
});
