import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

export default function RadarLoader() {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Бесконечная анимация полного оборота за 2 секунды
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  // Преобразуем 0..1 → 0..360 градусов
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      {/* Тёмный фон для радиального затемнения */}
      <View style={styles.darkBackground} />

      {/* Внешний круг (рамка) */}
      <View style={styles.outerCircle} />

      {/* Среднее кольцо (dashed) */}
      <View style={styles.middleRing} />

      {/* Малое кольцо (dashed), центрированное */}
      <View style={styles.smallRing} />

      {/* Контейнер для сектора – размером со весь круг, точка вращения в центре */}
      <Animated.View style={[styles.wedgeContainer, { transform: [{ rotate }] }]}>
        {/* Зеленый сектор – занимает 1/4 круга (90°) */}
        <View style={styles.wedge} />
      </Animated.View>
    </View>
  );
}

// Параметры размеров
const SIZE = 150;       // общий размер радара
const MARGIN = 20;      // отступ для среднего кольца
const SMALL_SIZE = 50;  // размер малого кольца

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    position: 'relative',
  },
  darkBackground: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  outerCircle: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 1,
    borderColor: '#333',
  },
  middleRing: {
    position: 'absolute',
    top: MARGIN,
    left: MARGIN,
    right: MARGIN,
    bottom: MARGIN,
    borderRadius: (SIZE - MARGIN * 2) / 2,
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
  },
  smallRing: {
    position: 'absolute',
    width: SMALL_SIZE,
    height: SMALL_SIZE,
    borderRadius: SMALL_SIZE / 2,
    borderWidth: 1,
    borderColor: '#444',
    borderStyle: 'dashed',
    top: (SIZE - SMALL_SIZE) / 2,
    left: (SIZE - SMALL_SIZE) / 2,
  },
  // Контейнер для сектора; его размеры совпадают с радаром, что позволяет вращать сектор вокруг центра
  wedgeContainer: {
    position: 'absolute',
    width: SIZE,
    height: SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Зеленый сектор – 1/4 круга. Размещается так, что его верхний левый угол находится в центре.
  wedge: {
    position: 'absolute',
    top: SIZE / 2,
    left: SIZE / 2,
    width: SIZE / 2,
    height: SIZE / 2,
    backgroundColor: '#FFC243',
    opacity:0.5,
    borderBottomRightRadius: SIZE / 2,
    // Эффект glow через тень
    shadowColor: '#FFC243',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
});