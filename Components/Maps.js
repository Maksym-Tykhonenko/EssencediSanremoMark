import React, {useState, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  Share,
  ImageBackground,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import {SavedContext} from '../SavedContext';

const data = {
  'Historical Landmarks': [
    {
      name: 'Forte Santa Tecla',
      description:
        'Built between 1755 and 1756, this triangular-shaped fort was constructed by the Republic of Genoa to control the local population. It now serves as a cultural venue.',
      coordinates: '43.8156° N, 7.7761° E',
      image: require('../assets/ph1.png'),
    },
    {
      name: 'Villa Nobel',
      description:
        'The former residence of Alfred Nobel, the inventor of dynamite, now houses a museum dedicated to his life and work.',
      coordinates: '43.8125° N, 7.7736° E',
      image: require('../assets/ph2.png'),
    },
    {
      name: 'Teatro Ariston',
      description:
        'A renowned theater in Sanremo, famous for hosting the annual Sanremo Music Festival since 1977.',
      coordinates: '43.8150° N, 7.7765° E',
      image: require('../assets/ph3.png'),
    },
    {
      name: 'Chiesa Russa Ortodossa',
      description:
        'Built in the early 20th century by the Russian community, this church is a symbol of Sanremo’s historical ties with Russia.',
      coordinates: '43.8142° N, 7.7768° E',
      image: require('../assets/ph4.png'),
    },
    {
      name: 'La Pigna',
      description:
        'The historic center of Sanremo, characterized by its labyrinthine streets and medieval architecture.',
      coordinates: '43.8148° N, 7.7762° E',
      image: require('../assets/ph5.png'),
    },
  ],
  'Cultural Spots': [
    {
      name: 'Museo Civico (Civic Museum)',
      description:
        "Housed in the Palazzo Borea d'Olmo, this museum showcases archaeological and artistic collections.",
      coordinates: '43.8153° N, 7.7767° E',
      image: require('../assets/ph6.png'),
    },
    {
      name: "Teatro dell'Opera del Casinò",
      description:
        'A historic theater within the Sanremo Casino, hosting various cultural events and performances.',
      coordinates: '43.8151° N, 7.7770° E',
      image: require('../assets/ph7.png'),
    },
    {
      name: 'Villa Ormond',
      description:
        'A villa with a beautiful park, hosting cultural events and exhibitions.',
      coordinates: '43.8128° N, 7.7732° E',
      image: require('../assets/ph8.png'),
    },
    {
      name: 'Palazzo Bellevue',
      description:
        'Built between 1893 and 1894, now serves as the town hall and is a notable example of Belle Époque architecture.',
      coordinates: '43.8154° N, 7.7768° E',
      image: require('../assets/ph9.png'),
    },
    {
      name: "Museo del Palazzo Borea d'Olmo",
      description:
        'A museum in a historic palace, offering insights into the local history and culture.',
      coordinates: '43.8153° N, 7.7767° E',
      image: require('../assets/ph10.png'),
    },
  ],
  'Restaurants and Cafes': [
    {
      name: 'Ristorante Da Vittorio',
      description:
        'A renowned restaurant offering traditional Italian cuisine with a focus on seafood.',
      coordinates: '43.8152° N, 7.7766° E',
      image: require('../assets/ph11.png'),
    },
    {
      name: 'Trattoria Dal Gavi',
      description:
        'A cozy trattoria known for its Ligurian specialties and local wines.',
      coordinates: '43.8151° N, 7.7765° E',
      image: require('../assets/ph12.png'),
    },
    {
      name: 'Caffè Pasticceria Milano',
      description:
        'A historic café offering pastries and coffee, perfect for a traditional Italian breakfast.',
      coordinates: '43.8150° N, 7.7764° E',
      image: require('../assets/ph13.png'),
    },
    {
      name: 'Ristorante Il Giardino',
      description:
        'An elegant restaurant with a garden setting, serving Mediterranean cuisine.',
      coordinates: '43.8153° N, 7.7767° E',
      image: require('../assets/ph14.png'),
    },
    {
      name: 'Caffè Sanremo',
      description:
        'A popular spot for coffee and light meals, located in the heart of the city.',
      coordinates: '43.8152° N, 7.7766° E',
      image: require('../assets/ph15.png'),
    },
  ],
  'Scenic Views & Nature': [
    {
      name: 'Giardini Regina Elena',
      description:
        'A public garden offering panoramic views of the city and the sea.',
      coordinates: '43.8129° N, 7.7733° E',
      image: require('../assets/ph16.png'),
    },
    {
      name: 'Pista Ciclabile Area 24 - Sanremo',
      description:
        'A scenic bike path along the coast, providing beautiful views of the Mediterranean.',
      coordinates: '43.8155° N, 7.7769° E',
      image: require('../assets/ph17.png'),
    },
    {
      name: 'Portosole',
      description:
        'A picturesque marina with luxury yachts, offering a serene environment.',
      coordinates: '43.8127° N, 7.7731° E',
      image: require('../assets/ph18.png'),
    },
    {
      name: 'Parco di Villa Ormond',
      description:
        'A park surrounding Villa Ormond, featuring exotic plants and walking paths.',
      coordinates: '43.8128° N, 7.7732° E',
      image: require('../assets/ph19.png'),
    },
    {
      name: 'Forte di Santa Tecla',
      description:
        'A historic fort offering panoramic views of the city and the sea.',
      coordinates: '43.8156° N, 7.7761° E',
      image: require('../assets/ph20.png'),
    },
  ],
};

const allSpots = Object.keys(data).reduce((acc, cat) => {
  data[cat].forEach(spot => {
    spot.category = cat;
    acc.push(spot);
  });
  return acc;
}, []);

// Функция парсинга координат
function parseCoordinates(coordStr) {
  const parts = coordStr.split(',');
  if (parts.length !== 2) return {latitude: 0, longitude: 0};
  const latPart = parts[0].trim(); // "43.8156° N"
  const lngPart = parts[1].trim(); // "7.7761° E"
  const latitude = parseFloat(latPart.split('°')[0]);
  const longitude = parseFloat(lngPart.split('°')[0]);
  return {latitude, longitude};
}

export default function MapScreen() {
  const [randomSpot, setRandomSpot] = useState(null);

  // Используем SavedContext
  const {savedSpots, toggleSavedSpot} = useContext(SavedContext);

  // **Изменения: вычисляем isSaved и savedIcon на основе randomSpot, а не selectedSpot**
  const isSaved = randomSpot
    ? savedSpots.some(s => s.name === randomSpot.name)
    : false;
  const {width, height} = Dimensions.get('window');

  // Начальный регион для карты
  const [region, setRegion] = useState({
    latitude: 43.815,
    longitude: 7.776,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  // Реф на карту
  const mapRef = useRef(null);

  // Текущий выбранный объект и его индекс
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Обработчик нажатия на маркер
  const handleMarkerPress = (spot, index) => {
    setSelectedSpot(spot);
    setSelectedIndex(index);
    // При выборе маркера можно тоже переместить камеру (по желанию)
    const coords = parseCoordinates(spot.coordinates);
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      1000,
    );
  };

  // Открыть координаты в Google Maps
  const handleOpenOnMaps = spot => {
    const url =
      'https://maps.google.com?q=' + encodeURIComponent(spot.coordinates);
    Linking.openURL(url);
  };

  const handleShare = spot => {
    const message = `Check this spot: ${spot.name}\n${spot.description}`;
    Share.share({message});
  };

  // Переход к предыдущему пину + анимация карты
  const handlePrev = () => {
    if (selectedIndex === null) return;
    let newIndex = selectedIndex - 1;
    if (newIndex < 0) {
      newIndex = allSpots.length - 1; // Зацикливание
    }
    setSelectedSpot(allSpots[newIndex]);
    setSelectedIndex(newIndex);

    // Перемещаем карту к новому пину
    const coords = parseCoordinates(allSpots[newIndex].coordinates);
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      1000,
    );
  };

  // Переход к следующему пину + анимация карты
  const handleNext = () => {
    if (selectedIndex === null) return;
    let newIndex = selectedIndex + 1;
    if (newIndex >= allSpots.length) {
      newIndex = 0; // Зацикливание
    }
    setSelectedSpot(allSpots[newIndex]);
    setSelectedIndex(newIndex);

    // Перемещаем карту к новому пину
    const coords = parseCoordinates(allSpots[newIndex].coordinates);
    mapRef.current?.animateToRegion(
      {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: region.latitudeDelta,
        longitudeDelta: region.longitudeDelta,
      },
      1000,
    );
  };

  // Зум «плюс» и «минус»
  const handleZoomIn = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 0.5,
      longitudeDelta: prev.longitudeDelta * 0.5,
    }));
  };

  const handleZoomOut = () => {
    setRegion(prev => ({
      ...prev,
      latitudeDelta: prev.latitudeDelta * 2,
      longitudeDelta: prev.longitudeDelta * 2,
    }));
  }; // Темный стиль карты
  const darkMapStyle = [
    {
      elementType: 'geometry',
      stylers: [{color: '#1f1f1f'}],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{color: '#999999'}],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{color: '#1f1f1f'}],
    },
    {
      featureType: 'poi',
      stylers: [{visibility: 'off'}],
    },
    {
      featureType: 'road',
      stylers: [{color: '#2c2c2c'}],
    },
    {
      featureType: 'water',
      stylers: [{color: '#000000'}],
    },
  ];

  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      {/* Шапка (head.png) */}
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/head.png')}
          style={styles.headerImage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.goldLine} />

      {/* Карта */}
      <MapView
        ref={mapRef}
        style={styles.map}
        region={region}
        onRegionChangeComplete={r => setRegion(r)}
        customMapStyle={darkMapStyle}>
        {allSpots.map((spot, index) => {
          const coords = parseCoordinates(spot.coordinates);
          return (
            <Marker
              key={index}
              coordinate={coords}
              onPress={() => handleMarkerPress(spot, index)}>
              {/* Жёлтый пин */}
              <Image
                source={require('../assets/YellowPin.png')}
                style={styles.pinIcon}
              />
            </Marker>
          );
        })}
      </MapView>

      {/* Кнопки зума (+/-) */}
      <View style={styles.zoomButtonsContainer}>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomIn}>
          <Text style={styles.zoomButtonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.zoomButton} onPress={handleZoomOut}>
          <Text style={styles.zoomButtonText}>-</Text>
        </TouchableOpacity>
      </View>

      {/* Если выбран spot, показываем окно */}
      {selectedSpot && (
        <View style={styles.overlayContainer}>
          <View style={styles.foundSpotCard}>
            <ImageBackground
              source={selectedSpot.image}
              style={styles.foundSpotBg}
              imageStyle={styles.foundSpotBgImage}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.99)']}
                start={{x: 0.5, y: -0.1}}
                end={{x: 0.5, y: 0.5}}
                style={styles.foundSpotGradient}>
                <View style={styles.foundSpotContent}>
                  <Text style={styles.foundSpotTitle}>{selectedSpot.name}</Text>
                  <Text style={styles.foundSpotDesc}>
                    {selectedSpot.description}
                  </Text>

                  <View style={styles.actionsRow}>
                    <TouchableOpacity
                      style={styles.buttonSmall}
                      onPress={() => handleOpenOnMaps(selectedSpot)}>
                      <Text style={styles.buttonSmallText}>Open on maps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.iconButton,
                        {backgroundColor: isSaved ? '#FFC243' : '#191919'},
                      ]}
                      onPress={() => toggleSavedSpot(selectedSpot)}>
                      <Image
                        source={require('../assets/saved.png')}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.iconButton}
                      onPress={() => handleShare(selectedSpot)}>
                      <Image
                        source={require('../assets/bookmark.png')}
                        style={styles.iconImage}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </View>

          <View style={styles.switchContainer}>
            <TouchableOpacity style={styles.switchButton} onPress={handlePrev}>
              <Image
                source={require('../assets/arrowL.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSelectedSpot(null);
                setSelectedIndex(null);
              }}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchButton} onPress={handleNext}>
              <Image
                source={require('../assets/arrowR.png')}
                style={styles.iconImage}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImageContainer: {
    width: '100%',
    height: 120,
    overflow: 'hidden',
  },
  headerImage: {
    alignSelf: 'center',
    width: '100%',
    marginTop: 20,
    padding: 10,
    height: 100,
  },
  goldLine: {
    height: 2,
    backgroundColor: '#B29049',
    width: '100%',
  },

  // Карта
  map: {
    paddingTop: 122,
    marginTop: -100,
    marginBottom: -30,
    flex: 1,
  },
  pinIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },

  // Кнопки зума
  zoomButtonsContainer: {
    position: 'absolute',
    top: 130,
    right: 10,
    flexDirection: 'column',
    zIndex: 999,
  },
  zoomButton: {
    backgroundColor: '#191919',
    marginBottom: 10,
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonText: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },

  // Overlay для выбранного spot
  overlayContainer: {
    position: 'absolute',
    bottom: 20, // чуть выше, чтобы оставить место для кнопок
    left: 10,
    right: 10,
  },
  foundSpotCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#444',
  },
  foundSpotBg: {
    width: '100%',
    height: 260,
    justifyContent: 'flex-end',
  },
  foundSpotBgImage: {
    resizeMode: 'cover',
  },
  foundSpotGradient: {
    justifyContent: 'flex-end',
  },
  foundSpotContent: {
    padding: 10,
  },
  foundSpotTitle: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: -4,
    fontFamily: 'InknutAntiqua-Medium',
  },
  foundSpotDesc: {
    color: '#FFF',
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 10,
    width: '95%',
    flexWrap: 'wrap',
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonSmall: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 1,
    marginRight: 90,
  },
  buttonSmallText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 14,
    fontFamily: 'InknutAntiqua-Medium',
  },
  iconButton: {
    borderWidth: 1,
    borderColor: '#FFF',
    width: 36,
    height: 36,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },

  // Кнопки переключения пинов + Close
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  switchButton: {
    backgroundColor: '#191919',
    paddingHorizontal: 31,
    paddingVertical: 11.5,
    borderWidth: 1,
    borderColor: '#FFFFF',
    marginHorizontal: 10,
  },
  switchButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    marginBottom: -10,
    marginTop: -10,
    backgroundColor: '#191919',
    paddingHorizontal: 55,
    paddingVertical: 2,
    borderColor: '#FFFFFF',
    borderWidth: 1,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#FFF',

    fontFamily: 'InknutAntiqua-Medium',
  },
});
