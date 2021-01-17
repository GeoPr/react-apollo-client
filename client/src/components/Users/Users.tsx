import React, { FC } from 'react';
import { useContextValue } from '../../state/state';
import './Users.scss';

export const Users: FC = () => {
  const { users } = useContextValue();

  return (
    <ul className="users">
      {users.map(({ id, username, age }) => (
        <li key={id} className="users__user">
          {username} {age}
        </li>
      ))}
    </ul>
  );
};
