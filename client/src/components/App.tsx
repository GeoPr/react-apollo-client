import React from 'react';
import { Form } from './Form/Form';
import { Users } from './Users/Users';
import './App.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <main className="page">
        <section className="page__sc sc">
          <div className="sc__container _container">
            <div className="sc__body">
              <Form />
              <Users />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
