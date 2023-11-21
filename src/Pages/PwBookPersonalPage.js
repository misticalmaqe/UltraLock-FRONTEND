// PwBookPersonalPage.js
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../provider/UserProvider';
import axios from 'axios';

//--------------COMPONENTS--------------//
import { Navbar } from '../Components/NavBar';
import Header from '../Components/Header';
import Eyes from '../Components/Eyes';
import DeletePwBookEntry from '../Components/DeletePwBookEntry';

export function PwBookPersonalPage() {
  const DBPORT = process.env.REACT_APP_DB_PORT;
  //state for header
  const personalShared = false;
  const [pwBooks, setPwBooks] = useState('');
  const [groups, setGroups] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch pwBooks
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

        // Remove duplicates based on 'id'
        const uniqueGroupsData = modifiedGroupsData.reduce((acc, current) => {
          const existing = acc.find((item) => item.id === current.id);
          if (!existing) {
            return acc.concat(current);
          }
          return acc;
        }, []);

        setGroups(uniqueGroupsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    console.log(pwBooks);
    console.log(groups);
  }, [user.id]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background pb-[170px]">
      <Header toggle={personalShared} />
      <input
        type="text"
        placeholder="Search..."
        className="p-2 border rounded-md"
      />
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
                          <DeletePwBookEntry
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
