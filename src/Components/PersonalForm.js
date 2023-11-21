import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';
import addIconImage from '../Images/icon-add.png';
import pasteImage from '../Images/icon-paste.png';
const DBPORT = process.env.REACT_APP_DB_PORT;

const PersonalForm = () => {
  //State for journal list
  const [pwBooks, setPwBooks] = useState('');
  const [groups, setGroups] = useState('');
  const [groupName, setGroupName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const getGroupIds = async () => {
      try {
        const pwBooksResponse = await axios.get(
          `${DBPORT}/pwbookentry/allpw/${user.id}`
        );
        const pwBooksData = pwBooksResponse.data;
        setPwBooks(pwBooksData); // Corrected from setPwBooks(pwBooks)

        // Extract groupAccountIds from pwBooksData
        const groupAccountIds = pwBooksData.map((book) => book.groupAccountId);

        // Make another API call for each groupAccountId
        const groupPromises = groupAccountIds.map(async (groupId) => {
          try {
            const groupResponse = await axios.get(
              `${DBPORT}/groupaccount/personal/${groupId}`
            );
            return groupResponse.data;
          } catch (error) {
            console.error('Error fetching group data:', error);
            return null;
          }
        });

        // Resolve all promises
        const groupsData = await Promise.all(groupPromises);
        const modifiedGroupsData = groupsData.flatMap(
          ({ groupAccounts }) => groupAccounts
        );
        setGroups(modifiedGroupsData);
      } catch (error) {
        console.error('Error fetching group data:', error);
        return null;
      }
    };
    getGroupIds();
  }, [user]);

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

  const writeData = async () => {
    const existingGroup = groups.find(
      (group) => group.groupName === groupName && group.privateShared === false // Assuming privateShared is a boolean
    );

    if (existingGroup) {
      const groupId = existingGroup.id;

      const newPwBookEntry = {
        userId: user.id,
        userName: username,
        email: email,
        password: password,
        groupAccountId: groupId,
      };

      try {
        await axios.post(`${DBPORT}/pwbookentry`, newPwBookEntry);

        setGroupName('');
        setUsername('');
        setEmail('');
        setPassword('');

        // Assuming you have a modal or form with an ID 'personal-form'
        document.getElementById('personal-form').close();
      } catch (err) {
        console.error(err);
      }
    } else {
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

        // Assuming you have a modal or form with an ID 'personal-form'
        document.getElementById('personal-form').close();
      } catch (err) {
        console.error(err);
      }
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
