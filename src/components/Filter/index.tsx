import { Container, Title, FilterProps} from "./styles";
import { TouchableOpacityProps } from "react-native";

type Props = TouchableOpacityProps & FilterProps & {
    title: string;
}

export function Filter({title, isActive = false, ...rest}: Props) {
    return (
        <Container
        isActive={isActive}
        {...rest}
        >
        <Title>
            {title}
            </Title>
        </Container>
    )
}