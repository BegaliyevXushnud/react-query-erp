// @component/ConfirmDelete.tsx
import { Button, Popconfirm } from 'antd';

type ConfirmDeletePropsType = {
  id: string | number;
  deleteItem: (id: string | number) => void;
};

const ConfirmDelete = ({ id, deleteItem }: ConfirmDeletePropsType) => (
  <Popconfirm
    title="Are you sure you want to delete this item?"
    onConfirm={() => deleteItem(id)}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
);

export default ConfirmDelete;
