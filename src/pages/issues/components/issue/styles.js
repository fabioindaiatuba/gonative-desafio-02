import { StyleSheet } from 'react-native';
import { colors, metrics } from 'styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: metrics.baseRadius,
    marginTop: metrics.baseMargin / 2,
    padding: metrics.basePadding,
    left: metrics.basePadding,
    width: metrics.screenWidth - 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
  },
  infoContent: {
    flex: 1,
    paddingLeft: metrics.baseMargin,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  infoSubtitle: {
    fontSize: 12,
    color: colors.regular,
  },
});

export default styles;
