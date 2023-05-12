import themes from "@theme/themes";
import { ThemeProvider } from "styled-components";
import {useFonts, Roboto_400Regular, Roboto_700Bold} from "@expo-google-fonts/roboto";
import { Loading } from "@components/Loading";
import { Routes } from "./src/routes";



export default function App() {
  const [fontsloaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  return (
    <ThemeProvider theme={themes}>
      {fontsloaded ? <Routes/> : <Loading />}
    </ThemeProvider>
  );
}
