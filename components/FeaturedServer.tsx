import { View, Text, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { Users, ExternalLink } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

interface FeaturedServerProps {
  server: {
    ip: string;
    hn: string;
    pc: number;
    pm: number;
    gm: string;
    la: string;
    pa: boolean;
  };
}

export function FeaturedServer({ server }: FeaturedServerProps) {
  const router = useRouter();
  
  const handlePress = () => {
    router.push(`/server/${encodeURIComponent(server.ip)}`);
  };
  
  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <ImageBackground
        source={{ uri: 'https://images.pexels.com/photos/2626428/pexels-photo-2626428.jpeg' }}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.serverName} numberOfLines={1}>{server.hn}</Text>
            <Text style={styles.gameMode}>{server.gm}</Text>
            
            <View style={styles.footer}>
              <View style={styles.playerContainer}>
                <Users size={14} color={Colors.white} />
                <Text style={styles.playerText}>
                  {server.pc}/{server.pm} Players
                </Text>
              </View>
              
              <View style={styles.viewButton}>
                <ExternalLink size={12} color={Colors.white} />
                <Text style={styles.viewButtonText}>View Details</Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    height: 180,
    marginBottom: 24,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  backgroundImageStyle: {
    borderRadius: 12,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  serverName: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.white,
    marginBottom: 4,
  },
  gameMode: {
    fontSize: 14,
    color: Colors.gray[300],
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerText: {
    fontSize: 12,
    color: Colors.gray[300],
    marginLeft: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewButtonText: {
    fontSize: 10,
    color: Colors.white,
    marginLeft: 4,
  },
});