import React, { Component } from 'react';
import {
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';

import Header from './components/header';
import Repository from './components/repository';
import styles from './styles';

export default class Repositories extends Component {
  static navigationOptions = {
    header: ({ scene }) => (
      <Header saveRepository={repository => scene.route.params.saveRepository(repository)} />
    ),
  }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      setParams: PropTypes.func.isRequired,
    }).isRequired,
  };

  state = {
    loading: true,
    refreshing: false,
    repositories: [],
    error: null,
  }

  componentDidMount() {
    // AsyncStorage.clear();

    this.loadRepositories();
    this.props.navigation.setParams({
      saveRepository: this.saveRepository,
    });
  }

  loadRepositories = async () => {
    this.setState({ refreshing: true });

    try {
      const response = await AsyncStorage.getItem('@Desafio02:repositories');
      const repositories = JSON.parse(response);
      this.setState({ repositories, refreshing: false, loading: false });
    } catch (err) {
      this.showError('Erro ao abrir lista de repositorios');
    }
  }

  saveRepository = async (repository) => {
    if (repository.length === 0) return;

    this.setState({ error: '', loading: true });
    try {
      const response = await this.checkUserExists(repository);
      const newRepository = await {
        id: response.data.id,
        name: response.data.name,
        full_name: response.data.full_name,
        login: response.data.owner.login,
        url: response.data.owner.avatar_url,
      };

      if (this.state.repositories && this.state.repositories.length) {
        await AsyncStorage.setItem('@Desafio02:repositories', JSON.stringify([newRepository, ...this.state.repositories]));
      } else {
        await AsyncStorage.setItem('@Desafio02:repositories', JSON.stringify([newRepository]));
      }

      await this.loadRepositories();
      this.setState({ loading: false });
    } catch (err) {
      this.showError('Repositório inválido!');
    }
  };

  showError = (error) => {
    this.setState({ error, loading: false });
    Alert.alert(
      'Erro',
      this.state.error,
      [
        { text: 'OK', onPress: () => console.log(this.state.error) },
      ],
      { cancelable: false },
    );
  }

  checkUserExists = async (repository) => {
    const response = await api.get(`repos/${repository}`);
    return response;
  }

  renderListItem = ({ item }) => (
    <Repository repository={item} navigate={this.props.navigation.navigate} />
  );

  renderRepositories = () => (
    <FlatList
      keyExtractor={repository => String(repository.id)}
      data={this.state.repositories}
      refreshing={this.state.refreshing}
      onRefresh={this.loadRepositories}
      renderItem={this.renderListItem}
    />
  )

  render() {
    return (
      <View style={styles.container}>
        {
          this.state.loading
            ? <ActivityIndicator size="large" color="#999" style={styles.loading} />
            : this.renderRepositories()
        }
      </View>
    );
  }
}
