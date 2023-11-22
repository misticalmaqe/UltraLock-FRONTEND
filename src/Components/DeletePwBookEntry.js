//-----------React-----------//
import { useState } from 'react';
import axios from 'axios';

//-----------Components-----------//
import deleteImage from '../Images/icon-delete.png';

export default function DeletePwBookEntry({ pwbookId, groupAccountId }) {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  const [id, setId] = useState(pwbookId);
  const [groupAccountsId, setGroupAccountsId] = useState(groupAccountId);

  const deleteData = async () => {
    //deletes pwbookentry by user id
    try {
      await axios.delete(`${DBPORT}/pwbookentry/${id}`);
    } catch (err) {
      console.error(err);
    }
    try {
      // Get data using axios.get
      const response = await axios.get(
        `${DBPORT}/pwbookentry/allpwbgid/${groupAccountsId}`
      );

      // Check if there's a groupAccount with no pwbookentries
      if (Array.isArray(response.data) && response.data.length === 0) {
        // If it's an empty array, delete the groupAccountId
        try {
          await axios.delete(`${DBPORT}/groupaccount/${groupAccountsId}`);
          console.log(`Deleted groupAccountId: ${groupAccountsId}`);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log('Array is not empty, not performing any action.');
      }
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
