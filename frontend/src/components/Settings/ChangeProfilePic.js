import React from "react";
import { ProfileImageChange } from "../form/Settings";
import ProfilePicComp from "./Components/ProfilePic";

const ChangeProfilePic = ({setFileState, handleSubmit, changeStatus, setChangeStatus}) => {
    return (
        <>
            { changeStatus
            ?   <ProfileImageChange setFileState={setFileState} handleSubmit={handleSubmit} />
            :   <ProfilePicComp setChangeStatus={setChangeStatus} />
            }
        </>
    )
}

export default ChangeProfilePic;