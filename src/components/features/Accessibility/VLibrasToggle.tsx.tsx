import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Platform } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

const BUTTON_SIZE = 50;

const toggleVLibrasVisibility = (visible: boolean) => {
    if (Platform.OS === 'web' && (window as any).VLibras && (window as any).VLibras.widget) {
        const widget = (window as any).VLibras.widget;
        
        if (visible) {
            widget.show();
            const vlibrasElement = document.getElementById('vlibras-widget');
            if (vlibrasElement) {
                vlibrasElement.style.cssText = `
                    position: fixed !important; 
                    top: 20px !important; 
                    right: 20px !important; 
                    z-index: 99999 !important;
                    visibility: visible !important;
                `;
            }
        } else {
            widget.hide();
        }
    } else {
        console.warn('VLibras API não está pronta ou não é o ambiente Web.');
    }
};


const VLibrasToggle: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handlePress = () => {
        const newState = !isVisible;
        setIsVisible(newState);
        toggleVLibrasVisibility(newState);
    };

    if (Platform.OS !== 'web') {
        return null; 
    }

    return (
        <View style={styles.buttonPosition}>
            <TouchableOpacity 
                onPress={handlePress} 
                style={styles.toggleButton}
                activeOpacity={0.7}
            >
                <FontAwesome5 name="hands-helping" size={BUTTON_SIZE * 0.6} color="white" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonPosition: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        zIndex: 1000,
    },
    toggleButton: {
        width: BUTTON_SIZE,
        height: BUTTON_SIZE,
        backgroundColor: '#007BFF', 
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5,
        ...Platform.select({
            web: {
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                cursor: 'pointer',
            },
        }),
    },
});

export default VLibrasToggle;