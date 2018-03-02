import React, { Component } from 'react';
import {
  View,
  FlatList,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import PropTypes from 'prop-types';
import api from 'services/api';
import Issue from './components/issue';
import Tabs from './components/tabs';
import { colors } from 'styles';

import styles from './styles';

export default class Issues extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
  });

  static propTypes ={
    navigation: PropTypes.PropTypes.shape({
      state: PropTypes.PropTypes.shape({
        params: PropTypes.PropTypes.shape({
          repository: PropTypes.string,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    status: '',
    issues: [],
    loading: false,
    refreshing: false,
  }

  componentDidMount = async () => {
    await this.loadSelectedItem();
    this.funcLoadIssues();
  }

  loadSelectedItem = async () => {
    const status = await AsyncStorage.getItem('@Desafio02:status') || 'all';
    this.funcSaveSelected(status);
  }

  funcSaveSelected = (status) => {
    this.setState({ status });
  }

  funcLoadIssues = async () => {
    this.setState({ refreshing: true });
    const { status } = this.state;
    const { repository } = this.props.navigation.state.params;

    const response = await api.get(`repos/${repository}/issues?state=${status}`);

    this.setState({ issues: response.data, refreshing: false, status });
  }

  renderIssues = () => (
    <FlatList
      data={this.state.issues}
      keyExtractor={issue => String(issue.id)}
      refreshing={this.state.refreshing}
      onRefresh={this.funcLoadIssues}
      renderItem={({ item }) => (
        <Issue issue={item} repository={this.props.navigation.state.params.repository} />
      )}
    />
  )

  render() {
    const { status } = this.state;
    return (
      <View style={styles.container}>
        <Tabs
          status={status}
          funcLoadIssues={this.funcLoadIssues}
          funcSaveSelected={this.funcSaveSelected}
        />
        {
          this.state.loading
            ? <ActivityIndicator size="large" color={colors.regular} styte={styles.loading} />
            : this.renderIssues()
        }
      </View>
    );
  }
}
