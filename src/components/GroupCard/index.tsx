import { Title } from "@components/GroupCard/styles";
import { TouchableOpacityProps } from "react-native";
import { Container, Icon } from "./styles";

type Props = TouchableOpacityProps & {
    title: string;

}

export function GroupCard ({title, ...rest} : Props) {
    return ( 
        <Container {...rest}>
            <Icon/>
            <Title>{title}</Title>
        </Container>
    )
}