import { useContext, useState } from 'react';
import axios from 'axios';

//-----------Components-----------//
import deleteImage from '../Images/icon-delete.png';
import { UserContext } from '../provider/UserProvider';

export default function SharedDeletePwBookEntry({ pwbookId, groupAccountId }) {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  const [id, setId] = useState(pwbookId);
  const [groupAccountsId, setGroupAccountsId] = useState(groupAccountId);
  const { sharedFetchData } = useContext(UserContext);

  const deleteData = async () => {
    try {
      await axios.delete(`${DBPORT}/groupaccount/${groupAccountsId}`);
      //Fetch data from db
      sharedFetchData();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <img
        src={deleteImage}
        alt="delete"
        className="w-7 cursor-pointer"
        onClick={() => {
          deleteData();
        }}
      />
    </div>
  );
}
