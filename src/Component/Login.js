import { useState } from "react";

function Login() {
    const [emaillog, setEmaillog] = useState('');
    const [phonlog, setPhonelog] = useState('');
    const [flag, setFlag] = useState(false);
    const [login, setLogin] = useState(true);
    const [home, sethome] = useState(true);
    

    const handleSubmit = (e) => {
        e.preventDefault();
        let mail=localStorage.getItem("emil").replace(/"/g,"")
        let pho=localStorage.getItem("phon").replace(/"/g,"")
        console.log(mail);
        console.log(pho);
     
        if(!emaillog || !phonlog )
        {
            setFlag(true)
            console.log("empty");
        }
        else if(emaillog !== mail || phonlog !== pho )
        {
            setFlag(true)
        }
        else
        {
            sethome(!home)
            setFlag(true)
        }
    }
    return (
        
        <div>Login
        {home ?
            <form className="main-form" onSubmit={handleSubmit}>

                <div className="row">
                    <div className="col">
                        <input type="email" id="form-id" name='email' placeholder="Email"
                            onChange={(e) => setEmaillog(e.target.value)} value={emaillog}
                        />
                    </div>
                    <div className="col">
                        <input type="phoneno" id="form-id" name='phon' placeholder="PhoneNo"
                            onChange={(e) => setPhonelog(e.target.value)} value={phonlog} />
                    </div>
                </div>
                <div className="form-group row" id="btn-sub">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary" id="btn">Login</button>
                    </div>
                </div>
                {
                    flag && <h1>pleacse correct Info</h1>
                }
            </form>
            :<h1>you are successfully login</h1>}
        </div>
    );
}

export default Login;