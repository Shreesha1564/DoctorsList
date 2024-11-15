import { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorTable = () => {
    const [doctors, setDoctors] = useState([]);
    const [editRecord, setEditRecord] = useState(null);
    const [form, setForm] = useState({ id: 0, name: '', specialization: '', phone_number: '', location: '' });

    // Fetch the data from API.
    useEffect(() => {
        fetchDoctors();
    }, []);

    // Gets the list of doctors from the backend (Express --> Mongoose --> MongoDB)
    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:8003/getAllDoctors");
            console.log(response.data);
            setDoctors(response.data);
        } catch (error) {
            console.error("Error fetching doctors .. ", error);
        }
    }

    // To handle delete operation.


    // const handleDelete = async (id) => {
    //     await axios.delete("http://localhost:8003/deleteRecord/" + id);
    //     fetchDoctors();
    // }

    // const handleChange = (e) => {
    //     setForm({ ...form, [e.target.name]: e.target.value });
    // }

    // // Setting the Edit record field..
    // const handleEdit = (doctor) => {
    //     setForm(doctor);
    //     setEditRecord(true);
    // }

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     if (editRecord) {
    //         await axios.put("http://localhost:8003/updateData", form);
    //     } else {
    //         await axios.post("http://localhost:8003/insertDoctor", form);
    //     }
    //     setForm({ id: 0, name: '', specialization: '', phone_number: '', location: '' });
    //     setEditRecord(false);
    //     fetchDoctors();
    // }

    return (
        <div>
            <h2> Doctors List ...</h2>
            <table border={1} cellPadding={10}>
                <thead>
                    <tr>
                        <th> ID </th>
                        <th> Name </th>
                        <th> Specialization </th>
                        <th> Phone Number </th>
                        <th> Location </th>
                        <th> Action </th>
                    </tr>
                </thead>

                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor.id}>
                            <td>{doctor.id}</td>
                            <td>{doctor.name}</td>
                            <td>{doctor.specialization}</td>
                            <td>{doctor.phone_number}</td>
                            <td>{doctor.location}</td>
                            <td>
                                <button onClick={() => handleEdit(doctor)}>Edit</button> &nbsp;
                                <button onClick={() => handleDelete(doctor.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* {<br /><br />
            <h2>Form to Update or Add Record...</h2>
            <form onSubmit={handleSubmit}>
                Id: <input name='id' value={form.id} onChange={handleChange} />
                <br /><br />
                Name: <input name='name' value={form.name} onChange={handleChange} />
                <br /><br />
                Specialization: <input name='specialization' value={form.specialization} onChange={handleChange} />
                <br /><br />
                Phone Number: <input name='phone_number' value={form.phone_number} onChange={handleChange} />
                <br /><br />
                Location: <input name='location' value={form.location} onChange={handleChange} />
                <br /><br />
                <button type='submit'>{editRecord ? 'Update' : 'Add'} Record</button>
            </form> 
            } */}
        </div>
    );
}

export default DoctorTable;
