import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { StyleRules } from '@material-ui/core/styles/withStyles';

export const useStyles = <P extends {}>(
  styles:
    | ((theme: Theme, props?: P) => StyleRules<string, P>)
    | StyleRules<string, P>,
  props?: P
) =>
  makeStyles<Theme, P, string>((theme: Theme) =>
    createStyles<string, P>(
      typeof styles === 'function' ? styles(theme, props) : styles
    )
  )(props ?? ({} as P));

export default useStyles;
