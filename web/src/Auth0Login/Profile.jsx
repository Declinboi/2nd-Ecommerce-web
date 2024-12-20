import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const Profile = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div>
        {user?.picture && <img src={user.picture} alt={user?.name} />}
        <h2>{user?.name}</h2>
        <ul>
          {Object.keys(user).map((Objkey, i) => (
            <li key={i}> {Objkey}: [user(Objkey)] </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default Profile;
