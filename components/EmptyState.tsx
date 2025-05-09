import { View, Text, StyleSheet } from 'react-native';
import { Star, Search, Info } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface EmptyStateProps {
  title: string;
  message: string;
  icon: string;
}

export function EmptyState({ title, message, icon }: EmptyStateProps) {
  const renderIcon = () => {
    const props = { size: 48, color: Colors.gray[600] };
    
    switch (icon) {
      case 'star':
        return <Star {...props} />;
      case 'search':
        return <Search {...props} />;
      default:
        return <Info {...props} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: Colors.gray[500],
    textAlign: 'center',
    maxWidth: 280,
  },
});