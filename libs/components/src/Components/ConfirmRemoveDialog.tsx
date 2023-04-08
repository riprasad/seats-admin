import { Button, Modal } from "@patternfly/react-core";
import { TableView } from "@rhoas/app-services-ui-components";
import { User } from "client";
import { useState } from "react";

type ConfirmRemoveDialogProps = {
  users: User[];
};

const PAGE_SIZE = 5;

export const ConfirmRemoveDialog = ({ users }: ConfirmRemoveDialogProps) => {
  const [usersPage, setUserPage] = useState<User[]>(users.slice(0, PAGE_SIZE));
  const [page, setPage] = useState(1);
  console.log(usersPage.length, users.length);
  return (
    <Modal
      title="Remove users"
      titleIconVariant="warning"
      isOpen
      variant={users.length > 5 ? "medium" : "small"}
      actions={[<Button variant="danger">Remove user(s)</Button>]}
    >
      Are you sure you want to remove the user(s) below from Project Wisdom
      {users.length > 5 ? (
        <TableView
          data={usersPage}
          columns={["name"]}
          itemCount={users.length}
          perPage={PAGE_SIZE}
          page={page}
          onPageChange={(page: number, perPage: number): void => {
            setPage(page);
            setUserPage(users.slice((page - 1) * perPage, page * perPage));
          }}
          emptyStateNoData={<></>}
          emptyStateNoResults={<></>}
          ariaLabel={""}
          renderHeader={({ Th, key }) => <Th key={key}>Name</Th>}
          renderCell={({ row, Td, key }) => (
            <Td key={key} dataLabel="Name">
              {row.name}
            </Td>
          )}
        />
      ) : (
        <p className="pf-u-pt-md">
          {users.map((user, i) => (
            <>
              <b>{user.name}</b>
              {i !== users.length - 1 ? ", " : ""}
            </>
          ))}
        </p>
      )}
    </Modal>
  );
};
