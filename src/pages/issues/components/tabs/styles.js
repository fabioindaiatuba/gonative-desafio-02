import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.light,
    padding: metrics.baseMargin,
    margin: metrics.basePadding,
    marginBottom: 5,
    borderRadius: metrics.radius,
  },
  item: {
    color: colors.darkTransparent,
  },
  active: {
    fontWeight: 'bold',
  },
});

export default styles;
