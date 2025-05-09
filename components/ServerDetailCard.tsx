import { View, Text, StyleSheet } from 'react-native';
import { Code, Gamepad2 } from 'lucide-react-native';
import Colors from '@/constants/Colors';

interface ServerDetailCardProps {
  title: string;
  value: string;
  icon: string;
}

export function ServerDetailCard({ title, value, icon }: ServerDetailCardProps) {
  const renderIcon = () => {
    const props = { size: 20, color: Colors.primary[400] };
    
    switch (icon) {
      case 'gamepad-2':
        return <Gamepad2 {...props} />;
      case 'code':
        return <Code {...props} />;
      default:
        return <Code {...props} />;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: Colors.gray[800],
  },
  iconContainer: {
    marginRight: 16,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    color: Colors.gray[500],
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
});