import React from "react";
import "../../styles/delete-account/delete-account.scss";
import VisibilityOffTwoToneIcon from "@mui/icons-material/VisibilityOffTwoTone";

const DeleteAccount = () => {

  return (
    <div className="delete-account">
      <form className="account-form">
        <p>Please read carefully: Action may be required to account deletion</p>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text">My Buckle Beeats will no longer work anf cannot be reactivated.

            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text">Deleting my BuckleBeats account is permanent, <span className="text-box">and cannot be undone.</span>

            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <div className="form-group-login checkbox-group">
          <label className="checkbox-text text-box">Account deletion will remove my account details and personal information. Tile may need to retain certain data, see Tile's privacy Policy for more information.

            <input type="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
        <h5>Password</h5>
        <div className={`input-field password-field `}>
          <input
            type="password"
          />
          <div className="eye-icon" >
            <VisibilityOffTwoToneIcon /> 
          </div>
         
        </div>
        <button type="submit">I Agree.Delete.</button>
      </form>
    </div>
  );
};

export default DeleteAccount;
