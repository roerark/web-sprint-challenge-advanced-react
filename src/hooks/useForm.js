// write your custom hook here to control your checkout form
import { useEffect, useState } from "react";
import { schema } from "../schema";

export const useForm = (state) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [values, setValues] = useState(state);
  const [disabled, setDisabled] = useState(true);
  let initialErrors = {};
  for (let prop in state) {
    initialErrors[prop] = "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = await schema.isValid(values);
    if (valid) {
      setShowSuccessMessage(true);
    }
  };

  useEffect(() => {
    schema
      .isValid(values)
      .then((valid) => {
        if (valid) {
          setDisabled(false);
        } else if (!valid) {
          setDisabled(true);
        }
      })
      .catch((e) => console.log("e: ", e));
  }, [values]);

  const handleChanges = async (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return [values, handleChanges, handleSubmit, showSuccessMessage, disabled];
};
