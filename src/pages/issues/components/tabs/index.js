import React from 'react';
import { View, Text, TouchableOpacity, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

const saveFilter = async (status, funcLoadIssues, funcSaveSelected) => {
  await AsyncStorage.setItem('@Desafio02:status', status);
  funcSaveSelected(status);
  await funcLoadIssues();
};

const Tabs = ({ status, funcLoadIssues, funcSaveSelected }) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={() => saveFilter('all', funcLoadIssues, funcSaveSelected)}>
      <Text style={[styles.item, status === 'all' ? styles.active : null]}>Todas</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => saveFilter('open', funcLoadIssues, funcSaveSelected)}>
      <Text style={[styles.item, status === 'open' ? styles.active : null]}>Abertas</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => saveFilter('closed', funcLoadIssues, funcSaveSelected)}>
      <Text style={[styles.item, status === 'closed' ? styles.active : null]}>Fechadas</Text>
    </TouchableOpacity>
  </View>
);

Tabs.propTypes = {
  status: PropTypes.string.isRequired,
  funcLoadIssues: PropTypes.func.isRequired,
  funcSaveSelected: PropTypes.func.isRequired,
};

export default Tabs;
