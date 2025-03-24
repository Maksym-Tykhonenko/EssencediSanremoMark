import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

const slidesData = [
  {
    id: 1,
    step: '1/6',
    heading: 'Welcome to Essence di Sanremo!',
    description:
      'Immerse yourself in the spirit of Sanremo! Discover its culture, history, and exciting places to visit.',
    image: require('../assets/new/bg.png'),
  },
  {
    id: 2,
    step: '2/6',
    heading: 'Find the Perfect Spot',
    description:
      'Browse through various categories and discover the best locations around Sanremo based on your interests.',
    image: require('../assets/new/bg.png'),
  },
  {
    id: 3,
    step: '3/6',
    heading: 'Navigate with Ease',
    description:
      'Use our interactive map to explore all the marked locations in Sanremo. Your adventure awaits!',
    image: require('../assets/new/bg.png'),
  },
  {
    id: 4,
    step: '4/6',
    heading: "Dive Into Sanremo's Culture",
    description: "Dive Into Sanremo's Culture",
    image: require('../assets/new/bg.png'),
  },
  {
    id: 5,
    step: '5/6',
    heading: 'Travel Smart',
    description:
      "Get tips and recommendations to make the most of your trip to Sanremo, whether you're a first-time visitor or a seasoned traveler.",
    image: require('../assets/new/bg.png'),
  },
  {
    id: 6,
    step: '6/6',
    heading: 'Keep Your Favorites',
    description:
      'Save your favorite spots and revisit them anytime for a tailored experience. Keep your journey personal!',
    image: require('../assets/new/bg.png'),
  },
];

const {width} = Dimensions.get('window');

export default function Start({navigation}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handlePress = () => {
    if (currentIndex < slidesData.length - 1) {
      const nextIndex = currentIndex + 1;
      scrollViewRef.current?.scrollTo({x: nextIndex * width, animated: true});
    } else {
      navigation.navigate('Tabs', {
        screen: 'Menu',
      });
    }
  };

  const onMomentumScrollEnd = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / width);
    setCurrentIndex(newIndex);
  };

  const isLastSlide = currentIndex === slidesData.length - 1;
  const buttonText = isLastSlide ? 'Done' : 'Next';

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        style={{flex: 1}}>
        {slidesData.map(slide => (
          <View key={slide.id} style={styles.slideContainer}>
            <ImageBackground
              source={slide.image}
              style={styles.imageBackground}
              imageStyle={{resizeMode: 'cover'}}>
              <LinearGradient
                colors={['rgba(25, 25, 25, 0)', '#191919']}
                style={styles.gradientOverlay}
              />
              <View style={styles.titleContainer}>
                <Image
                  source={require('../assets/sanremo.png')}
                  style={styles.sanremoImage}
                />
              </View>
            </ImageBackground>

            <View style={styles.goldLine} />

            <View style={styles.contentContainer}>
              <View style={styles.stepIndicatorBox}>
                <Text style={styles.stepIndicatorText}>{slide.step}</Text>
              </View>
              <ScrollView
                style={styles.textScroll}
                showsVerticalScrollIndicator={false}>
                <Text style={styles.heading}>{slide.heading}</Text>
                <Text style={styles.description}>{slide.description}</Text>
              </ScrollView>

              <TouchableOpacity style={styles.button} onPress={handlePress}>
                <Text style={styles.buttonText}>{buttonText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// ----- Стили -----
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191919',
  },
  slideContainer: {
    width,
    flex: 1,
    backgroundColor: '#191919',
  },
  imageBackground: {
    flex: 1.4,
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sanremoImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: -40,
  },
  goldLine: {
    height: 2,
    backgroundColor: '#FFC243',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#191919',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },

  // Блок "1/6": чёрный фон (#191919), тонкая золотая рамка (#FFC243), белый текст
  stepIndicatorBox: {
    alignSelf: 'center',
    borderColor: '#B29049',
    borderWidth: 1,
    backgroundColor: '#111111',
    paddingHorizontal: 25,
    paddingVertical: 3,
    marginBottom: 8,
  },
  stepIndicatorText: {
    fontSize: 12, // уменьшили
    color: '#FFFFFF',
    fontFamily: 'InknutAntiqua-Medium',
  },

  // Прокрутка для текста (heading, description)
  textScroll: {
    flex: 1, // чтобы текст занимал доступное пространство и прокручивался
    marginBottom: 10,
  },
  heading: {
    fontSize: 18, // слегка уменьшили

    color: '#FFFFFF',
    marginBottom: 8,
    fontFamily: 'InknutAntiqua-Medium',
  },
  description: {
    fontSize: 15, // тоже немного меньше
    color: '#CCCCCC',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#FFC243',
    borderRadius: 6,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: '#191919',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'InknutAntiqua-Medium',
  },
});
