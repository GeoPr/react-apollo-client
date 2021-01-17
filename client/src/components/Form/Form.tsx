import { useMutation, useQuery } from '@apollo/client';
import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { CREATE_USER } from '../../mutations/createUser';
import { GET_ALL_USERS } from '../../queries/allUsers';
import { GET_USER_BY_ID } from '../../queries/getUserById';
import { useContextValue } from '../../state/state';
import './Form.scss';

interface IValues {
  username: string;
  age: number;
}

export const Form: FC = () => {
  const [values, setValues] = useState<IValues>({
    username: '',
    age: 1,
  });
  const { data, loading, error, refetch } = useQuery(GET_ALL_USERS);
  const { data: userById } = useQuery(GET_USER_BY_ID, {
		variables: { id: 0 },
	});
  const { setUsers } = useContextValue();
  const [createNewUser] = useMutation(CREATE_USER, {
    variables: {
      input: {
        username: values.username,
        age: +values.age,
      },
    },
	});
	
	console.log(userById);

  useEffect(() => {
    if (!loading) {
      setUsers(prev => data.getAllUsers);
    }
  }, [data]);

  const onSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getUsers = () => refetch();

  const createUser = async () => {
    await createNewUser();
    // await createNewUser({
    //   variables: {
    //     input: {
    //       username: values.username,
    //       age: +values.age,
    //     },
    //   },
    // });

    getUsers();

    setValues(prev => ({
      ...prev,
      username: '',
      age: 1,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="form">
      <input
        className="form__input form__input_text"
        type="text"
        value={values.username}
        onChange={onChange}
        name="username"
        autoComplete="off"
        placeholder="username"
      />
      <input
        className="form__input form__input_number"
        type="number"
        min="1"
        value={values.age}
        onChange={onChange}
        name="age"
        autoComplete="off"
      />
      <div className="form__buttons">
        <button
          className="form__button form__button_create"
          type="submit"
          data-type="create"
          onClick={createUser}>
          Create new user
        </button>
        <button
          className="form__button form__button_get"
          type="submit"
          data-type="get"
          onClick={getUsers}>
          Get all users
        </button>
      </div>
    </form>
  );
};
