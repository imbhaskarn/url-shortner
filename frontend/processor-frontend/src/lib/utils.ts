import classNames from 'classnames';

// `cn` function to handle conditional class names
export function cn(...args: (string | false | undefined | null | classNames.Argument)[]): string {
  return classNames(...args);
}
