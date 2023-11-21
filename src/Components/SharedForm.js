import { useState, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';
import addIconImage from '../Images/icon-add.png';
import pasteImage from '../Images/icon-paste.png';
const DBPORT = process.env.REACT_APP_DB_PORT;

const SharedForm = () => {
  //State for journal list
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otherUser, setOtherUser] = useState('');
  const [otherUsers, setOtherUsers] = useState([]);
  const { user } = useContext(UserContext);

  const handlePasteClick = () => {
    navigator.clipboard
      .readText()
      .then((copiedText) => {
        setPassword(copiedText);
      })
      .catch((err) => {
        console.error('Failed to read clipboard contents: ', err);
      });
  };

  //delete email from list
  const deleteUserFromList = (id) => {
    setOtherUsers((currentUsers) => {
      return currentUsers.filter((items) => items.id !== id);
    });
  };

  //create input to add more items with + button...
  const handleSubmit = (e) => {
    e.preventDefault();

    setOtherUsers((currentUsers) => {
      return [
        ...currentUsers,
        {
          id: new Date().getTime(),
          email: otherUser,
        },
      ];
    });
    setOtherUser('');
  };

  const writeData = async () => {
    try {
      // Make object to send to groupAccount db
      const newGroupAccount = {
        groupName: groupName,
        privateShared: true,
      };

      // Create group account
      const createdGroupData = await axios.post(
        `${DBPORT}/groupaccount`,
        newGroupAccount
      );
      const groupId = createdGroupData.data.groupAccount.id;

      // Make object to send to pwbookEntries db for the primary user
      const newPwBookEntry = {
        userId: user.id,
        userName: username,
        email: email,
        password: password,
        groupAccountId: groupId,
      };

      // Create primary user entry
      await axios.post(`${DBPORT}/pwbookentry`, newPwBookEntry);

      // Create object to stringify emails to send to user db
      const emails = otherUsers.map((user) => user.email);

      // Send GET request to users db to get user IDs based on emails
      const userIdsResponse = await axios.get(
        `${DBPORT}/user/multiple/${emails}`
      );
      //get the userIds as an array from data
      const userIdsArray = userIdsResponse.data.userIds;
      //map to get userIds value
      const userIds = userIdsArray.map((user) => user.id);
      console.log(userIds);
      // Use the obtained user IDs to create pwbookEntries for each user
      await Promise.all(
        userIds.map(async (userId) => {
          const entry = {
            userId: userId,
            userName: username,
            email: email,
            password: password,
            groupAccountId: groupId,
          };

          try {
            await axios.post(`${DBPORT}/pwbookentry`, entry);
            setGroupName('');
            setUsername('');
            setEmail('');
            setPassword('');
            setOtherUser('');
            setOtherUsers([]);
          } catch (error) {
            console.error(
              `Error creating multiple pwbookentry for user ID ${userId}:`,
              error
            );
            throw error;
          }
        })
      );

      // Create shared account for primary user
      const newSharedAccount = {
        userId: user.id,
        groupAccountId: groupId,
      };
      await axios.post(`${DBPORT}/user/shared`, newSharedAccount);

      // Create shared accounts for other users
      await Promise.all(
        userIds.map(async (userId) => {
          const newSharedAccount = {
            userId: userId,
            groupAccountId: groupId,
          };

          try {
            await axios.post(`${DBPORT}/user/shared`, newSharedAccount);
          } catch (error) {
            console.error(
              `Error creating multiple sharedAccount entry for user ID ${userId}:`,
              error
            );
          }
        })
      );
    } catch (err) {
      console.error('failed entirely', err);
    }
  };

  return (
    <div>
      <img
        src={addIconImage}
        alt="Add Icon"
        className="w-20 mr-10 cursor-pointer"
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
              <div className="">
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
                <img
                  src={pasteImage}
                  alt="Paste Icon"
                  className="fixed w-10 ml-3 inline-block cursor-pointer"
                  onClick={handlePasteClick}
                />
              </div>
              {otherUsers.length === 0 ? (
                <label className="text-m font-bold mb-2 text-red-600">
                  *Share with :
                </label>
              ) : (
                <label className="text-m font-bold mb-2">Share with :</label>
              )}
              <div className="input-button">
                <input
                  className="w-60 h-[2rem] lg:h-[2.5rem] rounded-md border-accent bg-white text-txtcolor-secondary shadow-sm ring-1 ring-inset ring-white/10 focus:ring-text pl-[5px] mb-[20px]"
                  type="email"
                  name="newItem"
                  value={otherUser}
                  placeholder="Input users email"
                  onChange={(e) => {
                    setOtherUser(e.target.value);
                  }}
                />
                <button
                  className="ml-4 rounded-full bg-accent p-3 font-black text-background font-bold leading-[12px] shadow-lg hover:translate-y-[-2px] hover:bg-text"
                  onClick={handleSubmit}
                >
                  +
                </button>
              </div>
              <ul>
                {otherUsers.map((userEmail) => {
                  return (
                    <li
                      key={userEmail.id}
                      className="mb-[15px] flex py-[5px] justify-between rounded-md bg-background px-2 text-sm hover:translate-y-[-2px] hover:bg-background"
                    >
                      <label className="mr-[15px] font-semibold">
                        {userEmail.email}
                      </label>
                      <button
                        onClick={() => deleteUserFromList(userEmail.id)}
                        className="text-sm hover:font-semibold"
                      >
                        Delete
                      </button>
                    </li>
                  );
                })}
              </ul>
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

export default SharedForm;
