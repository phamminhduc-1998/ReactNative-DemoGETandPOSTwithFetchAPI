import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, Alert, FlatList } from 'react-native';
import { useEffect, useState } from 'react';

export default function App() {

  const GETAPI = 'https://jsonplaceholder.typicode.com/users';
  const POSTAPI = 'https://gorest.co.in/public-api/users';
  const [text, setText] = useState('Hello');
  const [obj, setObj] = useState();
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 30 }}>
        <Button color="#841584" title='HTTP GET' onPress={() => {
          fetch(GETAPI)
            // chuyen du lieu ve dang json
            .then((response) => response.json())
            // duoc goi khi ket thuc request du lieu
            .then((responseJson) => {
              setText(responseJson);
            })
            // .then(data => setText('User ID : ' + data.userId + '\n' + 'ID : ' + data.id + '\n' + 'TITLE : ' + data.title + '\n' + 'COMPLETED : ' + data.completed))
            // goi khi xay ra loi request
            .catch((error) => {
              console.error(error);
            });
        }}
        />

        <Button
          title='HTTP POST'
          onPress={
            () => {
              const obj = {
                id: 1998,
                name: "PHAMMINHDUC",
                email: "Minhduc1998111@gmail.com",
                gender: "Female",
                status: "Inactive"
              }
              fetch(POSTAPI, {
                method: 'POST', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer 335e2520b2eb3088f08dd60577e4286ede55a21e2cfd5d64d66fe10fbd4ab778'
                },
                body: JSON.stringify(obj),
              })
                .then(response => response.json())
                .then(data => {
                  if (data.code == '422') {
                    Alert.alert(`Đăng ký thất bại`, ` Email đã tồn tại hoặc nhập sai định dạng email`)
                  }
                  else if (data.code == '201') {
                    Alert.alert("Thêm dữ liệu thành công")
                  }
                  else {
                    Alert.alert("Lỗi không xác định: " + data.code)
                  }
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            }}
        ></Button>
      </View>
      <FlatList style={{ flex: 1 }}
        data={text}
        renderItem={({ item }) => (
          <View style={{ borderWidth: 1, margin: 8 }}>
            <Text>{item.id}</Text>
            <Text>{item.name}</Text>
            <Text>{item.email}</Text>

          </View>
        )}
      />
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
