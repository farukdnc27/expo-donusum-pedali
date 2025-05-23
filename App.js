import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Tab ikonları için
import { Sharing } from 'expo-sharing'; // Expo'nun paylaşım modülü

// Ana Ekran
function HomeScreen() {
  const [userData, setUserData] = useState({
    points: 0,
    distance: 0,
    energy: 0,
  });

  // Paylaşım fonksiyonu
  const handleShare = async () => {
    try {
      const shareOptions = {
        message: `Dönüşüm Pedalı ile bugün ${userData.distance} km bisiklet sürdüm ve ${userData.points} puan kazandım! 🚴‍♂️🌍 #DönüşümPedalı`,
      };
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(shareOptions.message); // Paylaşım işlemi başlatılıyor
      } else {
        console.log("Paylaşım özelliği mevcut değil.");
      }
    } catch (error) {
      console.error('Paylaşım hatası:', error);  // Hata olursa konsola yazdırılır
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchUserData();
      setUserData(data);
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/logo.jpg')}
        style={styles.logo}
      />
      <Text style={styles.title}>Dönüşüm Pedalı</Text>
      <Text style={styles.subtitle}>Sürdürülebilir Hareket için Akıllı Puanlama Sistemi</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Bugünkü Puan: {userData.points}</Text>
        <Text style={styles.statText}>Kat Edilen Mesafe: {userData.distance} km</Text>
        <Text style={styles.statText}>Üretilen Enerji: {userData.energy} kWh</Text>
      </View>

      <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
        <Icon name="share-social" size={24} color="#ffffff" />
        <Text style={styles.shareButtonText}>Başarını Paylaş</Text>
      </TouchableOpacity>

      <Text style={styles.motivationText}>Hedefinize ulaşmak için pedal çevirmeye devam edin! 🚴‍♂️</Text>
    </View>
  );
}

// Puan Marketi Ekranı
function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puan Marketi</Text>
      <Text style={styles.subtitle}>Kazandığınız puanları harcayın!</Text>

      <View style={styles.marketItem}>
        <Text style={styles.marketText}>Toplu Taşıma Bileti - 100 Puan</Text>
      </View>
      <View style={styles.marketItem}>
        <Text style={styles.marketText}>Müze Girişi - 200 Puan</Text>
      </View>
      <View style={styles.marketItem}>
        <Text style={styles.marketText}>Çevre Dostu Mağaza İndirimi - 50 Puan</Text>
      </View>
    </View>
  );
}

function Location() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Konum</Text>
      <Text style={styles.subtitle}>Konum bilgileriniz</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Konum: İstanbul</Text>
        <Text style={styles.statText}>Hava Durumu: Güneşli</Text>
        <Text style={styles.statText}>Sıcaklık: 25°C</Text>
      </View>
    </View>
  );
}

// Profil Ekranı
function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profilim</Text>
      <Text style={styles.subtitle}>İstatistikleriniz ve Ayarlar</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Toplam Puan: 1200</Text>
        <Text style={styles.statText}>Toplam Mesafe: 50 km</Text>
        <Text style={styles.statText}>Toplam Enerji: 2 kWh</Text>
      </View>
    </View>
  );
}

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Ana Sayfa') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Puan Marketi') {
              iconName = focused ? 'gift' : 'gift-outline';
            } else if (route.name === 'Profil') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Konum') {
              iconName = focused ? 'location' : 'location-outline';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2c3e50',
          tabBarInactiveTintColor: '#7f8c8d',
        })}
      >
        <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
        <Tab.Screen name="Puan Marketi" component={MarketScreen} />
        <Tab.Screen name="Konum" component={Location} />
        <Tab.Screen name="Profil" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2ef',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    textAlign: 'center',
    marginBottom: 30,
  },
  statsContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  statText: {
    fontSize: 18,
    color: '#2c3e50',
    marginBottom: 10,
  },
  motivationText: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 20,
    fontStyle: 'italic',
  },
  marketItem: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 15,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  marketText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  shareButton: {
    flexDirection: 'row',
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  shareButtonText: {
    color: '#ffffff',
    fontSize: 16,
    marginLeft: 10,
  },
});
