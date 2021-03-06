import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import { User } from "../../Dummydata";
import Online from "../online/Online";
import axios from "../../axios";
import { Link } from "react-router-dom";
import { Authcontext } from "../../context/Authcontext";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

function Rightbar({ user }) {
  
  const [friends, setFriends] = useState([]);
  const { user: currentuser, dispatch } = useContext(Authcontext);
  const [followed, setFollowed] = useState(
    currentuser.followings.includes(user?.id)
  );

  useEffect(() => {
    let unmount = false;
    const getfriendlist = async () => {
      try {
        if (user) {
          const friendlist = await axios.get(
            `/users/friends/${user._id && user._id}`
          );
          if (!unmount) {
            setFriends(friendlist.data);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getfriendlist();
    return () => {
      unmount = true;
    };
  }, [user]);

  const handleclick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user?._id + "/unfollow", {
          userId: currentuser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user?._id });
      } else {
        await axios.put("/users/" + user?._id + "/follow", {
          userId: currentuser._id,
        });
        dispatch({ type: "FOLLOW", payload: user?._id });
      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthday">
          <img src="/assets/gift.png"alt="" className="birthday_img" />
          <span className="birthday_text">
            <b>hari prasad</b> and <b>3 other friends</b> have birthday today
          </span>
        </div>
        <img src="/assets/ad.png" alt="" className="rightbar_ad" />
        <h4 className="rightbar_title">Online Friends</h4>
        <ul className="rightbar_friendlists">
          {User.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentuser.username && (
          <button className="rightbar_topbtn" onClick={handleclick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <RemoveIcon /> : <AddIcon />}
          </button>
        )}
        <h3 className="rightbar_title">User Information</h3>
        <div className="rightbar_info">
          <div className="rightbar_infoitem">
            <span className="rightbar_infokey">City :</span>
            <span className="rightbar_infovalue">{user.city}</span>
          </div>
          <div className="rightbar_infoitem">
            <span className="rightbar_infokey">From :</span>
            <span className="rightbar_infovalue">{user.from}</span>
          </div>
          <div className="rightbar_infoitem">
            <span className="rightbar_infokey">Relationship :</span>
            <span className="rightbar_infovalue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 2
                ? "committed"
                : "married"}
            </span>
          </div>
        </div>
        <h3 className="rightbar_title">User Friends</h3>
        <div className="rightbar_followings">
          {friends.map((friend) => (
            <Link
              key={friend._id}
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none", color: "black" }}
            >
              <div className="rightbar_following">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      : "/assets/person/profile.png"
                  }
                  alt=""
                  className="rightbar_followingsimg"
                />
                <span className="rightbar_followingsname">
                  {friend.username}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbar_wrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}

export default Rightbar;
