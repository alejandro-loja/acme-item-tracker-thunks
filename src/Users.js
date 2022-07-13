import React from "react";
import { connect } from "react-redux";
import axios from "axios";
import {
  createUser,
  removeThingFromUser,
  deleteUser,
  updateUser,
} from "./store";

const Users = ({
  users,
  createUser,
  deleteUser,
  things,
  removeThingFromUser,
  increment,
}) => {
  return (
    <div>
      <h1>Users</h1>
      <button onClick={createUser}>+</button>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.name}({user.ranking})
              <button onClick={() => deleteUser(user)}>x</button>
              <button onClick={() => increment(user, -1)}>-</button>
              <button onClick={() => increment(user, 1)}>+</button>
              <ul>
                {things
                  .filter((thing) => thing.userId === user.id)
                  .map((thing) => {
                    return (
                      <li key={thing.id}>
                        {thing.name} ({thing.ranking})
                        <button onClick={() => removeThingFromUser(thing)}>
                          x
                        </button>
                      </li>
                    );
                  })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.users,
    things: state.things,
  };
};

const mapDispatch = (dispatch) => {
  return {
    createUser: () => {
      dispatch(createUser({ name: Math.random() }));
    },
    increment: (user, dir) => {
      user = { ...user, ranking: user.ranking + dir };
      dispatch(updateUser(user));
    },
    removeThingFromUser: async (thing) => {
      thing = { ...thing, userId: null };
      dispatch(removeThingFromUser(thing));
    },
    deleteUser: async (user) => {
      dispatch(deleteUser(user));
    },
  };
};
export default connect(mapStateToProps, mapDispatch)(Users);
