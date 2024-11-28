import { useEffect, useState } from "react";
import styled from "styled-components/native";
import axios from "axios";
import { ActivityIndicator, FlatList } from "react-native";
import { useQuery } from "@tanstack/react-query";
export function Fetch() {
  const { data, isLoading, error,isError } = useQuery({
    queryKey: ["mostrar emojis"],
    queryFn: () =>
      axios.get("https://emojihub.yurace.pro/api/all").then(response =>response.data),
  });

  // useEffect(() => {
  //   // fetch("https://emojihub.yurace.pro/api/all")
  //   //   .then((response) => {
  //   //     if (!response.ok) {
  //   //       throw new Error("El servidor no response");
  //   //     }
  //   //     return response.json();

  //   //   })
  //   //   .then((data) => {
  //   //     setData(data);
  //   //   });
  //   axios.get("https://emojihub.yurace.pro/api/all").then((response)=>{
  //     setData(response.data)
  //     setLoading(false)
  //   })
  // }, []);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  if (isError) {
    return <Texto>error {error.message}</Texto>;
  }
  return (
    <Container>
      <Texto>Fetch</Texto>

      <FlatList
        data={data}
        renderItem={({ item }) => <Texto>{item.name}</Texto>}
      />
      {/* {data.map((item) => {
        return <Texto>{item.name}</Texto>;
      })} */}
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Texto = styled.Text`
  color: #fff;
`;
