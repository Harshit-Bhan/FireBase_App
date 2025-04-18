import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddAndUpdate from "./AddAndUpdate";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact deleted successfully");
    } catch (error) {
      toast.error("Failed to delete contact");
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex items-center bg-yellow-200 border rounded-lg px-4 py-3 w-full gap-4">
        <CgProfile className="text-4xl text-orange-400" />
        <div className="flex flex-col flex-grow">
          <h2 className="text-black font-bold whitespace-nowrap">{contact.name}</h2>
          <p className="text-black font-semibold overflow-hidden text-ellipsis">
            {contact.email}
          </p>
        </div>
        <div className="flex gap-3 text-[22px] ml-auto">
          <FaEdit onClick={onOpen} className="cursor-pointer text-orange-400" />
          <FaTrash onClick={() => deleteContact(contact.id)} className="cursor-pointer text-orange-400" />
        </div>
      </div>
      {isOpen && (
        <AddAndUpdate contact={contact} isUpdate={true} isOpen={isOpen} onClose={onClose} />
      )}
    </>
  );
};

export default ContactCard;
