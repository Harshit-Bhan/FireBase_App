import { ErrorMessage, Field, Form, Formik } from "formik";
import Model from "./Model";
import React from "react";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const AddAndUpdateContact = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contact", id);
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
  
      // 🔥 Call the update function to reflect the changes in UI
      updateContactsState(id, contact);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Model isOpen={isOpen} onClose={onClose}>
        <Formik
          enableReinitialize={true}  // 🔥 This allows the form to update when `contact` changes
          initialValues={
            isUpdate && contact
              ? {
                  name: contact.name || "",
                  email: contact.email || "",
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            console.log(values);
            if (isUpdate && contact?.id) {
              updateContact(values, contact.id);
            } else {
              addContact(values);
            }
          }}
          
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 border" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className="h-10 border" />
              <div className="text-xs text-red-500">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button type="submit" className="self-end border bg-orange-400 px-3 py-1.5">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Model>
    </div>
  );
};

export default AddAndUpdateContact;
