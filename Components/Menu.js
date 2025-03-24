import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Animated,
  Easing,
  Linking,
  Share,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RadarLoader from './RadarLoader';
import {SavedContext} from '../SavedContext';
// ------------------- Пример локальных данных (замените на свои при необходимости) -------------------

// Пример локальных изображений для категорий
const catImages = {
  'Historical Landmarks': require('../assets/p101.png'),
  'Restaurants and Cafes': require('../assets/p102.png'),
  'Cultural Spots': require('../assets/p103.png'),
  'Scenic Views & Nature': require('../assets/p104.png'),
};

// Иконки для категорий
const headerIcons = {
  'Historical Landmarks': require('../assets/icon1.png'),
  'Restaurants and Cafes': require('../assets/icon2.png'),
  'Cultural Spots': require('../assets/icon3.png'),
  'Scenic Views & Nature': require('../assets/icon4.png'),
};

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

const categories = Object.keys(data);
const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showScanScreen, setShowScanScreen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [randomSpot, setRandomSpot] = useState(null);

  // Используем SavedContext
  const {savedSpots, toggleSavedSpot} = useContext(SavedContext);

  // **Изменения: вычисляем isSaved и savedIcon на основе randomSpot, а не selectedSpot**
  const isSaved = randomSpot
    ? savedSpots.some(s => s.name === randomSpot.name)
    : false;

  // Функция выбора случайного места
  const handleRandomSpot = category => {
    if (!category) return;
    setIsSearching(true);
    setRandomSpot(null);

    setTimeout(() => {
      const spotsArray = data[category];
      if (!spotsArray || spotsArray.length === 0) {
        setRandomSpot(null);
      } else {
        const randomIndex = Math.floor(Math.random() * spotsArray.length);
        setRandomSpot(spotsArray[randomIndex]);
      }
      setIsSearching(false);
    }, 2000);
  };

  // Открыть координаты в Google Maps
  const handleOpenOnMaps = spot => {
    const url =
      'https://maps.google.com?q=' + encodeURIComponent(spot.coordinates);
    Linking.openURL(url);
  };

  // Поделиться информацией
  const handleShare = spot => {
    const message = `Check this spot: ${spot.name}\n${spot.description}`;
    Share.share({message});
  };

  // Начать сканирование (второй «экран»)
  const startScan = () => {
    setShowScanScreen(true);
    handleRandomSpot(selectedCategory);
  };

  // --- ЭКРАН 0: Сетка категорий ---
  if (!selectedCategory) {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/new/bg.png')}>
        <ScrollView style={styles.scrollContainer}>
          {/* Шапка */}
          <View style={styles.headerImageContainer}>
            <Image
              source={require('../assets/head.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.goldLine} />
          <View style={styles.mainHeaderContainer}>
            <Text style={styles.mainHeaderText}>Explore Sanremo:</Text>
          </View>
          <View style={styles.gridContainer}>
            {categories.map(cat => (
              <TouchableOpacity
                key={cat}
                style={styles.categoryCard}
                onPress={() => {
                  setSelectedCategory(cat);
                  setShowScanScreen(false);
                }}>
                <ImageBackground
                  source={catImages[cat]}
                  style={styles.categoryImageBg}
                  imageStyle={{borderRadius: 5}}>
                  <LinearGradient
                    colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9999)']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 0.65}}
                    style={styles.gradientOverlay}>
                    <View style={styles.categoryOverlayContent}>
                      {headerIcons[cat] && (
                        <Image
                          source={headerIcons[cat]}
                          style={styles.categoryHeaderIcon}
                        />
                      )}
                      <Text style={styles.categoryTitle}>{cat}</Text>
                      <Text style={styles.categorySubtitle}>
                        {cat === 'Historical Landmarks' &&
                          'Explore Sanremo’s rich history through its monuments, buildings, and famous sites.'}
                        {cat === 'Restaurants and Cafes' &&
                          'Enjoy a selection of the best restaurants and cafes, from traditional to modern.'}{' '}
                        {cat === 'Cultural Spots' &&
                          'Discover art galleries, theaters, and other cultural venues that reflect the city’s spirit.'}
                        {cat === 'Scenic Views & Nature' &&
                          'Find spots with breathtaking views, parks, and peaceful natural settings around Sanremo.'}
                      </Text>
                    </View>
                  </LinearGradient>
                </ImageBackground>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }

  // --- ЭКРАН 1: Выбранная категория, ещё не сканируем ---
  if (selectedCategory && !showScanScreen) {
    return (
      <ImageBackground
        style={{flex: 1}}
        source={require('../assets/new/bg.png')}>
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.headerImageContainer}>
            <Image
              source={require('../assets/head.png')}
              style={styles.headerImage}
              resizeMode="contain"
            />
          </View>
          <View style={styles.goldLine} />
          <View style={styles.mainHeaderContainer}>
            <Text style={styles.mainHeaderText}>Explore Sanremo:</Text>
          </View>
          <View style={styles.bigCategoryCard}>
            <ImageBackground
              source={catImages[selectedCategory]}
              style={styles.bigCardBg}
              imageStyle={{borderRadius: 8}}>
              <LinearGradient
                colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.9999)']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 0.7}}
                style={styles.bigCardOverlay}>
                {headerIcons[selectedCategory] && (
                  <Image
                    source={headerIcons[selectedCategory]}
                    style={styles.categoryHeaderIcon1}
                  />
                )}
                <Text style={styles.bigCardTitle}>{selectedCategory}</Text>
                <Text style={styles.bigCardDesc}>
                  {selectedCategory === 'Historical Landmarks' &&
                    'Explore Sanremo’s rich history through its monuments, buildings, and famous sites.'}
                  {selectedCategory === 'Restaurants and Cafes' &&
                    'Enjoy a selection of the best restaurants and cafes, from traditional to modern.'}
                  {selectedCategory === 'Cultural Spots' &&
                    "Discover art galleries, theaters, and other cultural venues that reflect the city's spirit."}
                  {selectedCategory === 'Scenic Views & Nature' &&
                    'Find spots with breathtaking views, parks, and peaceful natural settings around Sanremo.'}
                </Text>
              </LinearGradient>
            </ImageBackground>
          </View>
          <TouchableOpacity style={styles.randomButton2} onPress={startScan}>
            <Text style={styles.randomButtonText}>Start scanning</Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
    );
  } // --- ЭКРАН 2: Сканирование / результат ---
  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerImageContainer}>
          <Image
            source={require('../assets/head.png')}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.goldLine} />
        {isSearching && (
          <>
            <View style={styles.scanHeaderContainer}>
              {headerIcons[selectedCategory] && (
                <Image
                  source={headerIcons[selectedCategory]}
                  style={styles.scanHeaderIcon}
                />
              )}
              <Text style={styles.scanHeaderTitle}>{selectedCategory}</Text>
            </View>
            <View style={styles.radarBlock}>
              <RadarLoader />
            </View>
            <Text style={styles.searchingText}>
              Searching spot for you…{'\n'}Please wait…
            </Text>
          </>
        )}
        {!isSearching && randomSpot && (
          <>
            <View style={styles.scanHeaderContainer}>
              {headerIcons[selectedCategory] && (
                <Image
                  source={headerIcons[selectedCategory]}
                  style={styles.scanHeaderIcon}
                />
              )}
              <Text style={styles.scanHeaderTitle}>{selectedCategory}</Text>
            </View>
            <Text style={styles.foundSpotHeader}>Found Spot:</Text>
            <View style={styles.foundSpotCard}>
              <ImageBackground
                source={randomSpot.image}
                style={styles.foundSpotBg}
                imageStyle={styles.foundSpotBgImage}>
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.99)']}
                  start={{x: 0.5, y: -0.2}}
                  end={{x: 0.5, y: 0.5}}
                  style={styles.foundSpotGradient}>
                  <View style={styles.foundSpotContent}>
                    <Text style={styles.foundSpotTitle}>{randomSpot.name}</Text>
                    <Text style={styles.foundSpotDesc}>
                      {randomSpot.description}
                    </Text>
                    <View style={styles.actionsRow}>
                      <TouchableOpacity
                        style={styles.buttonSmall}
                        onPress={() => handleOpenOnMaps(randomSpot)}>
                        <Text style={styles.buttonSmallText}>Open on maps</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.iconButton,
                          {backgroundColor: isSaved ? '#FFC243' : '#191919'},
                        ]}
                        onPress={() => toggleSavedSpot(randomSpot)} // Используем randomSpot
                      >
                        <Image
                          source={require('../assets/saved.png')}
                          style={styles.iconImage}
                          resizeMode="cover"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => handleShare(randomSpot)}>
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
            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setSelectedCategory(null);
                  setRandomSpot(null);
                  setShowScanScreen(false);
                }}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.randomButton}
                onPress={() => handleRandomSpot(selectedCategory)}>
                <Text style={styles.randomButtonText}>Search again</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        {!isSearching && !randomSpot && (
          <Text style={styles.searchingText}>
            No spots found or something went wrong.
          </Text>
        )}
      </ScrollView>
    </ImageBackground>
  );
}
// ================== Стили ==================
const RADAR_SIZE = 120;
const styles = StyleSheet.create({
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  backButton: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: -10,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'InknutAntiqua-Medium',
  },
  foundSpotHeader: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 8,
    textAlign: 'center',
    fontFamily: 'InknutAntiqua-Medium',
  },

  foundSpotCard: {
    // убираем фон, т.к. используем ImageBackground
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 8,
    overflow: 'hidden', // чтобы скруглённые углы применялись и к фоновому изображению
    borderWidth: 1,
    borderColor: '#444',
  },

  // ImageBackground
  foundSpotBg: {
    width: '110%',
    height: 280, // Высота под ваш вкус
    justifyContent: 'flex-end',
  },
  foundSpotBgImage: {
    // Любые дополнительные стили для самого изображения
    resizeMode: 'cover',
  },

  // Полупрозрачная «подложка» (градиент)
  foundSpotGradient: {
    paddingHorizontal: -10,
    paddingVertical: -5,
    justifyContent: 'flex-end',
    borderRadius: 2,
  },

  foundSpotContent: {
    padding: 10,

    // Если нужно ещё отступы внутри подложки
  },

  foundSpotTitle: {
    color: '#FFF', // белым, как на скриншоте
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: -6,
    fontFamily: 'InknutAntiqua-Medium',
  },

  foundSpotDesc: {
    color: '#FFF',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 9,
    width: '90%', // карточка уже имеет границы, но укажем явно
    flexWrap: 'wrap', // перенос строк
    flexShrink: 1,
  },
  scrollContainer: {
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
  mainHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  mainHeaderText: {
    fontSize: 25,
    color: '#FFFFFF',
    marginBottom: -25,
    marginTop: -15,
    fontFamily: 'InknutAntiqua-Medium',
  },

  // --- Сетка категорий ---
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
  },
  categoryCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 1.5,
    marginBottom: 16,
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: '#333',
  },
  categoryImageBg: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  categoryOverlayContent: {
    padding: 8,
  },
  categoryHeaderIcon: {
    width: 25,
    height: 25,
    marginBottom: 5,
  },
  categoryHeaderIcon1: {
    width: 25,
    height: 25,
    marginBottom: 5,
    marginLeft: 10,
  },
  categoryTitle: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: -2,
    fontFamily: 'InknutAntiqua-Medium',
    lineHeight: 32,
  },
  categorySubtitle: {
    fontSize: 12,
    color: '#FFF',
    lineHeight: 16,
  },

  // --- Большая карточка категории ---
  bigCategoryCard: {
    borderWidth: 2,
    borderColor: '#FFC243',
    borderRadius: 8,
    overflow: 'hidden',
    margin: 16,
    marginBottom: 12,
  },
  bigCardBg: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  bigCardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  bigCardTitle: {
    fontSize: 17,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 4,
    marginLeft: 10,
    fontFamily: 'InknutAntiqua-Medium',
  },
  bigCardDesc: {
    fontSize: 12,
    color: '#FFFFFF',
    marginLeft: 10,
    marginBottom: 8,
  }, // --- Сканирование ---
  scanHeaderContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scanHeaderIcon: {
    width: 50,
    height: 50,
    marginBottom: 8,
    marginTop: -10,
    tintColor: '#FFC243',
  },
  scanHeaderTitle: {
    marginTop: -20,
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
    marginBottom: -35,
    fontFamily: 'InknutAntiqua-Medium',
  },
  radarBlock: {
    backgroundColor: '#121212',
    marginHorizontal: 16,
    marginTop: 30,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  searchingText: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },

  foundSpotImage: {
    width: '100%',
    height: 220,
    borderRadius: 6,
    marginBottom: 8,
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
    backgroundColor: '#191919',
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

    // tintColor: '#FFF', // если хотите «окрасить» иконку в белый
  },
  iconButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },

  // --- Кнопка "Search again" ---
  randomButton: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 43,
    paddingVertical: 14,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: -20,
    marginBottom: 20,
  },
  randomButton2: {
    backgroundColor: '#FFC243',
    paddingHorizontal: 43,
    paddingVertical: 14,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  randomButtonText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 15,
    fontFamily: 'InknutAntiqua-Medium',
  },
});
