import React,{useState, useEffect} from 'react';
import './App.css';

const App = () => {
   const [response, setResponse] = useState([])

    const callApi = () => {
        fetch('http://localhost:9000/testAPI')
            .then(res => res.json())
            .then(apiResponse => {console.log(apiResponse); setResponse(apiResponse)})
            .catch(err => err)
    };

    const callApiUser = (id) => {
        fetch(`http://localhost:9000/testAPI/${id}`)
            .then(res => res.json())
            .then(apiResponse => {console.log(apiResponse); setResponse(apiResponse)})
            .catch(err => err)
    };

    const postApi = () => {
        console.log('test api')
        fetch('http://localhost:9000/testAPI', {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({user_id: 3, name: 'Marry'})
        })
            .then(res => res.json())
            .then(res => setResponse(res))
    };

    const deleteApi = (id) => {
        fetch(`http://localhost:9000/testAPI/${id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setResponse(res)
            })
    };

    useEffect(() => {
        // callApi();
        callApiUser(1)
        // postApi();
        // deleteApi(1)
    },[]);

    console.log(response);

        return (
            <div >
                {response.map(user => (
                    <div key={user.user_id}>
                    <div>{user.name}</div>
                    <div>{user.surname}</div>
                    </div>
                ))}

                <button onClick={() => deleteApi(1)}>Delete</button>
            </div>
        );
};

export default App;
