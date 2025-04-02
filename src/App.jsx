import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { collection, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdate from "./components/AddAndUpdate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from "./components/NotFoundContact";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isopen, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Added searchTerm state

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const contactsRef = collection(db, "contacts");

    // Correct usage of onSnapshot to listen for real-time data
    const unsubscribe = onSnapshot(contactsRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setContacts(contactsList);
    });

    // Clean up listener when component unmounts
    return () => unsubscribe();
  }, []);

  const filterContacts = (e) => {
    setSearchTerm(e.target.value);
  };

  const updateContactsState = (id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };

  // Filter contacts based on the search term
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mx-auto max-w-[370px] p-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex flex-grow relative items-center">
            <CiSearch className="text-white text-3xl ml-1 absolute" />
            <input
              type="text"
              className="border pl-9 text-white border-white bg-transparent h-10 flex-grow rounded-md"
              value={searchTerm}
              onChange={filterContacts} // Bind search input to filterContacts
            />
          </div>
          <CiCirclePlus onClick={onOpen} className="text-5xl text-white cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4">
          {filteredContacts.length === 0 ? (
            <NotFoundContact />
          ) : (
            filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isopen} updateContactsState={updateContactsState} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
