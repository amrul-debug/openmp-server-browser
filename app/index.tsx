import { View, StyleSheet } from 'react-native';
import { Redirect } from 'expo-router';

export default function Index() {
  return <Redirect href="/servers" />;
}