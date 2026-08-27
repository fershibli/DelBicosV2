import React from 'react';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';

/**
 * No aplicativo Mobile (iOS/Android), a navegação é gerenciada exclusivamente pelo TabNavigator
 * (menu inferior de 4 abas) e pelos cabeçalhos nativos das telas quando necessário.
 * Retornar null remove completamente a barra de cabeçalho da web da visualização mobile.
 */
const HeaderNative: React.FC<NativeStackHeaderProps> = () => null;

export default HeaderNative;
