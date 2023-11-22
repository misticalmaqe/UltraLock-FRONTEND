//-----------React-----------//
import { useContext, useState } from 'react';
import axios from 'axios';

//-----------Components-----------//
import deleteImage from '../Images/icon-delete.png';
import { UserContext } from '../provider/UserProvider';

export default function PersonalDeletePwBookEntry({
  pwbookId,
  groupAccountId,
}) {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  const [id, setId] = useState(pwbookId);
  const [groupAccountsId, setGroupAccountsId] = useState(groupAccountId);
  const { personalFetchData } = useContext(UserContext);

  const deleteData = async () => {
    try {
      // Delete data from the database
      await axios.delete(`${DBPORT}/pwbookentry/${id}`);

      // Get data using axios.get to check the status after deletion
      const response = await axios.get(
        `${DBPORT}/pwbookentry/allpwbgid/${groupAccountsId}`
      );

      // Check if there are no more pwbookentries associated with this groupAccountId
      if (Array.isArray(response.data) && response.data.length === 0) {
        // Delete the groupAccountId if there are no more associated entries
        await axios.delete(`${DBPORT}/groupaccount/${groupAccountsId}`);
      }

      //Fetch personal Data
      personalFetchData();
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
