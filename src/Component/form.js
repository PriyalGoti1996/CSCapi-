import { useEffect, useRef, useState } from 'react';
import './form.css'
import View from './View';
import axios from "axios";


//getting the valuue from local storage
const getDatafromLS = () => {
    const data = localStorage.getItem("data");
    if (data) {
        return JSON.parse(data)
    }
    else {
        return []
    }
}

function Form() {
    //main array of object//

    const [FormData, setFormData] = useState(getDatafromLS())

    //input Field
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phon, setPhone] = useState('');
    const [gender, setgender] = useState('');
    const [radioCheck, setRadiocheck] = useState({ male: false, female: false, other: false, })
    const [data, setadata] = useState([])
    const [getstate, setstae] = useState([])
    const [getcity, setcity] = useState([])
    const [dcountry, setdcountry] = useState("")
    const [dstate, setdstate] = useState("")
    const ref = useRef()
    //select //
    useEffect(() => {
        axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json")
            .then((res) => setadata(res.data)
            ).catch((e) => console.log(e))
    }, [])
    // return country without
    const country = [...new Set(data?.map((item) => item.country))]
    country.sort()
     // return state without repeat
     const countryhandler = (e) => {
        setdcountry(e.target.value)
        let state = data.filter((state) => state.country === e.target.value)
        let singlestate = [...new Set(state.map((item) => item.subcountry))]
        singlestate.sort()
        setstae(singlestate)
    }
     // return city
     const cityhandler = (e) => {
        setdstate(e.target.value)
        let city = data.filter((city) => city.subcountry === e.target.value)
        let singlecity = [...new Set(city.map((item) => item.name))]
        singlecity.sort()
        setcity(singlecity)
        getcity.map((val) => console.log(val))
     }
    //radio
    const changeRadio = (e) => {
        setRadiocheck(() => {
            return {
                male: false,
                female: false,
                other: false,
                [e.target.value]: true

            }
        })
        setgender(...gender, [e.target.value])
    }
    //saving data in localstorage
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(FormData))
    }, [FormData])

    //Deleting data in table//
    const DelectSubmit = (id) => {
        const DeletDatainTB = FormData.filter((element, index) => {
            return element.id !== id
        })
        setFormData(DeletDatainTB)
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        let newref = ref.current.value;
        const selectdata = { dcountry, dstate, newref }
        console.log(selectdata);
        //creat object
        let SubMitaData = {
            id,
            name,
            email,
            phon,
            gender,
            dcountry,
            dstate,
            newref
        
        }
        setFormData([...FormData, SubMitaData,selectdata])
        setId('');
        setName('');
        setEmail('');
        setPhone('');
        setgender('')
        setRadiocheck({
            male: false,
            female: false,
            other: false,
        })
        setadata([""])
        
        

    }
    return (
        <>
            <div>
                <form className="main-form" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col">
                            <input type="text" id="form-id" name='id' placeholder="id"
                                onChange={(e) => setId(e.target.value)} value={id} />
                        </div>
                        <div className="col">
                            <input type="text" id="form-id" name='name' placeholder="Last name"
                                onChange={(e) => setName(e.target.value)} value={name} />

                        </div>

                    </div>
                    <br />
                    <div className="row">
                        <div className="col">
                            <input type="email" id="form-id" name='email' placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)} value={email}
                            />
                        </div>
                        <div className="col">
                            <input type="phoneno" id="form-id" name='phon' placeholder="PhoneNo"
                                onChange={(e) => setPhone(e.target.value)} value={phon} />
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-ml">
                            Gender:
                            <input type={"radio"} name={"gender"} value={"male"} onChange={changeRadio} checked={radioCheck.male} />Male
                            <input type={"radio"} name={"gender"} value={"female"} onChange={changeRadio} checked={radioCheck.female} />Female
                            <input type={"radio"} name={"gender"} value={"other"} onChange={changeRadio} checked={radioCheck.other} />Other
                        </div>
                    </div>
                    <br />
                    <div className="row">
                        <div className="col-ml">
                            <select onChange={countryhandler} >
                                <option>select country</option>
                                {country?.map((val, i) => <option key={i} name="country" value={val}>{val}</option>)}
                            </select>
                            <select onChange={cityhandler}>
                                <option>select State</option>
                                {getstate?.map((val, i) => <option key={i} name="state" value={val}>{val}</option>)}
                            </select>
                            <select ref={ref}>
                                <option >select City</option>
                                {getcity?.map((val, i) => <option key={i} name="city"  value={val}>{val}</option>)}
                            </select>
                        </div>
                    </div>


                    <div className="form-group row" id="btn-sub">
                        <div className="col-sm-10">
                            <button type="submit" className="btn btn-primary" id="btn">Sign in</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className='view-container'>
                {FormData.length < 1 ? <div>No Data are added yet</div> : <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">PhoneNo</th>
                                <th scope="col">gender</th>
                                <th scope="col">Country</th>
                                <th scope="col">State</th>
                                <th scope="col">City</th>
                                <th scope="col">Delete</th>
                                </tr>
                        </thead>
                        <tbody>
                            <View FormData={FormData} DelectSubmit={DelectSubmit}></View>
                        </tbody>
                    </table>

                </div>}
              
                <button type="button" className="btn btn-lg btn-primary" id="btn" onClick={() => setFormData([])}>Delete All Data</button>
            </div>
        </>
    );
}

export default Form;