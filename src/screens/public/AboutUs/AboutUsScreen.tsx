import React from 'react';
import { View, Text, ScrollView, Image } from 'react-native';
import { createStyles } from './styles';
import { useColors } from '@theme/ThemeProvider';

const logoImage = require('@assets/DelBicos_LogoH.png');
const teamPhoto = require('@assets/aboutus/TeamDelbicos-profile.png');
const FernandoChibliProfile = require('@assets/aboutus/Fer-profile.png');
const DouglasWenzelProfile = require('@assets/aboutus/Doug-profile.png');
const IsabelMaitoProfile = require('@assets/aboutus/Isa-profile.png');
const GustavoFerreiraProfile = require('@assets/aboutus/Gustavo-profile.png');
const EduardoKamoProfile = require('@assets/aboutus/Edu-profile.png');
const IagoRossanProfile = require('@assets/aboutus/Iago-profile.png');
const LucasConsaniProfile = require('@assets/aboutus/Lucas-profile.png');
const FernandoRibeiroProfile = require('@assets/aboutus/Fernando-profile2.png');

const developers = [
  {
    id: 1,
    name: 'Fernando Chibli',
    role: 'CTO and Developer FullStack',
    initial: 'F',
    bio: 'Desenvolvedor com sólida experiência em desenvolvimento de software com Node, Python, React e Java. Formado em Tecnologia em Jogos Digitais, conta com uma carreira de mais de 11 (onze) anos de experiência nacional e internacional trazendo soluções e melhorias para projetos em diversas tecnologias, de aplicativos mobile à servidores em nuvem.',
    photo: FernandoChibliProfile,
  },

  {
    id: 2,
    name: 'Douglas Wenzel',
    role: 'Scrum Master and Developer FullStack',
    initial: 'D',
    bio: 'Desenvolvedor de software com foco em soluções intuitivas, seguras e escaláveis. Possuo conhecientos com Node.js no backend com Express + Sequelize, React Native no mobile, e Python para Machine Learning. Tenho olhar analítico pra segurança, busco código limpo e eficiente. Acredito em tecnologia acessível, por isso crio conteúdos didáticos. Simplicidade é o ápice da sofisticação, e é assim que eu programo. Nos intervalos dos commits, a Pitchuluca - minha filha de quatro patas - supervisiona tudo em casa.',
    photo: DouglasWenzelProfile,
  },

  {
    id: 3,
    name: 'Isabel Maito',
    role: 'Designer and Developer FullStack',
    initial: 'I',
    bio: 'Formada em Design Gráfico e com mais de uma década de atuação no setor editorial, trago um olhar apurado para usabilidade e hierarquia visual que aplico diretamente na criação de interfaces centradas no usuário. Como Desenvolvedora Frontend e Fullstack, uno essa forte base criativa a mais de dois anos de experiência técnica na construção de aplicações web do zero. Possuo domínio prático de todo o ciclo de desenvolvimento, atuando com autonomia desde o levantamento de requisitos e prototipagem no Figma até a codificação frontend, integração com APIs REST e modelagem de dados, utilizando tecnologias como React, Node.js e MySQL.',
    photo: IsabelMaitoProfile,
  },

  {
    id: 4,
    name: 'Gustavo Ferreira',
    role: 'Developer Frontend',
    initial: 'G',
    bio: 'Sou Frontend Software Developer, apaixonado por criar interfaces que sejam ao mesmo tempo bonitas, funcionais e fáceis de usar. Trabalho com desenvolvimento web utilizando principalmente React, JavaScript/TypeScript, HTML e CSS, sempre buscando escrever código limpo, reutilizável e bem estruturado. Estou em constante evolução, aprimorando minhas habilidades em arquitetura frontend, boas práticas de desenvolvimento e integração com APIs.',
    photo: GustavoFerreiraProfile,
  },

  {
    id: 5,
    name: 'Eduardo Kamo',
    role: 'Developer FullStack',
    initial: 'E',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photo: EduardoKamoProfile,
  },

  {
    id: 6,
    name: 'Iago Rossan',
    role: 'Developer FullStack',
    initial: 'I2',
    bio: 'Profissional de TI de 24 anos com perfil sociável, analítico e focado em negócios. Minha trajetória começou no suporte de hardware e evoluiu por áreas de logística e comercial (Selbetti), o que me deu uma visão completa da jornada do cliente. Atualmente cursando Desenvolvimento de Software (Fatec) e atuando na Faktory Softwares, utilizo minha bagagem técnica e comercial para traduzir as necessidades dos usuários, apoiar o desenvolvimento de sistemas e aplicar soluções eficientes e adaptáveis',
    photo: IagoRossanProfile,
  },

  {
    id: 7,
    name: 'Lucas Consani',
    role: 'Developer FullStack',
    initial: 'L',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photo: LucasConsaniProfile,
  },

  {
    id: 8,
    name: 'Fernando Ribeiro',
    role: 'Developer FullStack',
    initial: 'F2',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    photo: FernandoRibeiroProfile,
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
      {developers.map((dev, index) => (
        <View
          key={dev.id}
          style={[
            styles.developerCard,
            index % 2 !== 0 && styles.developerCardReversed,
          ]}>
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
            <Text style={[styles.developerName, index % 2 !== 0 && styles.developerNameReversed]}>{dev.name}</Text>
            <View style={[styles.developerRoleRow, index % 2 !== 0 && styles.developerRoleRowReversed]}>
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
