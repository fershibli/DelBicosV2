export const getIconForSubCategory = (title: string) => {
  const lower = title.toLowerCase();
  
  // Beleza & Estética
  if (lower.includes('cabelo') || lower.includes('barba')) return 'cut';
  if (lower.includes('depila')) return 'leaf';
  if (lower.includes('sobrancelha')) return 'eye';
  if (lower.includes('estetic') || lower.includes('massagem') || lower.includes('spa')) return 'spa';
  if (lower.includes('manicure') || lower.includes('pedicure')) return 'hand-sparkles';
  if (lower.includes('podologia')) return 'shoe-prints';
  if (lower.includes('maquiagem')) return 'magic';
  if (lower.includes('micropigmentação')) return 'pen-nib';
  if (lower.includes('unha')) return 'hand-paper';

  // Saúde & Bem Estar
  if (lower.includes('psicólog') || lower.includes('terapi') || lower.includes('mente')) return 'brain';
  if (lower.includes('fisioterap')) return 'crutch';
  if (lower.includes('nutri') || lower.includes('dieta')) return 'apple-alt';
  if (lower.includes('personal') || lower.includes('treino') || lower.includes('fit')) return 'dumbbell';
  if (lower.includes('enferm') || lower.includes('cuidador')) return 'user-nurse';
  if (lower.includes('fono')) return 'headset';
  if (lower.includes('médic') || lower.includes('consult')) return 'stethoscope';
  if (lower.includes('odonto') || lower.includes('dentis')) return 'tooth';
  if (lower.includes('acupuntura')) return 'map-pin';
  if (lower.includes('yoga') || lower.includes('medita')) return 'om';

  // Reformas & Manutenção
  if (lower.includes('eletric') || lower.includes('energia')) return 'bolt';
  if (lower.includes('encanador') || lower.includes('hidráulica')) return 'wrench';
  if (lower.includes('limpeza') || lower.includes('faxina')) return 'broom';
  if (lower.includes('pintura') || lower.includes('pintor')) return 'paint-roller';
  if (lower.includes('pedreiro') || lower.includes('construção')) return 'hard-hat';
  if (lower.includes('marcen') || lower.includes('móve') || lower.includes('madeira')) return 'hammer';
  if (lower.includes('vidro') || lower.includes('janela')) return 'border-all';
  if (lower.includes('ar-condicionado') || lower.includes('clima')) return 'snowflake';
  if (lower.includes('jardim') || lower.includes('paisag')) return 'seedling';
  
  // Pets
  if (lower.includes('banho') && lower.includes('tosa')) return 'bath';
  if (lower.includes('pet') || lower.includes('cachorro') || lower.includes('gato')) return 'paw';
  if (lower.includes('veterin')) return 'notes-medical';
  if (lower.includes('passeador') || lower.includes('dog walker')) return 'dog';
  
  // Tecnologia / Outros
  if (lower.includes('computador') || lower.includes('ti') || lower.includes('format')) return 'laptop';
  if (lower.includes('celular') || lower.includes('smartphone')) return 'mobile-alt';
  if (lower.includes('foto') || lower.includes('vídeo')) return 'camera';
  if (lower.includes('aula') || lower.includes('prof')) return 'chalkboard-teacher';
  if (lower.includes('motorista') || lower.includes('frete') || lower.includes('mudança') || lower.includes('carreto')) return 'truck';
  if (lower.includes('chaveiro')) return 'key';

  // Padrão fallback
  return 'star';
};
