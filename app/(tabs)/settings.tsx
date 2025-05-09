import { useState } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PageHeader } from '@/components/PageHeader';
import { Settings as SettingsIcon, Moon, Sun, Github, ExternalLink, Heart } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { useTheme } from '@/contexts/ThemeContext';

export default function SettingsScreen() {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PageHeader title="Settings" subtitle="Customize your experience" />
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingTextContainer}>
              {isDarkMode ? <Moon size={20} color={Colors.primary[400]} /> : <Sun size={20} color={Colors.primary[400]} />}
              <Text style={styles.settingText}>Dark Mode</Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: Colors.gray[700], true: Colors.primary[400] }}
              thumbColor={Colors.white}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          
          <Pressable style={styles.settingItem} onPress={() => openLink('https://open.mp')}>
            <View style={styles.settingTextContainer}>
              <ExternalLink size={20} color={Colors.primary[400]} />
              <Text style={styles.settingText}>Open.MP Website</Text>
            </View>
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => openLink('https://github.com/openmultiplayer/web')}>
            <View style={styles.settingTextContainer}>
              <Github size={20} color={Colors.primary[400]} />
              <Text style={styles.settingText}>GitHub Repository</Text>
            </View>
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => openLink('https://open.mp/donate')}>
            <View style={styles.settingTextContainer}>
              <Heart size={20} color={Colors.primary[400]} />
              <Text style={styles.settingText}>Support the Project</Text>
            </View>
          </Pressable>
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.version}>open.mp Server Browser v1.0.0</Text>
          <Text style={styles.copyright}>© 2025 open.mp Community</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[800],
  },
  settingTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontSize: 16,
    color: Colors.text,
    marginLeft: 12,
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingTop: 24,
  },
  version: {
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: Colors.gray[600],
  },
});