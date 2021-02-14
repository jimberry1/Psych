import { useState, useEffect } from 'react';
import db from '../firebase';

export interface InitialUserDBQueryProps {
  gameCode: string | number;
  setUser: (user: object) => void;
}

const InitialUserDBQuery: React.SFC<InitialUserDBQueryProps> = (props) => {
  useEffect(() => {
    db.collection('users')
      .doc(props.gameCode.toString())
      .get()
      .then((fetchedUser: any) => {
        if (fetchedUser.exists) {
          props.setUser(fetchedUser.data());
        } else {
          console.log("Couldn't find the user in the database");
        }
      });
  });
  return <div></div>;
};

export default InitialUserDBQuery;
