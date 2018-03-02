import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.dark,
    margin: metrics.baseMargin,
    padding: metrics.basePadding,
    borderRadius: metrics.baseRadius,
  },
});

export default styles;
