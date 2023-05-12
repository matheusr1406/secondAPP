import { ButtonTypeStyleProps, Container, Title } from "./styles";
import { TouchableOpacity } from "react-native";

type Props = TouchableOpacity & {
  title: string;
  type?: ButtonTypeStyleProps;
};

export function Button({ title, type = "PRIMARY", ...rest }: Props) {
  return (
    <Container type={type} {...rest}>
      <Title>{title}</Title>
    </Container>
  );
}
