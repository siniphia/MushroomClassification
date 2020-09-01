import React, { Component } from 'react';

class PhoneForm extends Component {
    //11-1 방법
    //input = null;

    //11-2 방법
    //리액트 버젼16.3에서만 가능
    input = React.createRef();

    state = {
        name: '',
        phone: '',
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //submit할때마다 개발자 도구 console에 해당 값들이 찍힌다.
        this.props.onCreate(this.state);
        this.setState({
            name: '',
            phone: '',
        });
        //this.props.onCreate(this.state); 로 해도 상관 없다.

        //11-1 input DOM에 직접접근하여 focus해줌
        //this.input.focus;

        //11-2방법으로 한다면
        //current를 통해 DOM에 접근한다.
        this.input.current.focus();
        
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {/* 11 새 전화번호부를 등록한 후 focus가 전화번호가 아니라 이름 인풋쪽으로 가게 만들기
                  * ref라는것을 사용 
                  * 1. 함수사용 하기
                  * 2. 
                 */}
               <input name="name"
               placeholder="이름"
               onChange={this.handleChange}
               value={this.state.name}
               // 11-1 함수사용하기 : ref를 파라미터로  받아서 멤버변수로 넣어주는것
               // 맨위의 input = null
               //ref={ref => this.input = ref}

               //11-2
               ref = {this.input}
               />
               <input name="phone" 
               placeholder="전화번호"
               onChange={this.handleChange}
               value={this.state.phone}
               />
               <button type="submit">등록</button>
                <div>
                {this.state.name} {this.state.phone}
                </div> 
            </form>
            
        ); 
    }
}

export default PhoneForm;