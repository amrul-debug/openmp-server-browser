import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Car, Target, UserCircle, Map, Flag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

interface CategoryCardProps {
  name: string;
  count: number;
  icon: string;
}

export function CategoryCard({ name, count, icon }: CategoryCardProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push({
      pathname: '/servers',
      params: { filter: name.toLowerCase() }
    });
  };
  
  const renderIcon = () => {
    const props = { size: 28, color: Colors.primary[400] };
    
    switch (icon) {
      case 'user-circle':
        return <UserCircle {...props} />;
      case 'target':
        return <Target {...props} />;
      case 'car':
        return <Car {...props} />;
      case 'map':
        return <Map {...props} />;
      case 'flag':
        return <Flag {...props} />;
      default:
        return <UserCircle {...props} />;
    }
  };
  
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={styles.iconContainer}>
        {renderIcon()}
      </View>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.count}>{count} servers</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[800],
  },
  iconContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 4,
  },
  count: {
    fontSize: 12,
    color: Colors.gray[500],
  },
});