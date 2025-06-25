import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';

type Professional = {
  name: string;
  avatarImg?: string;
};

interface ProfessionalInfoProps {
  professional: {
    name: string;
    avatarImg?: string;
  };
  appointmentDate: string;
  appointmentTime: string;
}

const ProfessionalInfo: React.FC<ProfessionalInfoProps> = ({
  professional,
  appointmentDate,
  appointmentTime,
}) => {
  if (!professional) return null;

  return (
    <View style={styles.professionalContainer}>
      <View style={styles.professionalInfoRow}>
        <Image
          source={{
            uri:
              professional.avatarImg ||
              'https://png.pngtree.com/element_our/20200610/ourmid/pngtree-character-default-avatar-image_2237203.jpg',
          }}
          style={styles.partnerLogo}
        />
        <View style={styles.textContainer}>
          <Text style={styles.professionalName}>{professional.name}</Text>
          <Text style={styles.serviceInfo}>
            Serviço solicitado em {appointmentDate} às {appointmentTime}
          </Text>
          <TouchableOpacity>
            <Text style={styles.viewProfessionalText}>Ver profissional</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProfessionalInfo;
