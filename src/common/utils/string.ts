type Props = {
  string: string;
  maxLength: number;
};

export const shortenString = ({ maxLength, string }: Props) => {
  if (string.length <= maxLength) {
    return string;
  }

  return string.slice(0, maxLength) + "...";
};
