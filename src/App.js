import React from 'react';
import './App.css';
import Axios from 'axios';
import { Component } from 'react';



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      userId : 0,
      data:[],
      loading:false
    }
    this.getData = this.getData.bind(this)
    this.btnClick = this.btnClick.bind(this)
  }

  getData (){
    
    const{userId} = this.state
    this.setState({
      data:[],
      loading:true,
      userId:userId+1
    })
    Axios.get(`https://reqres.in/api/users?page=${userId}`)
    .then(json =>{
      console.log(json.data.data)
      this.setState({
        data:json.data.data,
        loading:false
      })
    })
    .catch(e =>{
      console.error(e)
      this.setState({
        data:[],
        loading:false
      })
    })
    }

    


    btnClick(e){
    
      const userId = e.target.value
       
      console.log(userId)

      this.setState({
        userId
      })
      this.getData()
    }
  

 componentDidMount() {
  this.getData() 

 }

 render(){
   const theData = this.state.data.map((d) =>{
     return(
      <table id="customers">
 <tr>
    <th>Id</th>
    <th>Name</th>
    <th>Email</th>
    <th>Avatar</th>
  </tr>
  <tr>
    <td>{d.id}</td>
    <td>{d.first_name} {d.last_name}</td>
    <td>{d.email}</td>
    <td> <img src={d.avatar} alt="avatar"/></td>
  </tr>

        </table>
    
     )
   })
   if(this.state.loading){
     return(
       <p>Loading..</p>
     )
   }
   return(
     <div className="App">
       <ul>
       {theData}
       </ul>
       
<UserIdComponent name="1" onClick={this.btnClick} />
<UserIdComponent name="2" onClick={this.btnClick} />
<UserIdComponent name="3" onClick={this.btnClick} />
<UserIdComponent name="4" onClick={this.btnClick} />

     </div>
   )
 }
}

const UserIdComponent = (props) =>{
  return(
    <button
onClick={props.onClick}
value={props.name}
>{props.name}
    </button>
  )
}

export default App;
