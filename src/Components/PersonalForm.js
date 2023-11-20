import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';
import addIconImage from '../Images/icon-add.png';
const DBPORT = process.env.REACT_APP_DB_PORT;

const PersonalForm = () => {
  //State for journal list
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    console.log(user);
  }, [user]);

  //send data to database
  const writeData = async () => {
    const newGroupAccount = {
      groupName: groupName,
      privateShared: false,
    };

    try {
      const createdGroupData = await axios.post(
        `${DBPORT}/groupaccount`,
        newGroupAccount
      );
      const groupId = createdGroupData.data.groupAccount.id;
      console.log(groupId);
      const newPwBookEntry = {
        userId: user.id,
        userName: username,
        email: email,
        password: password,
        groupAccountId: groupId,
      };
      await axios.post(`${DBPORT}/pwbookentry`, newPwBookEntry);

      setGroupName('');
      setUsername('');
      setEmail('');
      setPassword('');

      document.getElementById('personal-form').close();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        src={addIconImage}
        alt="Add Icon"
        className="w-20 mr-10"
        onClick={() => document.getElementById('personal-form').showModal()}
      />
      <dialog id="personal-form" className="modal">
        <div className="modal-box bg-window text-text">
          <form
            method="dialog"
            className="flex flex-col items-center justify-center p-[20px] text-center"
          >
            <div className="justify-left text-left flex flex-col">
              <label className="text-m font-bold mb-2">Group Name :</label>
              <input
                className="w-60 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] mb-[20px]"
                type="text"
                name="title"
                value={groupName}
                placeholder="Group Name"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <label className="text-m font-bold mb-2">Username :</label>
              <input
                className="w-60 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] mb-[20px]"
                type="text"
                name="title"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label className="text-m font-bold mb-2">Email :</label>
              <input
                className="w-60 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] mb-[20px]"
                type="email"
                name="title"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="text-m font-bold mb-2">Password :</label>
              <input
                className="w-60 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] mb-[20px]"
                type="password"
                name="title"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="py-2 px-4 rounded-md cursor-pointer bg-accent text-background mt-[20px]"
                onClick={() => writeData()}
              >
                Save
              </button>
            </div>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PersonalForm;
