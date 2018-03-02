import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: metrics.basePadding,
    backgroundColor: colors.white,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: 12,
    height: 30,
    paddingHorizontal: metrics.baseMargin,
    paddingVertical: 0,
    backgroundColor: colors.lighter,
    borderRadius: metrics.baseRadius,
    marginRight: metrics.baseMargin,
  },
  button: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});

export default styles;
