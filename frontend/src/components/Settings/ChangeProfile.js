import React from "react";
import { ProfileInput } from "../form/Settings";
import ProfileDetail from "./Components/ProfileDetail";

const ChangeProfileComp = ({value, changeStatus, setChangeStatus, label, type, onChange, handleSubmit}) => {

    return (
        <>
            {
                changeStatus
                ? <ProfileInput label={label} value={value} type={type} onChange={onChange} handleSubmit={handleSubmit} setChangeStatus={setChangeStatus}/>
                : <ProfileDetail label={label} value={value} handleClick={() => setChangeStatus(true)} />
            }
        </>
    )
}

export default ChangeProfileComp;