import React from 'react';
import { SafeAreaView } from 'react-native';
import PhotosList from './PhotosList';
import styles from './styles';

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <PhotosList />
        </SafeAreaView>
    );
}
