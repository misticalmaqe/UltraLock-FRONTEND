import { useState, useEffect } from 'react';
//--------------COMPONENTS--------------//
import { Navbar } from '../Components/NavBar';
import Header from '../Components/Header';
import Eyes from '../Components/Eyes';
import SharedDeletePwBookEntry from '../Components/SharedDeletePwBookEntry';

export function PwBookSharedPage() {
  const personalShared = true;
  const [sharedGroups, setSharedGroups] = useState([]);
  const [sharedPwBooks, setSharedPwBooks] = useState([]);

  const getDataFromSessionStorage = (key) => {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    const updateStorage = () => {
      const updatedGroups = getDataFromSessionStorage('sharedGroups') || [];
      const updatedPwBooks = getDataFromSessionStorage('sharedPwBooks') || [];
      setSharedGroups(updatedGroups);
      setSharedPwBooks(updatedPwBooks);
    };
    // Run once on initial load
    updateStorage();

    // Listen for changes in storage by checking at regular intervals
    const interval = setInterval(updateStorage, 1000);

    // Cleanup: remove the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-background pb-[170px]">
      <Header toggle={personalShared} />
      <div className="max-w-screen m-4 grid justify-center gap-4 p-3 md:grid-cols-1 lg:grid-cols-3">
        {sharedGroups.map((groupItem) => (
          <div
            key={groupItem.id}
            className="m-[30px] flex w-80 flex-col bg-window p-[20px] shadow-lg shadow-text hover:translate-y-[-2px]"
          >
            <h1 className="text-text rounded-md pl-[5px] text-[22px] font-bold">
              {groupItem.groupName}
            </h1>
            {sharedPwBooks.map((pwBooksItem) => (
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
                    <div className="flex flex-col items-start">
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
