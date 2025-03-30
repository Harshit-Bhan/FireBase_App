import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { CiSearch, CiCirclePlus } from "react-icons/ci";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./components/ContactCard";
import AddAndUpdate from "./components/AddAndUpdate";
// import useDisclouse from "../hooks/useDisclouse";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [isopen , setOpen ] = useState(false);

  const onOpen = () => {
    setOpen(true);
  }

  const onClose = () => {
    
    setOpen(false);
  }

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsCollection = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsCollection);
        const contactsList = contactsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setContacts(contactsList);
      } catch (error) {
        console.log(error);
      }
    };

    getContacts();
  }, []);

  const updateContactsState = (id, updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id ? { ...contact, ...updatedContact } : contact
      )
    );
  };
  

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
            />
          </div>
          <CiCirclePlus onClick={onOpen} className="text-5xl text-white cursor-pointer" />
        </div>
        <div className="flex flex-col gap-4">
          {contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isopen} updateContactsState={updateContactsState} />

    </>
  );
};

export default App;
