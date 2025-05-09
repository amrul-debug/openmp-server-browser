import { useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft, Users, Clock, Globe, Lock, ExternalLink, Star as StarIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useServers } from '@/hooks/useServers';
import { useFavorites } from '@/hooks/useFavorites';
import { ServerDetailCard } from '@/components/ServerDetailCard';
import Colors from '@/constants/Colors';

export default function ServerDetailScreen() {
  const { ip } = useLocalSearchParams<{ ip: string }>();
  const router = useRouter();
  const { servers, isLoading } = useServers();
  const { favorites, toggleFavorite } = useFavorites();
  
  const decodedIp = decodeURIComponent(ip || '');
  const server = servers?.find(s => s.ip === decodedIp);
  const isFavorite = favorites.includes(decodedIp);
  
  const handleConnect = () => {
    //in a productions app, this would launch SA-MP with the correct connection parameters
    if (Platform.OS === 'web') {
      window.open(`samp://${decodedIp}`);
    } else {
      //open a custom URL scheme for mobile
      //this would require a native handler app to be installed
      //linking.openURL(`samp://${decodedIp}`);
      alert(`Connecting to ${server?.hn} (${decodedIp})`);
    }
  };
  
  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer} edges={['top']}>
        <ActivityIndicator size="large" color={Colors.primary[500]} />
      </SafeAreaView>
    );
  }
  
  if (!server) {
    return (
      <SafeAreaView style={styles.errorContainer} edges={['top']}>
        <Text style={styles.errorText}>Server not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color={Colors.text} />
        </Pressable>
        <Pressable 
          style={styles.favoriteButton} 
          onPress={() => toggleFavorite(server.ip)}
        >
          <StarIcon 
            size={24} 
            color={isFavorite ? Colors.warning[400] : Colors.gray[400]}
            fill={isFavorite ? Colors.warning[400] : 'transparent'}
          />
        </Pressable>
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.serverName}>{server.hn}</Text>
        <Text style={styles.serverIp}>{server.ip}</Text>
        
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Users size={20} color={Colors.primary[400]} />
            <Text style={styles.statText}>
              {server.pc} / {server.pm} Players
            </Text>
          </View>
          
          <View style={styles.statItem}>
            <Globe size={20} color={Colors.primary[400]} />
            <Text style={styles.statText}>{server.la}</Text>
          </View>
          
          {server.pa && (
            <View style={styles.statItem}>
              <Lock size={20} color={Colors.warning[400]} />
              <Text style={[styles.statText, { color: Colors.warning[400] }]}>
                Password Protected
              </Text>
            </View>
          )}
        </View>
        
        <ServerDetailCard
          title="Game Mode"
          value={server.gm}
          icon="gamepad-2"
        />
        
        <ServerDetailCard
          title="Version"
          value={server.vn}
          icon="code"
        />
        
        <View style={styles.connectButtonContainer}>
          <Pressable 
            style={styles.connectButton}
            onPress={handleConnect}
          >
            <ExternalLink size={20} color={Colors.white} />
            <Text style={styles.connectButtonText}>Connect to Server</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.error[500],
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: Colors.primary[500],
    fontSize: 16,
    fontWeight: '600',
  },
  favoriteButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  serverName: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 4,
  },
  serverIp: {
    fontSize: 14,
    color: Colors.gray[400],
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 8,
  },
  statText: {
    fontSize: 14,
    color: Colors.text,
    marginLeft: 8,
  },
  connectButtonContainer: {
    marginTop: 32,
  },
  connectButton: {
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});