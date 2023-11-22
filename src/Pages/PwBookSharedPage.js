// PwBookSharedPage.js
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { Navbar } from '../Components/NavBar';
import Header from '../Components/Header';
import Eyes from '../Components/Eyes';
import SharedDeletePwBookEntry from '../Components/SharedDeletePwBookEntry';

export function PwBookSharedPage() {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  //state for header
  const personalShared = true;
  const [pwBooks, setPwBooks] = useState('');
  const [groups, setGroups] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //get groupIds with userId from sharedAccount
        const sharedAccounts = await axios.get(
          `${DBPORT}/user/shared/${user.id}`
        );
        console.log(sharedAccounts);
        //get all groups with groupId
        const groupAccounts = sharedAccounts.data[0].groupAccounts;
        console.log(groupAccounts);
        //store all group content into groups state
        setGroups(groupAccounts);
        //get all pwbooksEntries with groupId
        const groupIds = groupAccounts.map((group) => group.id);
        console.log(groupIds);
        //store all pwbooksEntries into pwBooks state}
        console.log(user.id);
        const pwBooksData = await axios.post(
          `${DBPORT}/pwbookentry/allpwbgidSA/${groupIds}`,
          { userId: user.id }
        );
        setPwBooks(pwBooksData.data);
      } catch (error) {
        console.error('TotalFail:', error);
      }
    };
    fetchData();
  }, [user.id]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background pb-[170px]">
      <Header toggle={personalShared} />
      <div className="max-w-screen m-4 grid justify-center gap-4 p-3 md:grid-cols-1 lg:grid-cols-3">
        {Array.isArray(groups) &&
          Array.isArray(pwBooks) &&
          groups.map((groupItem) => (
            <div
              key={groupItem.id}
              className="m-[30px] flex w-80 flex-col bg-window p-[20px] shadow-lg shadow-text hover:translate-y-[-2px]"
            >
              <h1 className="text-text rounded-md pl-[5px] text-[22px] font-bold">
                {groupItem.groupName}
              </h1>
              {pwBooks.map((pwBooksItem) => (
                <div>
                  {pwBooksItem.groupAccountId === groupItem.id ? (
                    <div
                      key={pwBooksItem.id}
                      className="text-text rounded-md pl-[5px] text-[18px] font-semibold"
                    >
                      <hr className="my-[10px] border-[1.3px] border-accent" />
                      {!pwBooksItem.userName ? null : (
                        <h1>UserName: {pwBooksItem.userName}</h1>
                      )}
                      {!pwBooksItem.email ? null : (
                        <h1>Email: {pwBooksItem.email}</h1>
                      )}
                      <div className="flex flex-row items-center">
                        <h1>Password: </h1>
                        <Eyes password={pwBooksItem.password} />
                        <div className="ml-auto">
                          <SharedDeletePwBookEntry
                            pwbookId={pwBooksItem.id}
                            groupAccountId={groupItem.id}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          ))}
      </div>
      <Navbar />
    </div>
  );
}
