import React, { Component } from 'react';
import './App.css';
import Customer from './components/Customer'

const customers = [
  {
  'id':1,
  'image':'https://placeimg.com/64/64/1',
  'name':'신애정',
  'birthday':'940605',
  'gender':'여자',
  'job':'무직'
},
{
  'id':2,
  'image':'https://placeimg.com/64/64/2',
  'name':'양지수',
  'birthday':'960910',
  'gender':'남자',
  'job':'무직'
}

]

class App extends Component {
  render() {
    return(
      <div>
   {
     //App 반복문
     //map을 이용해 반복문을 사용하여 다수의 정보를 출력할때는 key라는 props를 사용해줘야 한다.
     customers.map(c=>{
       return (
       <Customer

       key={c.id}
       id={c.id}
       image={c.image}
       name={c.name}
       birthday={c.birthday}
       gender={c.gender}
       job={c.job}
       />
       );
     })
    }
   }
    </div>
    );
  }
}

export default App;
