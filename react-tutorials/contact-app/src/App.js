import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {

  //4.전화번호부에 유니크키를 만들어보자!
  //id값은 state에 따로 넣지 않은 이유: 따로 렌더링되는 값이 아니기 때문에
  //id = 0;

  //9. 디폴트값의 id가 2에서 끝났으니 3을 넣어줌
  id =3;

  state = {
    //전화번호부 구조로 만들어보자!
    //information : [],

    /* 9.state값 불변성유지, 컴포넌트 업데이트시 성능최적화 하기 */
    //information : 디폴트값 넣기

    information : [
      {
        id: 0,
        name: '홍길동',
        phone: '010-0000-0001',
      },
      {
        id: 1,
        name: '심지선',
        phone: '010-0000-0002',
      },
      {
        id: 2,
        name: '지소닉',
        phone: '010-0000-0003',
      },
    ],

    /*10. 이름으로 전화번호 찾기*/
    //키워드를 사용해서 찾는당.
    keyword : '', 


  }

  //10-1. 키워드 문자열을 바꿔줄 handleChange 작성
  handleChange = (e) => {
    this.setState({
      keyword: e.target.value,
    })
  }

  handleCreate = (data) => {
    //1.console.log(data);
    //2.전화번호부 구조로 만들기
    //3.비구조할당문법을 사용해보자! this.state를 const로 만들어 버리면 information 업데이트 칠때 쉽게 할 수 있음
    const { information } = this.state;
    this.setState({
      //2.information: information.concat(data) //3.this.state.information 일일이 안쳐도 됨 (비구조할당)
      //4. 전화번호부에 유니크키 자동증가 하게끔 구현
      information: information.concat({
        /* Spread 문법 */
        ...data,
        id: this.id++
        /* 위 코드 대신 사용가능한것.
        name: data.name,
        phone: data.phone,
        id: this.id++
        */
      })
      /* Object의 비어있는 객체 {}에 data를 집어넣고, 뒤에 id 값 {id: this.id++} 또한 집어넣는다는 뜻.
      information: information.concat(Object.assign({}, data, {
        id: this.id++
      }))*/
  })
  }

  handleRemove = (id) => {
    const {information} = this.state;
    this.setState({
      information : information.filter(info => info.id !== id) // 6.parameter로 받은 id가 아닌것들만 필터링해달라
    });
  }

  /* 8 업데이트.. */
  handleUpdate = (id,data) => {
    const {information} = this.state;
    this.setState({
      information : information.map(
        info => {
          //8. info로 가지고 온 id의 값이 파라미터로 가지고온 id 값과 일치한다면
          if(info.id === id) {
            return{
              id,
              ...data, // 여기에 name과 phone값이 들어가지게 한다.
            };
          }
          // 불일치시,
          return info;
        }
      )
    });
  }

  render() {
    return (
      <div>
        <PhoneForm onCreate={this.handleCreate}/>
        {/* 10-2 키워드를 검색할 인풋 생성 */}
        <input
          value={this.state.keyword}
          onChange={this.handleChange}
          placeholder="검색.... "
        />

        {/* {JSON.stringify(this.state.information)} 5. 주석처리: 새로운 렌더링 기법 도입 (아래)*/}
        <PhoneInfoList 
          //data={this.state.information}
          // 10-3 데이터를 필터링 해줄것임.
          data={this.state.information.filter(
            
            info => info.name.indexOf(this.state.keyword) > -1
          )}
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
