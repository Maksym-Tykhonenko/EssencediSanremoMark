import React, {useEffect, useRef} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Image,
  ImageBackground,
} from 'react-native';

// Конфиг 3×3 мигающих квадратов
const squaresConfig = [
  {top: 0, left: 0, delay: 0},
  {top: 0, left: 10, delay: 75},
  {top: 0, left: 20, delay: 150},
  {top: 10, left: 0, delay: 225},
  {top: 10, left: 10, delay: 300},
  {top: 10, left: 20, delay: 375},
  {top: 20, left: 0, delay: 450},
  {top: 20, left: 10, delay: 525},
  {top: 20, left: 20, delay: 600},
];

/**
 * Loader с мигающими квадратами и последовательным появлением логотипов.
 *
 * @param {Object} props
 * @param {number} [props.duration=6000] - через сколько мс начать исчезновение лоадера (квадраты).
 * @param {function} [props.onEnd]       - колбэк, вызывается после окончания анимации логотипов.
 */
const Loader = ({duration = 3000, onEnd}) => {
  // удвічі менший час
  const animations = useRef(
    squaresConfig.map(() => new Animated.Value(0)),
  ).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const sanremoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Запускаємо мигання квадратів
    animations.forEach((animValue, i) => {
      const {delay} = squaresConfig[i];
      const loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(animValue, {
            toValue: 1,
            duration: 338, // зменшено вдвічі
            delay: delay / 2,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 338, // зменшено вдвічі
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      loopAnimation.start();
    });

    // Через duration / 2 мс починаємо приховувати квадрати
    const fadeTimer = setTimeout(() => {
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 1000, // зменшено вдвічі
        useNativeDriver: true,
      }).start(() => {
        // Послідовна анімація логотипів
        Animated.sequence([
          // Поява першого логотипа
          Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 750, // зменшено вдвічі
            useNativeDriver: true,
          }),
          Animated.delay(1500), // зменшено вдвічі
          // Зникнення першого логотипа
          Animated.timing(logoOpacity, {
            toValue: 0,
            duration: 750, // зменшено вдвічі
            useNativeDriver: true,
          }),
          Animated.delay(250), // зменшено вдвічі
          // Поява другого логотипа
          Animated.timing(sanremoOpacity, {
            toValue: 1,
            duration: 750, // зменшено вдвічі
            useNativeDriver: true,
          }),
          Animated.delay(1500), // зменшено вдвічі
          // Зникнення другого логотипа
          Animated.timing(sanremoOpacity, {
            toValue: 0,
            duration: 750, // зменшено вдвічі
            useNativeDriver: true,
          }),
        ]).start(() => {
          if (onEnd) onEnd();
        });
      });
    }, duration / 2); // зменшено вдвічі

    // Очистка при розмонтуванні
    return () => {
      clearTimeout(fadeTimer);
      animations.forEach(animValue => {
        animValue.stopAnimation();
      });
    };
  }, [animations, duration, fadeOutAnim, logoOpacity, sanremoOpacity, onEnd]);

  return (
    <ImageBackground style={{flex: 1}} source={require('../assets/new/bg.png')}>
      <View style={styles.container}>
        {/* Контейнер квадратів */}
        <Animated.View style={[styles.loaderContainer, {opacity: fadeOutAnim}]}>
          <View style={styles.loader}>
            {squaresConfig.map((item, index) => {
              const animatedStyle = {
                opacity: animations[index],
                transform: [{translateX: item.left}, {translateY: item.top}],
              };
              return (
                <Animated.View
                  key={index}
                  style={[styles.square, animatedStyle]}
                />
              );
            })}
          </View>
        </Animated.View>

        {/* Перший логотип */}
        <Animated.View style={[styles.logoContainer, {opacity: logoOpacity}]}>
          <Image
            source={require('../assets/LogoSanremo.png')}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>

        {/* Другий логотип */}
        <Animated.View
          style={[styles.sanremoContainer, {opacity: sanremoOpacity}]}>
          <Image
            source={require('../assets/sanremo.png')}
            style={styles.sanremoImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </ImageBackground>
  );
};

export default Loader;

// ---------- Стили ----------
const BOX_SIZE = 10;
const WRAPPER_SIZE = 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#191919',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    // контейнер квадратов
  },
  loader: {
    width: WRAPPER_SIZE,
    height: WRAPPER_SIZE,
    position: 'relative',
  },
  square: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'gold',
    position: 'absolute',
  },
  // Позиционирование первого логотипа
  logoContainer: {
    position: 'absolute',
    top: 200, // задаем фиксированное значение, чтобы точно видеть логотип
    alignSelf: 'center',
  },
  logoImage: {
    width: 100,
    height: 100,
  },
  // Позиционирование второго логотипа
  sanremoContainer: {
    position: 'absolute',
    top: 200, // фиксированное значение для второго логотипа
    alignSelf: 'center',
  },
  sanremoImage: {
    width: 400,
    height: 220,
  },
});
