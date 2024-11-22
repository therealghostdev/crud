import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Edit, Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { userSlice } from "@/store/userSlice";
import { store } from "@/store/store";

interface User {
  id: string;
  name: string;
}

const UserManagement = () => {
  const [newUserName, setNewUserName] = React.useState("");
  const [editingUser, setEditingUser] = React.useState<User | null>(null);

  const { addUser, deleteUser, updateUser } = userSlice.actions;

  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);

  const handleAddUser = () => {
    if (newUserName.trim()) {
      dispatch(addUser(newUserName));
      setNewUserName("");
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
  };

  const handleUpdateUser = () => {
    if (editingUser && editingUser.name.trim()) {
      dispatch(updateUser(editingUser));
      setEditingUser(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl transform transition-all hover:scale-105">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <CardTitle className="text-2xl font-bold text-center">
            Task Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter user name"
              value={newUserName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewUserName(e.target.value)
              }
              className="flex-grow"
            />
            <Button
              onClick={handleAddUser}
              className="bg-green-500 hover:bg-green-600"
            >
              <Plus className="mr-2" /> Add
            </Button>
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-all"
              >
                {editingUser?.id === user.id ? (
                  <Input
                    value={editingUser.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setEditingUser({ ...editingUser, name: e.target.value })
                    }
                    className="flex-grow mr-2"
                  />
                ) : (
                  <span className="text-gray-800">{user.name}</span>
                )}
                <div className="flex space-x-2">
                  {editingUser?.id === user.id ? (
                    <Button
                      onClick={handleUpdateUser}
                      className="bg-blue-500 hover:bg-blue-600 text-white"
                    >
                      Save
                    </Button>
                  ) : (
                    <>
                      <Button
                        onClick={() => handleEditUser(user)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white"
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        onClick={() => store.dispatch(deleteUser(user.id))}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center text-sm text-gray-500 flex-col font-bold">
          &copy; ghost_dev
          <small className="text-center font-light">2024</small>
        </CardFooter>
      </Card>
    </div>
  );
};

export default UserManagement;
