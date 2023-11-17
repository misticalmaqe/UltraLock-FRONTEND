import { useState } from 'react';
import axios from 'axios';
import addIconImage from '../Images/icon-add.png';
const DBPORT = process.env.REACT_APP_DB_PORT;

const PersonalForm = () => {
  //State for journal list
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //send data to database
  const writeData = async () => {
    const newPwBookEntry = {
      userId: 2,
      userName: username,
      email: email,
      password: password,
    };

    const newGroupAccount = {
      groupName: groupName,
      privateShared: false,
    };

    try {
      await axios.post(`${DBPORT}/groupaccount`, newGroupAccount);
      // await axios.get(`${DBPORT}/groupaccount/${groupId}`);
      await axios.post(`${DBPORT}/pwbookentry`, newPwBookEntry);

      setGroupName('');
      setUsername('');
      setEmail('');
      setPassword('');

      document.getElementById('sighting-form').close();
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
              <label className="mb-[5px]">Group Name :</label>
              <input
                className="input mb-[15px] w-[15em] justify-center rounded-md  bg-background px-2"
                type="text"
                name="title"
                value={groupName}
                placeholder="Group Name"
                onChange={(e) => {
                  setGroupName(e.target.value);
                }}
              />
              <label className="mb-[5px]">Username :</label>
              <input
                className="input mb-[15px] w-[15em] justify-center rounded-md  bg-background px-2"
                type="text"
                name="title"
                value={username}
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <label className="mb-[5px]">Email :</label>
              <input
                className="input mb-[15px] w-[15em] justify-center rounded-md  bg-background px-2"
                type="email"
                name="title"
                value={email}
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label className="mb-[5px]">Password :</label>
              <input
                className="input mb-[15px] w-[15em] justify-center rounded-md  bg-background text-text px-2"
                type="password"
                name="title"
                value={password}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="bg-accent text-background rounded-full mt-[15px] p-[3px]"
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
