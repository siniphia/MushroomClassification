import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo'

class PhoneInfoList extends Component {

    // 2. 또는 이렇게 할 수 있음
    static defaultProps = {
        data: []
    }

    render() {
        
        //onRemove와 onUpdate등 App.js에서 PhoneInfoList에도 전달.
        const {data, onRemove, onUpdate} = this.props;


        //9. 확인2 - 콘솔에 디폴트값들이 나타남
        console.log('rendering list ');


        //1.cannot read of property map of undefined >> if (!data) return null; 을 해준다.

        const list = data.map(
            //6. props로 받아온 onRemove를 그대로 PhoneInfo에 전달
            info => (
                <PhoneInfo
                onRemove={onRemove}
                onUpdate={onUpdate}
                info = {info}
                key = {info.id}
                />
            ) 
        );

        return (
            <div>
               {list} 
            </div>
        );
    }
}

export default PhoneInfoList;