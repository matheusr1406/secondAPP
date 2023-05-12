import { Alert, FlatList } from "react-native";
import { useCallback, useState } from "react";
import { GroupCard } from "@components/GroupCard";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { StatusBar } from "react-native";
import { Container } from "./styles";
import { ListEmpty } from "@components/ListEmpty";
import { Button } from "@components/Button";
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { groupsGetAll } from "@storage/group/groupsGetAll";

export function Groups() {
  const [groups, setGroups] = useState<string[]>(['Nomes']);
  
  const navigation = useNavigation();

  function handleNewGroup (){
    navigation.navigate('new');
  }

  function handleOpenGroup (group: string){

    navigation.navigate('players', {group});

  }


  async function fetchGroups (){
    try{
      const data = await groupsGetAll();
      setGroups(data);
    }catch(error){
      console.log(error);
    }
  }

  


  useFocusEffect(useCallback(()=> {
    console.log('executouuuuuu')
    fetchGroups();
  },[]));

  return (
    <Container>
      <Header />
      <Highlight title="Turmas" subtitle="Jogue com a sua turma" />
      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
        <GroupCard 
        title={item} 
        onPress={() => handleOpenGroup(item)}
        />
      }
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message="Que tal cadastrar a primeira turma?" />
        )}
      />

      <Button
      title="Criar nova turma"
      onPress={handleNewGroup}
      />

      <StatusBar barStyle="light-content" />
    </Container>
  );
}
