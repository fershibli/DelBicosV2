import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

const logoImage = require('@assets/DelBicos_LogoH.png');
const teamPhoto = require('@assets/aboutus/TeamDelbicos-profile.png');

const developers = [
  {
    id: 1,
    name: 'Fernando Chibli',
    role: 'CTO and Developer FullStack',
    initial: 'F',
    bio: 'Desenvolvedor com sólida experiência em desenvolvimento de software com Node, Python, React e Java. Formado em Tecnologia em Jogos Digitais, conta com uma carreira de mais de 11 (onze) anos de experiência nacional e internacional trazendo soluções e melhorias para projetos em diversas tecnologias, de aplicativos mobile à servidores em nuvem.',
    photo: null as null | number,
  },
];

function AboutUsScreen() {
  const colors = useColors();
  const styles = createStyles(colors);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}>
      {/* Title */}
      <Text style={styles.pageTitle}>Quem somos</Text>

      {/* Mission Card */}
      <View style={styles.missionCard}>
        <View style={styles.teamPhotoPlaceholder}>
          <Image
            source={teamPhoto}
            style={styles.teamPhotoLogo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.missionTextCol}>
          <Text style={styles.missionText}>
            Nossa missão é revolucionar a experiência de entrega na tecnologia e
            paixão, conectando pessoas e negócios de forma rápida, segura e
            confiável.
          </Text>
          <Text style={styles.tagline}>
            Existimos para simplificar o seu dia a dia.
          </Text>
          <Image
            source={logoImage}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Developers Banner */}
      <View style={styles.developersBanner}>
        <Text style={styles.developersBannerTitle}>Desenvolvedores</Text>
      </View>

      {/* Developer Cards */}
      {developers.map((dev) => (
        <View key={dev.id} style={styles.developerCard}>
          <View style={styles.developerPhotoWrapper}>
            {dev.photo ? (
              <Image source={dev.photo} style={styles.developerPhoto} />
            ) : (
              <View style={styles.developerPhotoPlaceholder}>
                <Text style={styles.developerPhotoInitial}>{dev.initial}</Text>
              </View>
            )}
          </View>

          <View style={styles.developerInfo}>
            <Text style={styles.developerName}>{dev.name}</Text>
            <View style={styles.developerRoleRow}>
              <Text style={styles.developerRole}>{dev.role}</Text>
              <View style={styles.developerInitialBadge}>
                <Text style={styles.developerInitialBadgeText}>
                  {dev.initial}
                </Text>
              </View>
            </View>
            <Text style={styles.developerBio}>{dev.bio}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

export default AboutUsScreen;
