import React from 'react';
import { fetchAllUsers } from '../../../services/admin-services';
import _map from 'lodash/map';
import { useAsync } from 'react-use';

function AllStudents() {
  const { value: response } = useAsync(() => fetchAllUsers());

  return (
    <div className="admin__content">
      <h1 style={{ marginBottom: '40px' }}>All Students</h1>
      <table className={'student__record'}>
        <tr>
          <th>S.No'</th>
          <th>Name</th>
          <th>Student ID</th>
          <th>Username</th>
        </tr>
        {_map(
          response?.data.users,
          (item, index) =>
            item.role === 'Student' && (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{`${item.firstName} ${item.lastName}`}</td>
                <td>{item.email.slice(0, 9)}</td>
                <td>{item.userName}</td>
              </tr>
            ),
        )}
      </table>
    </div>
  );
}

export default AllStudents;
