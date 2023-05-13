import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import { groupRemoveByName } from "@storage/group/groupRemoveByName";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { playersGetByGroupAndTeam } from "@storage/player/playerGetByGroupAndTeam";
import { playerRemoveByGroup } from "@storage/player/playerRemoveByGroup";
import { PlayerStorageDTO } from "@storage/player/PlayerStorageDTO";
import { AppError } from "@utils/AppError";
import { useEffect, useState } from "react";
import { FlatList, Keyboard,  Alert } from "react-native";
import { Container, Form, HeaderList, NumberPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState("");
  const [team, setTeam] = useState("TIME A");
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);
  const navigation = useNavigation();

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {
    if(newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar.');
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group);

      Keyboard.dismiss();

      setNewPlayerName('');
      fetchPlayersByTeam();
    } catch (error) {
      if(error instanceof AppError){
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar.');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
  
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);
    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas do time selecionado.');
    } finally {
   
    }
  }

  async function handleRemovePlayer (playerName: string){
    try{
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();
    }catch(error){
      Alert.alert('Remover Pessoa', 'Nao foi possivel remover essa pessoa')
    }
  }

  async function groupRemove() {
    try{
      await groupRemoveByName(group);
      navigation.navigate('groups');

    }catch(error){
      console.log(error);
    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remover', 
      'Deseja remover o grupo',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () =>groupRemove()},
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  },[team])

  return (
    <Container>
      <Header showBackButton />

      <Highlight 
      title={group} 
      subtitle="Adicione a galera e separe os times"
       />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <ButtonIcon 
        icon="add" 
        onPress={handleAddPlayer} 
        />
      </Form>

      <HeaderList>
        <FlatList
          data={["TIME A", "TIME B"]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />
        <NumberPlayers>{players.length}</NumberPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() =>handleRemovePlayer(item.name) } />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time." />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button 
      title="Remover turma" 
      type="SECONDARY" 
      onPress={handleGroupRemove} 
      />
    </Container>
  );
}
function groupRemoveByGroup() {
  throw new Error("Function not implemented.");
}

