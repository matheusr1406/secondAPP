import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Container, Content, Icon } from "./styles";
import { Input } from "@components/Input";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { groupCreate } from "@storage/group/groupCreate";
import { AppError } from "@utils/AppError";
import { Alert } from "react-native";

export function NewGroup() {
  const [group, setGroup] = useState('');

  const navigation= useNavigation();

  async function handleNew (){
    try{
      if(group.trim().length ===0){
        return Alert.alert('Nova Turma', 'Informe o nome da turma.')
      }
    await groupCreate(group);
    navigation.navigate('players', {group})
    }catch(error){
      if(error instanceof AppError){
        Alert.alert('Nova Turma', error.message)
      };
    }
  }
  return (
    <Container>
      <Header showBackButton />
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        // behavior="padding" 
      >
        <Content>
          <Icon />
          <Highlight
            title="Nova turma"
            subtitle="crie a turma para adicionar novas pessoas"
          />
          <Input 
          placeholder="Nome da Turma"
          onChangeText={setGroup}
          />
          <Button 
          title="Criar" 
          style={{ marginTop: 20 }}
          onPress={handleNew}
          />
        </Content>
      </KeyboardAwareScrollView>
    </Container>
  );
}
