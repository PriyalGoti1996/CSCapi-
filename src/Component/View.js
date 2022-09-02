import Icon from "react-icons-kit";
import {trash} from "react-icons-kit/feather/trash"

function View({ FormData,DelectSubmit }) {
    return (
        <>
            {
                FormData.map((value,index) => {
                    return (
                        <tr key={index}>
                           <td>{value.id}</td>
                            <td>{value.name}</td>
                            <td>{value.email}</td>
                            <td>{value.phon}</td>
                            <td>{value.gender}</td>
                            <td>{value.dcountry}</td>
                            <td>{value.dstate}</td>
                            <td>{value.newref}</td>
                            <td style={{color:"red"}} onClick={()=>DelectSubmit(value.id)}><Icon icon={trash}/></td>
                        </tr>
                    
                    )
                })
            }
           
        </>
    );
}

export default View;