import './App.css';
import { useState } from 'react';
import DoctorTable1 from './DoctorTable1'

function App(){
const [userName, setUserName] = useState();

//Provide the background image details ..
const myStyle={
backgroundImage: 'url(D2.jpg)',
backgroundSize : 'cover',
height : '150vh'
}
return(
<div style={myStyle}>
<DoctorTable1 />
</div>
);
}
export default App;