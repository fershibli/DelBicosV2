import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  View,
  Platform,
  Dimensions,
  Text,
} from 'react-native';
import ProfessionalCard from '@components/ui/ProfessionalCard';
import { useProfessionalStore } from '@stores/Professional';
import { ListedProfessional } from '@stores/Professional/types';

// --- Constantes e Funções Auxiliares ---
const SIZE_LIMIT = 12; // Quantidade de itens por página

const getNumColumns = (width: number) => {
  if (Platform.OS === 'web') {
    if (width > 1200) return 4;
    if (width > 900) return 3;
    if (width > 600) return 2;
  }
  return 1; // 1 coluna no mobile por padrão
};

// --- Componente Principal ---
const ListProfessionals = () => {
  // --- Estados ---
  const [page, setPage] = useState(0); // Página atual (começa em 0)
  const [professionals, setProfessionals] = useState<ListedProfessional[]>([]); // Lista de profissionais
  const [loadingInitial, setLoadingInitial] = useState(true); // Controla o loading da primeira carga
  const [loadingMore, setLoadingMore] = useState(false); // Controla o loading das páginas seguintes
  const [hasMore, setHasMore] = useState(true); // Indica se há mais páginas para carregar
  const [numColumns, setNumColumns] = useState(() =>
    getNumColumns(Dimensions.get('window').width),
  ); // Número de colunas (responsivo)
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref para o debounce

  // --- Store ---
  const { fetchProfessionals } = useProfessionalStore();

  // --- Efeitos ---
  // Ajusta o número de colunas ao redimensionar a tela
  useEffect(() => {
    const updateColumns = () => {
      setNumColumns(getNumColumns(Dimensions.get('window').width));
    };
    const subscription = Dimensions.addEventListener('change', updateColumns);
    return () => subscription?.remove();
  }, []);

  // Busca a primeira página de dados ao montar o componente
  useEffect(() => {
    const loadInitialData = async () => {
      setLoadingInitial(true);
      setHasMore(true); // Reseta 'hasMore'
      setPage(0); // Garante que começa da página 0
      setProfessionals([]); // Limpa a lista anterior
      try {
        const initialProfessionals = await fetchProfessionals(
          '',
          0,
          SIZE_LIMIT,
        ); // Busca página 0
        setProfessionals(initialProfessionals);
        if (initialProfessionals.length < SIZE_LIMIT) {
          setHasMore(false); // Não há mais páginas
        }
      } catch (error) {
        console.error('Erro ao carregar profissionais iniciais:', error);
        setHasMore(false); // Para de tentar carregar em caso de erro
      } finally {
        setLoadingInitial(false);
      }
    };
    loadInitialData();
  }, [fetchProfessionals]); // Depende apenas da função do store

  // Limpa o timeout do debounce ao desmontar
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // --- Funções de Callback ---
  // Função para buscar a próxima página
  const handleNextPage = useCallback(async () => {
    // Aborta se já estiver carregando, se não houver mais dados, ou se a carga inicial ainda não terminou
    if (loadingMore || !hasMore || loadingInitial) {
      return;
    }

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      const newProfessionals = await fetchProfessionals(
        '',
        nextPage,
        SIZE_LIMIT,
      );

      if (newProfessionals && newProfessionals.length > 0) {
        // Adiciona apenas os novos profissionais que ainda não estão na lista
        setProfessionals((prev) => {
          const existingIds = new Set(prev.map((p) => p.id));
          const uniqueNewProfessionals = newProfessionals.filter(
            (p) => !existingIds.has(p.id),
          );
          return [...prev, ...uniqueNewProfessionals];
        });
        setPage(nextPage); // Atualiza o número da página atual

        // Se a API retornou menos itens que o limite, não há mais páginas
        if (newProfessionals.length < SIZE_LIMIT) {
          setHasMore(false);
        }
      } else {
        // Se a API retornou um array vazio, não há mais páginas
        setHasMore(false);
      }
    } catch (error) {
      console.error('Erro ao carregar próxima página de profissionais:', error);
      setHasMore(false); // Para de tentar carregar em caso de erro
    } finally {
      setLoadingMore(false); // Finaliza o estado de carregamento
    }
  }, [loadingMore, hasMore, page, fetchProfessionals, loadingInitial]); // Dependências corretas

  // Função intermediária com debounce para o onEndReached
  const handleEndReached = () => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
    // Agenda a chamada a handleNextPage apenas se as condições forem válidas
    if (!loadingMore && hasMore && !loadingInitial) {
      debounceTimeoutRef.current = setTimeout(() => {
        handleNextPage();
      }, 300); // Delay de 300ms
    }
  };

  // --- Renderização ---
  // Exibe loading inicial
  if (loadingInitial) {
    return (
      <View style={{ paddingVertical: 40, alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#003366" />
      </View>
    );
  }

  // Renderiza a FlatList
  return (
    <FlatList
      data={professionals}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      key={numColumns.toString()} // Chave dinâmica para forçar re-renderização ao mudar colunas
      // Estilo para o wrapper de cada linha quando há múltiplas colunas
      columnWrapperStyle={
        numColumns > 1
          ? { justifyContent: 'flex-start', paddingHorizontal: 8 } // Alinha itens à esquerda
          : undefined
      }
      // Renderiza cada item (card do profissional)
      renderItem={({ item }) => (
        // Container para definir a largura correta de cada item na grade
        <View style={{ width: `${100 / numColumns}%` }}>
          <ProfessionalCard professional={item} />
        </View>
      )}
      // Callback chamado ao chegar ao fim da lista
      onEndReached={handleEndReached}
      onEndReachedThreshold={0.3} // Dispara quando 30% do final estiver visível
      // Componente exibido no rodapé (loading ou mensagem de "sem mais")
      ListFooterComponent={() => {
        if (loadingMore) {
          return (
            <View style={{ padding: 20 }}>
              <ActivityIndicator />
            </View>
          );
        } else if (!hasMore && professionals.length > 0) {
          return (
            <Text
              style={{ textAlign: 'center', padding: 15, color: '#6c757d' }}>
              Não há mais profissionais para mostrar.
            </Text>
          );
        } else {
          return null; // Não mostra nada se não estiver carregando e houver mais ou a lista estiver vazia
        }
      }}
      // Componente exibido se a lista estiver vazia após a carga inicial
      ListEmptyComponent={
        <Text style={{ textAlign: 'center', padding: 20, color: '#6c757d' }}>
          Nenhum profissional encontrado.
        </Text>
      }
    />
  );
};

export default ListProfessionals;
