import React, { Component, Fragment } from 'react';
/*8-5 Fragment 추가!
JSX공부할때 모든 컴포넌트는 무언가에 의해 감싸져있어야함
But 감싸주고싶은데 추가적인 DIV 만들고 싶지 않을때 얘를 사용
*/

class PhoneInfo extends Component {

    //8-1. phoneinfo 컴포넌트에 수정모드를 만들어줄것.
    state = {
        editing: false,
    }

    //9-3 새 전번 등록할때마다 콘솔확인하면 전부다 처음부터 찍음
    // 이걸 막기 위해 달라진 부분(추가한 한개의 전화번호목록)만 업데이트 => should component update를 사용
    //단축키 => scu
    shouldComponentUpdate(nextProps, nextState) {
        //얘가 따로 작성되지 않았다면 이 함수는 항상 return true;를 한다

        //state가 달라졌을때만 전체를 다시 렌더
        if(this.state !== nextState){
            return true;
        }
        //info값이 다를때만 update!
        return this.props.info !== nextProps.info; 
    }//모두 다 똑같을시에는 업데이트를 하지않음으로써 render함수 호출x
    


    handleRemove = () => {
        const { info, onRemove } = this.props;
        onRemove(info.id);
    }

    // 8-3. 함수실행시마다 반전
    handleToggleEdit = () => {
        //true -> false :: onUpdate
        //false -> true :: state에 info 값들을 넣어주기 
        const { info, onUpdate } = this.props;
        if(this.state.editing){
            onUpdate(info.id, {
                name: this.state.name,
                phone:  this.state.phone
            });
        } else {
            this.setState({
                name: info.name,
                phone: info.phone,
            });
        }
        this.setState({
            editing: !this.state.editing,
        });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    }

    render() {
        // 7. onClick 부분에 바로 handleRemove를 선언한다면 
        // const { name, phone } = this.props.info;
        const { name, phone, id } = this.props.info;
        const { onRemove } = this.props;
        const { editing } = this.state; //8-4. state에서 가져와서 레퍼런스를 만들어줌
        const style = {
            border: '1px solid black',
            padding: '8px',
            margin: '8px',

        };
        //9. 확인
        console.log(name); 

        return (
            <div style ={style}>
                {
                    editing ? (
                        <Fragment>
                            <div>
                                <input
                                    name="name"
                                    onChange={this.handleChange}
                                    value={this.state.name}
                                />
                            </div>
                            <div>
                                <input
                                    name="phone"
                                    onChange={this.handleChange}
                                    value={this.state.phone}
                                />
                            </div>
                        </Fragment>
                    ) : (
                        // div 대신 Fragment로 감싸줌
                        <Fragment>
                            <div><b>{name}</b></div>
                            <div>{phone}</div>
                        </Fragment>
                    )
                }
                {/* 6.전달받은 props를 연동 */}
                {/* <button onClick={this.handleRemove}>삭제</button> */}
                {/* 7. onClick부분에 바로 handleRemove를 선언하는 방법도 있다*/}
                <button onClick={
                    () => {onRemove(id)} 
                }>삭제</button>
                {/* 8-2 */}
                <button onClick={this.handleToggleEdit}>
                    { editing ? '적용' : '수정' }
                </button> 
            </div>
        );
    }
}

export default PhoneInfo;