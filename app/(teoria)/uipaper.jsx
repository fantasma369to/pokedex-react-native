import styled from "styled-components/native";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { DataTable } from 'react-native-paper';
import { useEffect, useState } from "react";
import { Searchbar } from 'react-native-paper';
import { SegmentedButtons } from 'react-native-paper';
export function Uipaper() {
  const [value, setValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0]
  );
  const [items] = useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
   ]);
 
   const from = page * itemsPerPage;
   const to = Math.min((page + 1) * itemsPerPage, items.length);
 
   useEffect(() => {
     setPage(0);
   }, [itemsPerPage]);


  return (
    <Container>
     <ActivityIndicator animating={true} color={MD2Colors.amber300} />
     <Button icon="camera" mode="contained" onPress={() => console.log('Pressed')}>
    Press me
  </Button>
  <Card.Title
    title="Card Title" titleStyle={{color:"#fff"}}
    subtitle="Card Subtitle" subtitleStyle={{color:"#fff"}}
    left={(props) => <Avatar.Icon {...props} icon="folder" />} 
    right={(props) => <IconButton {...props} icon="dots-vertical" onPress={() => {}} />}
  />
    <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
    />
     <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: 'walk',
            label: 'Walking',
          },
          {
            value: 'train',
            label: 'Transit',
          },
          { value: 'drive', label: 'Driving' },
        ]}
      />
    </Container>
  );
}
const Container = styled.View`
  flex: 1;
justify-content:center;
align-items:center;
gap:15px;
`;
const Texto = styled.Text`
   color:#fff;
`