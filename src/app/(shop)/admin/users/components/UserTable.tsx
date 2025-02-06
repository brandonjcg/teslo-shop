'use client';

import { Pagination } from '@/components';
import { IUser } from '@/interfaces';
import { changeRole } from '@/actions/user/change-role-to-user';

interface Props {
  users: IUser[];
  totalPages: number;
}

export const UserTable = ({ users, totalPages }: Props) => {
  return (
    <>
      <table className="min-w-full">
        <thead className="bg-gray-200 border-b">
          <tr>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              #ID
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Email
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Name
            </th>
            <th
              scope="col"
              className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
            >
              Role
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.email}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {item.name}
              </td>
              <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <select
                  className="text-sm text-gray-900 w-full p-2"
                  value={item.role}
                  onChange={(e) =>
                    changeRole({
                      idUser: item.id,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} />
    </>
  );
};
